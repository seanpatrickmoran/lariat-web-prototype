import React, {useState} from 'react';
import Draggable from 'react-draggable';
import { Plasma } from "./plasma.js"

import { CallBox } from "./CallBox.jsx";
// import { ipcRenderer } from 'electron';


export default class Error404 extends React.Component{
           constructor(props){
              super(props);
              this.getTheBoys = this.getTheBoys.bind(this);
              // this.closeWindow = this.closeWindow.bind(this);
              this.state = {
                isCalling: "hidden",
              };
              this.handleCallChange = this.handleCallChange.bind(this);

           }

  componentDidMount() {
      var plasmaBox = new Plasma(document.getElementById('plasmaArea'),120,35);
  }


  getTheBoys(){
    this.setState({isCalling : "visible"})    

    const fetchPromise = fetch(`http://localhost:8080/api/talk`);
    fetchPromise.then(response => {
              return response.json();
                  }).then(entries => {
                    document.getElementById("talk").innerHTML = entries;
                    // console.log(entries);
                  });
    console.log('meow!')

  }


  handleCallChange(){
    if(this.state.isCalling=="hidden"){
      this.setState({isCalling: "visible"})
    } else{
    this.setState({isCalling: "hidden"})
    }  
  }


  render (){
    var code = String.raw`
     /^^       /^^           /^^   
    / /^^    /^^  /^^      / /^^   
   /^ /^^   /^^    /^^    /^ /^^   
 /^^  /^^   /^^    /^^  /^^  /^^   
/^^^^ /^ /^^ /^^   /^^ /^^^^ /^ /^^
      /^^      /^^^          /^^   
                                  `
    return  <>

    <body>
      <pre style={{backgroundColor: "transparent", fontSize: "12px", color:"#666", textAlign: "center"}}>{code}</pre>
      <div align="center"><pre id="plasmaArea" style={{backgroundColor: "transparent", fontSize: "12px", color:"#666"}}>ASCIIPlasma</pre></div>

      <h3 style={{backgroundColor: "transparent", fontSize: "12px", color:"#666", textAlign: "center"}}> That's not good.</h3>
      {/*<a href="/" style={{textAlign: "center", flex: 1}}>Go Home</a>*/}

      <div style={{flex: 1, textAlign: 'center'}}>
      <a href="javascript: void(0)" style={{backgroundColor: "transparent", fontSize: "12px", color:"#666"}} onClick={this.getTheBoys}>Call for help</a>
      <p/>
      <a href="/" style={{backgroundColor: "transparent", fontSize: "12px", color:"#666"}}>Go Home</a>
      </div>

      <div id="callBoxDiv">
        <CallBox isCalling={this.state.isCalling} handleCallChange={this.handleCallChange}/>

{/*        <Draggable
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
          visibility: this.state.visCallBox,
        }}>

          <h1 className="title">Call</h1>
          <div className="control-box close-box" onClick={this.closeWindow} ><a className="control-box-inner"></a></div>
          <div className="control-box zoom-box"><div className="control-box-inner"><div className="zoom-box-inner"></div></div></div>
          <div className="control-box windowshade-box"><div className="control-box-inner"><div className="windowshade-box-inner"></div></div></div>

          <div>
            <pre id="talk" style={{backgroundColor: "Black", fontSize: "12px", color:"#666"}} />
          </div>
          <div className="row-container">
            <input/>
          </div>
          <div className="row-container">
            <button type="button" id="intersectBtn">SEND</button>
            <button type="button" id="aNotbBtn">RECV</button>
            <button type="button" id="bNotaBtn">CLEAR</button>
          </div>
        </div>

        </Draggable>*/}

      </div>
    </body>
    </>
  }
}