import Draggable from 'react-draggable';
// import React, {useState} from 'react';
import React, {useEffect,useState} from 'react';
// import { fetchTest } from './QueryView.jsx';
// import useLocalStorage from './../CustomHooks/UseLocalStorage.js'


export class CallBox extends React.Component{
         constructor(props){
            super(props);
            // this.props.setCallBox = this.props.setCallBox.bind(this)
            this.closeWindow = this.closeWindow.bind(this);
            this.state = {
              toggled: false,
              visibility: '',
              contents: '',
                          };
           }
  componentDidMount() {
    this.setState({visibility:"hidden", toggled: false});
  }

  componentDidUpdate(prevProps, prevState) {
  // if not visible but toggled, make visible.
  console.log(this.state)
  if(prevProps.visCallBox !== this.props.visCallBox){
    console.log('hello!')
    console.log(this.state.visibility)
    console.log(this.props.visCallBox)
    console.log(prevProps.visCallBox);
    if ((this.state.visibility==="hidden")){
      console.log(1)
      this.setState({visibility: "visible"});
      console.log(this.state)
    }

    // if visible but not toggled, make invisible. 
    else if(this.state.visibility==="visible"){
      console.log(2)
      this.setState({visibility: "hidden"});
      console.log(this.state)
    }

    // else if(())
  }
}


  // else if ((this.props.visCallBox !== this.state.visibility)&&(this.state.toggled===this.props.toggled)){
  //   console.log('change')
  //   console.log(this.props.visCallBox, this.state.visibility, this.state.toggled, this.props.toggled)
  //   this.setState({visibility: this.props.visCallBox, toggled: this.props.toggled});
  //   }
  // }

  // else if ((this.props.visCallBox !== this.state.visibility)&&(this.state.toggled===this.props.toggled)){
  //   console.log('change')
  //   console.log(this.props.visCallBox, this.state.visibility, this.state.toggled, this.props.toggled)
  //   this.setState({visibility: this.props.visCallBox, toggled: this.props.toggled});
  //   }
  // }

  closeWindow(){
    console.log('hey')
    console.log(this.props)
    // this.props.setCallBox({visCallBox: "hidden"});
    // const setState = this.setState.bind(this)
    this.setState({visibility: "hidden", toggled: false});
    console.log(this.state)
    document.getElementById("callBoxContent").style.visibility = "hidden";
    // this.props.visCallBox = "hidden";
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
    height: ' 25%',
    width: '25%',
    top: '25%',
    left: '38%',
    backgroundColor: "#030300",
    visibility: this.state.visibility,
  }}>
  {/*<div id="callBoxContent" className="content" style={{visibility: "hidden"}}>*/}
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