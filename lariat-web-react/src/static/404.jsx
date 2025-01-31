import React, {useState} from 'react';
import Draggable from 'react-draggable';
import { Plasma } from "./plasma.js"
// import { ipcRenderer } from 'electron';


export default class Error404 extends React.Component{
  eventLogger = (e, data) => {
    console.log('Event: ', e);
    console.log('Data: ', data);
  };

  // onloadHandler() {
  //   plasmaBox = new Plasma(document.getElementById('plasmaArea'),90,30);
  // }
  componentDidMount() {
      console.log('hello')
      var plasmaBox = new Plasma(document.getElementById('plasmaArea'),120,35);

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

    <body style={{
        backgroundColor: "Black",
        backgroundImage: "none"}}>
      <pre style={{backgroundColor: "Black", fontSize: "12px", color:"#666", textAlign: "center"}}>{code}</pre>
      <div align="center"><pre id="plasmaArea" style={{backgroundColor: "Black", fontSize: "12px", color:"#666"}}>ASCIIPlasma</pre></div>

      <h3 style={{backgroundColor: "Black", fontSize: "12px", color:"#666", textAlign: "center"}}> That's not good.</h3>
      {/*<a href="/" style={{textAlign: "center", flex: 1}}>Go Home</a>*/}

      <div style={{flex: 1, textAlign: 'center'}}>
      <a href="/" style={{backgroundColor: "Black", fontSize: "12px", color:"#666"}}>Go Home</a>
      </div>

      <p><br/><br/><br/><br/><br/><br/><br/><br/></p>
    </body>
    </>
  }
}