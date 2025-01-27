import Draggable from 'react-draggable';
import React, {useEffect,useState} from 'react';
import useLocalStorage from './../CustomHooks/UseLocalStorage.js'

export default class Pasteboard extends React.Component{
         constructor(props){
            super(props);
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
		<div>
      <table id="pasteboard-table" border="1">
			    <tbody id="pasteboard">
			    </tbody>
			</table>
		</div>
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
	{/*<script src="popBoard.js"></script>*/}
{/*    <link rel="stylesheet" href="style.css" />
    <link rel="stylesheet" href="popBoard.css" />*/}
    {/*</section>*/}
  </>
	}
}