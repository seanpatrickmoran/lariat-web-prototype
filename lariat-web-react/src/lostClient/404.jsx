import React, {useState} from 'react';
import Draggable from 'react-draggable';
import { Plasma } from "./plasma.js"

import { CallBox } from "./CallBox.jsx";

import {error404, errorRenders} from "./errorMessages.js";
// import { ipcRenderer } from 'electron';


export default class Error404 extends React.Component{
           constructor(props){
              super(props);
              // this.closeWindow = this.closeWindow.bind(this);
              this.state = {
                isCalling: "hidden",
              };
              this.handleCallChange = this.handleCallChange.bind(this);
              this.getTheBoys = this.getTheBoys.bind(this);

           }

  componentDidMount() {
    // var plasmaBox = new Plasma(document.getElementById('render'),120,35);
  }


  getTheBoys(){
    this.setState({isCalling : "visible"})    
    // var plasmaBox = new Plasma(document.getElementById('render'),120,35);


    // const fetchPromise = fetch(`http://localhost:8080/api/talk`);
    // fetchPromise.then(response => {
    //           return response.json();
    //               }).then(entries => {
    //                 document.getElementById("talk").innerHTML += String.raw`${entries}`;
    //                 // console.log(entries);
    //               });
    // console.log('meow!')

  }


  handleCallChange(){
    if(this.state.isCalling=="hidden"){
      this.setState({isCalling: "visible"})
    } else{
    this.setState({isCalling: "hidden"})
    // document.getElementById('render').innerHTML = errorRenders[Math.floor(Math.random() * errorRenders.length)];
    }  
  }


  render (){

    // array[Math.floor(Math.random() * array.length)];
    var code = error404[Math.floor(Math.random() * error404.length)];
    var image = errorRenders[Math.floor(Math.random() * errorRenders.length)];

    return  <>

    <body>
      <pre style={{backgroundColor: "transparent", fontSize: "12px", color:"#666", textAlign: "center"}}>{code}</pre>
      {/*<div align="center"><pre id="plasmaArea" style={{backgroundColor: "transparent", fontSize: "12px", color:"#666"}}>ASCIIPlasma</pre></div>*/}
      <pre id="render" style={{backgroundColor: "transparent", fontSize: "12px", color:"#666", textAlign: "center"}}>{image}</pre>
      <h3 style={{backgroundColor: "transparent", fontSize: "12px", color:"#666", textAlign: "center"}}> That's not good.</h3>
      {/*<a href="/" style={{textAlign: "center", flex: 1}}>Go Home</a>*/}

      <div style={{flex: 1, textAlign: 'center'}}>
      <a href="javascript: void(0)" style={{backgroundColor: "transparent", fontSize: "12px", color:"#666"}} onClick={this.getTheBoys}>Call for help</a>
      <p/>
      <a href="/" style={{backgroundColor: "transparent", fontSize: "12px", color:"#666"}}>Go Home</a>
      </div>

      <div id="callBoxDiv" style={{visibility: this.state.isCalling}}>
        <CallBox isCalling={this.state.isCalling} handleCallChange={this.handleCallChange}/>
      </div>
    </body>
    </>
  }
}