import { Rnd } from "react-rnd";

import React, {useEffect,useState} from 'react';

import "./PopOut.css"
import { kronecker, formImage, fillImageArray } from './../InspectView/inspect.js';



export class PopOut extends React.Component{
	constructor(props){
		super(props);
		this.closeWindow = this.closeWindow.bind(this);
    this.state = {
	    width: 458,
	    height: 482,
	    x: window.innerWidth/2-240+50,
	    y: window.innerHeight/2-360+50,
		};
    this.fetchMap = new Map([[":", "%3A"], [";", "%3B"], ["<","%3C"], ["=" , "%3D"],[">" , "%3E"],["?" , "%3F"],["@" , "%40"],["!" , "%21"],["\"" , "%22"],["#" , "%23"],["$" , "%24"],["%" , "%25"],["&" , "%26"],["'" , "%27"],["(" , "%28"],[")" , "%29"],["*" , "%2A"],["+" , "%2B"],["," , "%2C"],["-" , "%2D"],["." , "%2E"],["/" , "%2F"]]);
	}

  closeWindow(){
  	this.setState({width: 460, height: 482})
  	// this.removePopOut(this.props.identity);
  	// console.log(this.props.id)
  	document.getElementById(this.props.id).remove();
  	// document.querySelector("#popBox").remove();
    // this.props.handle("hidden");
  }

  fillImageOrder = async () => {
	const fetchPromise = fetch(this.props.image);

	fetchPromise.then(response => {
		return response.json();
	}).then(inspectEntries => {
	    this.storeImage = inspectEntries[0].rgbaRawArray;

	    const canvas = document.getElementById("canvas-inspect"+this.props.id);

	    canvas.width = 455;
	    canvas.height = 455;
	    const ctx = canvas.getContext("2d");

	    var imageDataArray = fillImageArray(inspectEntries[0].rgbaArray, this.state.colorMap);      
	    const imageData = new ImageData(imageDataArray, 455, 455);
	    ctx.putImageData(imageData, 0, 0);

	});
  }


	componentDidMount() {
	console.log(this.props.image)
	console.log(this.props)

	setTimeout(this.fillImageOrder, 10);

	}


    render (){

  return <>



		<Rnd
			id={this.props.id}
			className="content"
			cancel="popBoxTitleCloseBox"
			dragHandleClassName="headerTitle"
			minWidth={455}
			minHeight={455}
			style={{"zIndex":2}}
			size={{ width: this.state.width,  height: this.state.height }}
			position={{ x: this.state.x, y: this.state.y }}
			onDragStop={(e, d) => { this.setState({ x: d.x, y: d.y }) }}
			onClick={() => {
				const divs = document.querySelectorAll(".content");
				divs.forEach(div => { 
					div.style.zIndex-=1
				})
				document.getElementById(this.props.id).style.zIndex=1
			}}

		  onResizeStop={(e, direction, ref, delta, position) => {


			    this.setState({
		      width: ref.style.width,
		      height: ref.style.height,
		      ...position,
		    });
		  }}
		>

	    <div id="popBoxTitle" className="headerTitle">
	      <div className="topTitleLine"></div>
	      <div className="titleLines"></div>
	      <div className="titleLines"></div>
	      <div className="titleLines"></div>
	      <div className="titleLines"></div>
	      <div className="bottomTitleLines"></div>
	      <div id="popBoxTitleHandle" className="callTitle"> {this.props.id} </div>
	      <div id="popBoxTitleCloseBox" className="control-box close-box" onClick={this.closeWindow}>
	      <a id="popBoxTitleCloseInner" className="control-box-inner" ></a>
	      </div>
	    </div >
	    <div id="image" className="row-container">
            <canvas id={"canvas-inspect"+this.props.id} width="455" height="455"></canvas>
         </div>	    
	  </Rnd>
	  </>
  }
}