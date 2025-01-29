import Draggable from 'react-draggable';
import React, {useEffect,useState} from 'react';
import useLocalStorage from './../CustomHooks/UseLocalStorage.js'
import "./popBoard.css";




export default class Pasteboard extends React.Component{
         constructor(props){
            super(props);
			}

			state = {
				contents: ""
			}

			componentDidMount(){
			};


			componentDidUpdate(){
				// const selectNode = document.querySelector("#pasteboard-fields");
				// this.props.pasteBoardProps.contents.split(",").slice(1).forEach((v) =>{
				// 	console.log(v);
				// 	const childNode = document.createElement("option");
				// 	childNode.innerHTML = v;
				// 	childNode.value = v;
				// 	childNode.key = v;
				// 	selectNode.appendChild(childNode);
					// this.contents
				// });			
			};


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
	               <select name="pasteboard-fields" id="pasteboard-fields" multiple size="10">

	               {this.props.pasteBoardProps.contents.split(",").slice(1).forEach((el) =>{
					// console.log(v);
					// const childNode = document.createElement("option");
					// childNode.innerHTML = v;
					// childNode.value = v;
					// childNode.key = v;
					// selectNode.appendChild(childNode);
						<option value={el} key={el}>{el}</option>
				})}
{/*		                {names = this.props.pasteBoardProps.split(",");
		                names.forEach((el) => <option value={el} key={el}>{el}</option>)}*/}
						</select>   
				</div>

				<div id="pasteboard-commands" className="row-container">
					<button className="command_button" id="pbSelect">Select All</button>
					<button className="command_button" id="pbRemove">Remove</button>
					<button className="command_button" id="pbPaste">Paste To</button>
					<button className="command_button" id="pbDump">Dump</button>
					<button className="command_button" id="pbTalk">Talk</button>
				</div>

				</div>
				</Draggable>
  			</>
	}
}