import { useEffect, useMemo, useRef } from "react";
import useLocalStorage from './../CustomHooks/UseLocalStorage.js'
import * as d3 from "d3";
import Draggable from 'react-draggable';


const BUCKET_PADDING = 4;
const BUCKET_NUMBER = 64;


export function Histogram({histProps}){

  const axesRef = useRef(null);
  const width = histProps.width;
  const height = histProps.height;
  const data = histProps.data

  const xScale = useMemo(() => {
    return d3
      .scaleLinear()
      .domain([0, 256])
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


  useEffect(() => {
    const svgElement = d3.select(axesRef.current);
    svgElement.selectAll("*").remove();

    const xAxisGenerator = d3.axisBottom(xScale);
    svgElement
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxisGenerator);

    const yAxisGenerator = d3.axisLeft(yScale);
    svgElement.append("g").call(yAxisGenerator);
  }, [xScale, yScale, height]);




  const allRects = buckets.map((bucket, i) => {
    return (
      <rect
        key={i}
        fill="#69b3a2"
        x={xScale(bucket.x0) + BUCKET_PADDING / 2}
        width={xScale(bucket.x1) - xScale(bucket.x0) - BUCKET_PADDING}
        y={yScale(bucket.length)}
        height={height - yScale(bucket.length)}
      />
    );
  });


  return (
    // <svg>

    <>
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
                <svg ref = {axesRef} width={width} height={height}>
                  <g
                    width={width}
                    height={height}
                    // transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
                  >
                    {allRects}
                  </g>
                  <g
                    width={width}
                    height={height}
                    ref={axesRef}
                    // transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
                  />
                </svg>
    
              </div>
            </div>
        </div>
    </Draggable>
    </>
  );

  // } catch (error) {
  //   console.error(error);
  // return (
  //   <Draggable
  //   handle=".title"
  //   position={null}
  //   scale={1}
  //   // onStart={this.handleStart}
  //   // onDrag={this.handleDrag}
  //   // onStop={this.handleStop}>
  //   >
  //       <div id="histogram" className="content">
  //         <div className="control-box close-box"><a className="control-box-inner"></a></div>
  //         <div className="control-box zoom-box">
  //           <div className="control-box-inner">
  //             <div className="zoom-box-inner"></div>
  //           </div>
  //         </div>
  //         <div className="control-box windowshade-box">
  //           <div className="control-box-inner">
  //             <div className="windowshade-box-inner"></div>
  //           </div>
  //         </div>
  //         <h1 id="histogram" className="title">Histogram</h1>
  //           <div className="block">
  //             <div id="svg" className="row-container">
  //               <svg>
  //               </svg>
  //             </div>
  //           </div>
  //       </div>
  //   </Draggable>
  //   )};


};
