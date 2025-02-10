import { useEffect, useMemo, useRef } from "react";
import useLocalStorage from './../CustomHooks/UseLocalStorage.js'
import * as d3 from "d3";
// import Draggable from 'react-draggable';
import { Rnd } from "react-rnd";



const BUCKET_PADDING = 1;
const BUCKET_NUMBER = 64;
const MARGIN = { top: 30, right: 30, bottom: 40, left: 50 };


export function Histogram({id,histProps}){

  const axesRef = useRef(null);
  const boundsWidth = histProps.width - MARGIN.right - MARGIN.left;
  const boundsHeight = histProps.height - MARGIN.top - MARGIN.bottom;
  const width = histProps.width;
  const height = histProps.height;
  const data = histProps.data

  const xScale = useMemo(() => {
    return d3
      .scaleLinear()
      .domain([0, 256])
      .range([3, boundsWidth]);
  }, [data, width]);

  const buckets = useMemo(() => {
    const bucketGenerator = d3
      .bin()
      .value((d) => d)
      .domain(xScale.domain())
      .thresholds(xScale.ticks(BUCKET_NUMBER));
    return bucketGenerator(data);
  }, [xScale]);

  const yScale = useMemo(() => {
    const max = Math.max(...buckets.map((bucket) => bucket?.length));
    return d3.scaleLinear().range([boundsHeight, 0]).domain([0, max]).nice();
  }, [data, height]);


  useEffect(() => {
    const svgElement = d3.select(axesRef.current);
    svgElement.selectAll("*").remove();

    const xAxisGenerator = d3.axisBottom(xScale);
    svgElement
      .append("g")
      .attr("transform", "translate(0," + boundsHeight + ")")
      .call(xAxisGenerator);

    const yAxisGenerator = d3.axisLeft(yScale);
    svgElement.append("g").call(yAxisGenerator);
  }, [xScale, yScale, boundsHeight]);

  // const colorMode = window.matchMedia('(prefers-color-scheme: dark)') ? "#69b3a2": "#e15759"
  const allRects = buckets.map((bucket, i) => {
    return (
      <rect
        key={i}
        fill={"#69b3a2"}
        x={xScale(bucket.x0) + BUCKET_PADDING / 2}
        width={xScale(bucket.x1) - xScale(bucket.x0) - BUCKET_PADDING}
        y={yScale(bucket.length)}
        height={boundsHeight - yScale(bucket.length)}
      />
    );
  });


  return (
    <>
    <Rnd
      id={id}
      className="content"
      cancel="BoxTitleCloseBox"
      dragHandleClassName="headerTitle"
      default={{      
      x: window.innerWidth-410,
      y: 330,
      width: 400,
      height: 360}}


      onClick={() => {
        const divs = document.querySelectorAll(".content");
        divs.forEach(div => { 
          div.style.zIndex-=1
        })
        console.log(histProps)
        document.getElementById(id).style.zIndex=0
      }}
      minWidth={400}
      minHeight={300}
      size={{ width: histProps.width,  height: histProps.height }}

    >  
        <div id="BoxTitle" className="headerTitle">
          <div className="topTitleLine"></div>
          <div className="titleLines"></div>
          <div className="titleLines"></div>
          <div className="titleLines"></div>
          <div className="titleLines"></div>
          <div className="bottomTitleLines"></div>
          <div id="BoxTitleHandle" className="callTitle">Histogram</div>
          <div id="BoxTitleCloseBox" className="control-box close-box" >
          <a id="BoxTitleCloseInner" className="control-box-inner" ></a>
          </div>
        </div>
            <div className="block">
              <div id="svg" className="row-container">
                <svg width={width} height={height}>
                  <g
                    width={boundsWidth}
                    height={boundsHeight}
                    transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
                  >
                    {allRects}
                  </g>
                  <g
                    width={boundsWidth}
                    height={boundsHeight}
                    ref={axesRef}
                    transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
                  />
                </svg>
    
              </div>
            </div>
          </Rnd>

    </>
  );
};
