import Draggable from 'react-draggable';
// import React, {useState} from 'react';
import React, {useEffect,useState} from 'react';


export class CallBox extends React.Component{
         constructor(props){
            super(props);
			this.closeWindow = this.closeWindow.bind(this);
            this.state = {
            	};
           }

  componentDidMount() {
  }


  closeWindow(){
    this.props.handleCallChange("hidden");
  }

    render (){

  return <>

	  <Draggable
	  handle=".title"
	  position={null}
	  scale={1}
	  onStart={this.handleStart}
	  onDrag={this.handleDrag}
	  onStop={this.handleStop}>

	  <div id="callBoxContent" className="content" style={{
          height: ' 42%',
          width: '42%',
          top: '15%',
          left: '30%',
	    backgroundColor: "#030300",
		visibility: this.props.isCalling,
	  }}>

	    <h1 className="title">Call</h1>
	    <div className="control-box close-box" onClick={this.closeWindow} ><a className="control-box-inner"></a></div>
	    <div className="control-box zoom-box"><div className="control-box-inner"><div className="zoom-box-inner"></div></div></div>
	    <div className="control-box windowshade-box"><div className="control-box-inner"><div className="windowshade-box-inner"></div></div></div>

	    <div>
	      <p id="talk" style={{backgroundColor: "Black", fontSize: "12px", color:"#666"}} />
	    </div>

	    <div className="row-container">
	      <button type="button" id="intersectBtn">SEND</button>
	      <button type="button" id="aNotbBtn">RECV</button>
	      <button type="button" id="bNotaBtn">CLEAR</button>
	    </div>
	  </div>

	  </Draggable>
	  </>
  }
}