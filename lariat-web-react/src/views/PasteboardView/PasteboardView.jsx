import Draggable from 'react-draggable';
import React, {useEffect,useState} from 'react';
import useLocalStorage from './../CustomHooks/UseLocalStorage.js'
import "./popBoard.css";




export default class Pasteboard extends React.Component{
   constructor(props){
      super(props);
      this.state = {
		contents: "",
		contentSet: new Set(),
		visibility: "",
		}
	}


	componentDidMount() {
		const _contentSet = new Set(this.props.pasteBoardProps.contents.split(",").slice(1));
		var _contents = "";
		_contentSet.forEach((elem) => {
			_contents += "," + elem;
		});

		this.setState({visibility: "visible", contents: this.props.pasteBoardProps.contents});
		this.setState({contentSet: _contentSet})

		// this.setState({visibility: "visible", contents: ","+_contentSet.forEach((v) => {return v}).join(",")});

 		const selectNode = document.querySelector("#pasteboard-fields");
		while (selectNode.firstChild) {
			selectNode.removeChild(selectNode.lastChild);
		}

	   _contentSet.forEach((v) =>{

		   // this.state.contents.split(",").slice(1).forEach((v) =>{
			const childNode = document.createElement("option");
			childNode.innerHTML = v;
			childNode.value = v;
			childNode.key = v;
			selectNode.appendChild(childNode);
		})
	}


    componentDidUpdate(prevProps, prevState) {

      if (this.props.pasteBoardProps !== prevProps.pasteBoardProps){
      	// update who's there
			const _contentSet = new Set(this.props.pasteBoardProps.contents.split(",").slice(1));
			var _contents = "";
			_contentSet.forEach((elem) => {
				_contents += "," + elem;
			});	  
			    	
       	this.setState({visibility: "visible", contents: _contents});
			this.setState({contentSet: _contentSet})

			// pass upstream
        // this.props.pasteBoardPropsUpdate({visibility: this.state.visibility, contents: this.props.pasteBoardProps.contents});

			// rerender component.. faster to ignore if key already in set?
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
	}


    render(){
	return <>
				<Draggable
				handle=".title"
				position={null}
				scale={1}
				onStart={this.handleStart}
				onDrag={this.handleDrag}
				onStop={this.handleStop}>

					<div id="pasteboardContainer" className="content">
					    <div className="control-box close-box"><a className="control-box-inner"></a></div>
					    <div className="control-box zoom-box"><div className="control-box-inner"><div className="zoom-box-inner"></div></div></div>
					    <div className="control-box windowshade-box"><div className="control-box-inner"><div className="windowshade-box-inner"></div></div></div>
					    <h1  id="pasteboardTitle" className="title">Pasteboard</h1>
				<div className="row-container">		
{/*					   <table id="pasteboard-table" border="1">
						    <tbody id="pasteboard">
						    </tbody>
						</table>*/}
	               <select name="pasteboard-fields" id="pasteboard-fields" multiple size="12">
						</select>   
				</div>

				<div id="pasteboard-commands" className="row-container">
					<button className="command_button" id="pbSelect" onClick={this.pbSelectAll}>Select All</button>
					<button className="command_button" id="pbRemove" onClick={this.pbRemove}>Remove</button>
					<button className="command_button" id="pbPaste">Paste To</button>
					<button className="command_button" id="pbDump">Dump</button>
					{/*<button className="command_button" id="pbTalk" onClick={this.pbTalk}>Talk</button>*/}
				</div>

				</div>
				</Draggable>
  			</>
	}
}