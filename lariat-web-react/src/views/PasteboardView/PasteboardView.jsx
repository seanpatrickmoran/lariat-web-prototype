import { Rnd } from "react-rnd";
import React, {useEffect,useState} from 'react';

import "./popBoard.css";

import Downloading from "./Downloading.jsx";



export default class Pasteboard extends React.Component{
   constructor(props){
      super(props);
      this.state = {
      width: 400,
      height: 300,
      x: window.innerWidth-410,
      y: 28,   
		contents: "",
		contentSet: new Set(),
		visibility: "",
		isDownloading: "hidden",
		};
		this.handleIsDownloadingChange = this.handleIsDownloadingChange.bind(this);
	}

	componentDidMount() {
		const _contentSet = new Set(this.props.pasteBoardProps.contents.split(",").slice(1));
		var _contents = "";
		_contentSet.forEach((elem) => {
			_contents += "," + elem;
		});

		this.setState({	visibility: "visible", 
								contents: this.props.pasteBoardProps.contents, 
								isDownloading: "hidden",
								contentSet: _contentSet
							});

 		const selectNode = document.querySelector("#pasteboard-fields");
		while (selectNode.firstChild) {
			selectNode.removeChild(selectNode.lastChild);
		}

	   _contentSet.forEach((v) =>{
			const childNode = document.createElement("option");
			childNode.innerHTML = v;
			childNode.value = v;
			childNode.key = v;
			selectNode.appendChild(childNode);
		})
	}


    componentDidUpdate(prevProps, prevState) {

      if (this.props.pasteBoardProps !== prevProps.pasteBoardProps){


      	console.log(this.props.pasteBoardProps,prevProps.pasteBoardProps)
			const _contentSet = new Set(this.props.pasteBoardProps.contents.split(",").slice(1));
			var _contents = "";
			_contentSet.forEach((elem) => {
				_contents += "," + elem;
			});	  
			    	
       	this.setState({	visibility: "visible", 
       							contents: _contents,
									contentSet: _contentSet,
								});

    		const selectNode = document.querySelector("#pasteboard-fields");
			while (selectNode.firstChild) {
				selectNode.removeChild(selectNode.lastChild);
			}

 		   _contentSet.forEach((v) =>{
				const childNode = document.createElement("option");
				childNode.innerHTML = v;
				childNode.value = v;
				childNode.key = v;
				selectNode.appendChild(childNode);
			})

      }

    }


    pbSelectAll = (event) => {
    		const pasteBoardSelectField = document.getElementById("pasteboard-fields");
			const length = pasteBoardSelectField.options.length;
			for(var i = 0;i<length;i++){
				pasteBoardSelectField.options[i].selected = "selected";
	    }
	 }


	pbRemove = (event) => {
		const pasteBoardSelectField = document.getElementById("pasteboard-fields");
		const length = pasteBoardSelectField.options.length;
	    let delArr = [];
	    for (let i = 0; i < pasteBoardSelectField.options.length; i++) {
	      delArr[i] = pasteBoardSelectField.options[i].selected;
	    }

		let index = pasteBoardSelectField.options.length;
		while (index--) {
			if (delArr[index]) {
			  pasteBoardSelectField.remove(index);
			}
		}
		const _contentSet = new Set();
		var _contents = "";
		for (const child of pasteBoardSelectField.children) {
			_contentSet.add(child.value);
			_contents+=","+child.value;
		}

    	this.setState({visibility: "visible", contents: _contents});
		this.setState({contentSet: _contentSet})
      this.props.pasteBoardPropsUpdate({visibility: this.state.visibility, contents: _contents});

	}

	pbDump = (event) => {
		this.setState({isDownloading : "visible"})		
		/*
			Does the following:
				1. Popup menu. this new component will allow us to DL
					*From here, customize what we want.
						.notable, the Images (truesize or @ 455px)
							-> these get zipped https://stuk.github.io/jszip/documentation/examples.html
						.Histograms
							-> these get a separate zip: https://stuk.github.io/jszip/documentation/examples.html
						.later, other analyses...
				2. From the popup menu, use the DL trick


		*/
		// const pasteBoardSelectField = document.getElementById("pasteboard-fields");
		// const length = pasteBoardSelectField.options.length;
	   //  let delArr = [];
	   //  for (let i = 0; i < pasteBoardSelectField.options.length; i++) {
	   //    delArr[i] = pasteBoardSelectField.options[i].selected;
	   //  }

		// let index = pasteBoardSelectField.options.length;
		// while (index--) {
		// 	if (delArr[index]) {
		// 	  pasteBoardSelectField.remove(index);
		// 	}

		// const _contentSet = new Set();
		// var _contents = "";
		// for (const child of pasteBoardSelectField.children) {
		// 	_contentSet.add(child.value);
		// 	_contents+=","+child.value;
		// }

    	// this.setState({visibility: "visible", contents: _contents});
		// this.setState({contentSet: _contentSet})
      // this.props.pasteBoardPropsUpdate({visibility: this.state.visibility, contents: _contents});
		// }
	}

	handleIsDownloadingChange(){
		if(this.state.isDownloading=="hidden"){
			this.setState({isDownloading: "visible"})
		} else{
		this.setState({isDownloading: "hidden"})
		}
	}	


    render(){
	return <>




    <Rnd
	    id={this.props.id}
      className="content"
      cancel="BoxTitleCloseBox"
      dragHandleClassName="headerTitle"
      minWidth={300}
      minHeight={300}
      size={{ width: this.state.width,  height: this.state.height }}
      position={{ x: this.state.x, y: this.state.y }}
      onDragStop={(e, d) => { this.setState({ x: d.x, y: d.y }) }}
			onClick={() => {
				const divs = document.querySelectorAll(".content");
				divs.forEach(div => { 
          div.style.zIndex-=2
        })
        document.getElementById(this.props.id).style.zIndex=0
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        this.setState({
          width: ref.style.width,
          height: ref.style.height,
          ...position,
        });
      }}
    >  

	        <div id="BoxTitle" className="headerTitle">
	          <div className="topTitleLine"></div>
	          <div className="titleLines"></div>
	          <div className="titleLines"></div>
	          <div className="titleLines"></div>
	          <div className="titleLines"></div>
	          <div className="bottomTitleLines"></div>
	          <div id="BoxTitleHandle" className="callTitle">Pasteboard</div>
	          <div id="BoxTitleCloseBox" className="control-box close-box" >
	          <a id="BoxTitleCloseInner" className="control-box-inner" ></a>
	          </div>
	        </div>


			  

						<div className="row-container">		
			               <select name="pasteboard-fields" id="pasteboard-fields" multiple size="12">
								</select>   
						</div>

						<div id="pasteboard-commands" className="row-container">
							<button className="button" id="pbSelect" onClick={this.pbSelectAll}>Select All</button>
							<button className="button" id="pbRemove" onClick={this.pbRemove}>Remove</button>
							<button className="button" id="pbPaste">Paste To</button>
							<button className="button" id="pbDump" onClick={this.pbDump}>Dump</button>
						</div>
			</Rnd>


			  <div id="callBoxDiv" style={{visibility: this.state.isDownloading}}>
					<Downloading id={"downloadingWindow"} isDownloading={this.state.isDownloading} handleIsDownloadingChange={this.handleIsDownloadingChange} contentSet={this.state.contentSet}/>
			  </div>  


		</>
	}
}