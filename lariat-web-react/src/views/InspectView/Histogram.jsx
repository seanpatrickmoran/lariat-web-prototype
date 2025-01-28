import { useEffect, useMemo, useRef } from "react";
import useLocalStorage from './../CustomHooks/UseLocalStorage.js'
import * as d3 from "d3";
import Draggable from 'react-draggable';



// const MARGIN = { top: 30, right: 30, bottom: 40, left: 50 };
// const BUCKET_NUMBER = 70;
// const BUCKET_PADDING = 1;

// // type HistogramProps = {
// //   width: number;
// //   height: number;
// //   data: number[];
// // };

// const Histogram = (width, height, data) => {
//   const axesRef = useRef(null);
//   console.log(data)
//   const boundsWidth = width - MARGIN.right - MARGIN.left;
//   const boundsHeight = height - MARGIN.top - MARGIN.bottom;

//   const xScale = useMemo(() => {
//     const max = Math.max(...data);
//     return d3
//       .scaleLinear()
//       .domain([0, 1000]) // note: limiting to 1000 instead of max here because of extreme values in the dataset
//       .range([10, boundsWidth]);
//   }, [data, width]);

//   const buckets = useMemo(() => {
//     const bucketGenerator = d3
//       .bin()
//       .value((d) => d)
//       .domain(xScale.domain())
//       .thresholds(xScale.ticks(BUCKET_NUMBER));
//     return bucketGenerator(data);
//   }, [xScale]);

//   const yScale = useMemo(() => {
//     const max = Math.max(...buckets.map((bucket) => bucket?.length));
//     return d3.scaleLinear().range([boundsHeight, 0]).domain([0, max]).nice();
//   }, [data, height]);

//   // Render the X axis using d3.js, not react
//   useEffect(() => {
//     const svgElement = d3.select(axesRef.current);
//     svgElement.selectAll("*").remove();

//     const xAxisGenerator = d3.axisBottom(xScale);
//     svgElement
//       .append("g")
//       .attr("transform", "translate(0," + boundsHeight + ")")
//       .call(xAxisGenerator);

//     const yAxisGenerator = d3.axisLeft(yScale);
//     svgElement.append("g").call(yAxisGenerator);
//   }, [xScale, yScale, boundsHeight]);

//   console.log('in hist')

//   const allRects = buckets.map((bucket, i) => {
//     return (
//       <rect
//         key={i}
//         fill="#69b3a2"
//         x={xScale(bucket.x0) + BUCKET_PADDING / 2}
//         width={xScale(bucket.x1) - xScale(bucket.x0) - BUCKET_PADDING}
//         y={yScale(bucket.length)}
//         height={boundsHeight - yScale(bucket.length)}
//       />
//     );
//   });

//   return (
//     <svg ref = {axesRef} width={width} height={height}>
//       <g
//         width={boundsWidth}
//         height={boundsHeight}
//         transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
//       >
//         {allRects}
//       </g>
//       <g
//         width={boundsWidth}
//         height={boundsHeight}
//         ref={axesRef}
//         transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
//       />
//     </svg>
//   );
// };

// export default Histogram;




// import { useMemo } from "react";
// import * as d3 from "d3";

const BUCKET_PADDING = 4;
const BUCKET_NUMBER = 64;
// histProps = {
//   const width,
//   const height,
//   const data,
// }

export function Histogram({histProps}){
  // console.log(useLocalStorage("histogramProperties"));
  console.log(histProps);
  try{

  const width = histProps.width;
  const height = histProps.height;
  const data = histProps.data
  console.log(data);

  const xScale = useMemo(() => {
    return d3
      .scaleLinear()
      .domain([0, 255])
      .range([15, width - 15]);
  }, [data, width]);


  // const xScale = useMemo(() => {
  //   const max = Math.max(...data);
  //   return d3
  //     .scaleLinear()
  //     .domain([0, 256])
  //     .range([10, width-10]);
  // }, [data, width]);

  const buckets = useMemo(() => {
    const bucketGenerator = d3
      .bin()
      .value((d) => d)
      .domain(xScale.domain())
      .thresholds(xScale.ticks(BUCKET_NUMBER));
    return bucketGenerator(data);
  }, [xScale]);

  // const buckets = useMemo(() => {
  //   const bucketGenerator = d3
  //     .bin()
  //     .value((d) => d)
  //     .domain([0, 10])
  //     .thresholds([0, 2, 4, 6, 8, 10]);
  //   return bucketGenerator(data);
  // }, [xScale]);

  const yScale = useMemo(() => {
    const max = Math.max(...buckets.map((bucket) => bucket?.length));
    return d3.scaleLinear().range([height, 0]).domain([0, max]);
  }, [data, height]);

  const allRects = buckets.map((bucket, i) => {
    if (bucket.x0 == undefined || bucket.x1 == undefined) {
      return null;
    }
    return (
      <rect
        key={i}
        fill="#69b3a2"
        stroke="black"
        x={xScale(bucket.x0) + BUCKET_PADDING / 2}
        width={xScale(bucket.x1) - xScale(bucket.x0) - BUCKET_PADDING}
        y={yScale(bucket.length)}
        height={height - yScale(bucket.length)}
      />
    );
  })

  return (
    // <svg>


    <Draggable
    handle=".title"
    position={null}
    scale={1}
    // onStart={this.handleStart}
    // onDrag={this.handleDrag}
    // onStop={this.handleStop}>
    >
        <div id="histogram" className="content">
          <div className="control-box close-box"><a className="control-box-inner"></a></div>
          <div className="control-box zoom-box">
            <div className="control-box-inner">
              <div className="zoom-box-inner"></div>
            </div>
          </div>
          <div className="control-box windowshade-box">
            <div className="control-box-inner">
              <div className="windowshade-box-inner"></div>
            </div>
          </div>
          <h1 id="histogram" className="title">Histogram</h1>
            <div className="block">
              <div id="svg" className="row-container">
                <svg width={width} height={height}>
                  {allRects}
                </svg>
              </div>
            </div>
        </div>
    </Draggable>





  );

  } catch (error) {
    console.error(error);
  return (
    <Draggable
    handle=".title"
    position={null}
    scale={1}
    // onStart={this.handleStart}
    // onDrag={this.handleDrag}
    // onStop={this.handleStop}>
    >
        <div id="histogram" className="content">
          <div className="control-box close-box"><a className="control-box-inner"></a></div>
          <div className="control-box zoom-box">
            <div className="control-box-inner">
              <div className="zoom-box-inner"></div>
            </div>
          </div>
          <div className="control-box windowshade-box">
            <div className="control-box-inner">
              <div className="windowshade-box-inner"></div>
            </div>
          </div>
          <h1 id="histogram" className="title">Histogram</h1>
            <div className="block">
              <div id="svg" className="row-container">
                <svg>
                </svg>
              </div>
            </div>
        </div>
    </Draggable>
    )};


};
