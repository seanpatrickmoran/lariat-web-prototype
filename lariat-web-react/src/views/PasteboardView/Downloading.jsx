import React, {useState} from 'react';
import Draggable from 'react-draggable';
import { Rnd } from "react-rnd";

import JSZip from 'jszip'
// import { CallBox } from "./CallBox.jsx";
import "./Downloading.css"
import streamSaver from 'streamsaver'

import { Jimp } from 'jimp';


export default class Downloading extends React.Component{
           constructor(props){
              super(props);
              this.Ref = React.createRef();
              this.closeWindow = this.closeWindow.bind(this);
              this.dumpWithOptions = this.dumpWithOptions.bind(this);
              this.fetchMap = new Map([
                [":", "%3A"], [";", "%3B"], ["<","%3C"], ["=" , "%3D"],
                [">" , "%3E"],["?" , "%3F"],["@" , "%40"],["!" , "%21"],
                ["\"" , "%22"],["#" , "%23"],["$" , "%24"],["%" , "%25"],
                ["&" , "%26"],["'" , "%27"],["(" , "%28"],[")" , "%29"],
                ["*" , "%2A"],["+" , "%2B"],["," , "%2C"],["-" , "%2D"],
                ["." , "%2E"],["/" , "%2F"]]);
              // this.filename = "";

              this.state = {
                downloadActive: true,
                status: "Ready",
                maxAmount: 9000,
                progress: 0,
                width: 600,
                height: 350,
                x: window.innerWidth/2-320,
                y: window.innerHeight/2-280,   
                }

              // this.blobMap = new Map();
           }

  componentDidMount() {
    const parentNode = document.getElementById("download-names");
    while (parentNode.firstChild) {
      parentNode.removeChild(parentNode.lastChild);
    }

    this.setState({maxAmount: this.props.contentSet.size});

    this.props.contentSet.forEach((v) =>{
      const childNode = document.createElement("option");
      childNode.innerHTML = v;
      childNode.value = v;
      childNode.key = v;
      parentNode.appendChild(childNode);
    })
  }

    componentDidUpdate(prevProps, prevState) {
      if(prevState.maxAmount!=this.state.maxAmount){
        this.setState({maxAmount: this.props.contentSet.size});
      }
      if(prevProps.contentSet!=this.props.contentSet){
        this.setState({maxAmount: this.props.contentSet.size});
        const parentNode = document.getElementById("download-names");
        while (parentNode.firstChild) {
          parentNode.removeChild(parentNode.lastChild);
        }

        this.props.contentSet.forEach((v) =>{
          const childNode = document.createElement("option");
          childNode.innerHTML = v;
          childNode.value = v;
          childNode.key = v;
          parentNode.appendChild(childNode);
        })
      }

  }


  closeWindow(){
    this.props.handleIsDownloadingChange("hidden");

    const parentNode = document.getElementById("download-names");
    while (parentNode.firstChild) {
      parentNode.removeChild(parentNode.lastChild);
    }

    this.props.contentSet.forEach((v) =>{
      const childNode = document.createElement("option");
      childNode.innerHTML = v;
      childNode.value = v;
      childNode.key = v;
      parentNode.appendChild(childNode);
    })
  }


  async makeRequests(promiseSixArray) {
    try{
      const responses = await Promise.allSettled(promiseSixArray);
      const successArray = [];

      responses.map(response => { 
        if (response.status === "fulfilled") {
          successArray.push(response);
        }
      });

      const data = await Promise.allSettled(successArray.map(response => 
        response.value.json()
      ));

      const reply = [];
      data.forEach(obj => reply.push(obj.value))
      // this.setState({progress: toString(parseInt(this.state.progress) + 6)});
      return reply;

    } catch {
      console.error("Multiple fetch failed");
    }
  }

  async dumpWithOptions(){

    
    const filename = document.getElementById("filename").value.split(".csv")[0];
    console.log('here')
    this.setState({status: "Running", downloadActive: false})

    console.log(this.state.maxAmount)
    var answer = [];
      // let setArray = [...this.props.contentSet];
      const handleZipDownload = async () => {
        const zip = new JSZip()

        let setArray = [...this.props.contentSet];
        for(var i = 0; i<setArray.length/6+1;i++){

          // array limit error here ^^^
          //do this for as much as it fits.
          var fetchArr = [];
          var j = 0;
          while((j+i*6<setArray.length)&&(j<6)){
            fetchArr.push(            
              fetch(
              `http://localhost:8080/api/getImageSingleton?name=${[...setArray[i*6+j]].map((char) => 
              this.fetchMap.get(char) || char).join("")}`
              )
            )
            j++;
          }

          const storeVal = await this.makeRequests(fetchArr);
          this.setState({progress: this.state.progress + storeVal.length});
          answer.push(...storeVal)
        }

        var stringForBuffer= "Dataset,Name,Chr1,X1,X2,Chr2,Y1,Y2,Resolution,WindowDimensions,MaxViewingVal\n";
        answer.forEach((element) => {
          stringForBuffer += element[0].dataset+","+element[0].name+","
                            +element[0].coordinates+","+element[0].resolution+","
                            +element[0].dimensions+","+element[0].viewing_vmax+"\n";
        })

        const blob = new Blob([stringForBuffer])

        const fileStream = streamSaver.createWriteStream(`${filename||"outputfile"}.csv`, {size: blob.size
        })
        const readableStream = blob.stream()

        if (window.WritableStream && readableStream.pipeTo) {
          return readableStream.pipeTo(fileStream)
            .then(() => {
              console.log('done writing')
              this.setState({status: "Ready", downloadActive: true, progress: 0})
              console.log('here!!!')
      })
        }

        // Write (pipe) manually
        // window.writer = fileStream.getWriter()
        // const reader = readableStream.getReader()
        // const pump = () => reader.read()
        //   .then(res => res.done
        //     ? writer.close()
        //     : writer.write(res.value).then(pump))

        // pump()





        // console.log(answer)


//         this.props.contentSet.forEach(name_query => {


//           const fetchPromise = 
//           fetch(
//             `http://localhost:8080/api/getImageSingleton?name=${[...name_query].map((char) => 
//             this.fetchMap.get(char) || char).join("")}`
//             );

//           fetchPromise.then(response => {
//             return response.json();
//                 }).then(entries => {
//                   console.log(entries[0].name)
//                   console.log(entries[0].rgbaArray) //for now, just do the CSV
//                 });

//         // fetch -> handler
// /*
//       const image = handler.rgbaArray;
//       const pixelSize = 455
//       var image = new Jimp(pixelSize, pixelSize, function (err, image) {
//         let buffer = image.bitmap.data
//         for (var x = 0; x < pixelSize; x++) {
//           for (var y = 0; y < pixelSize; y++) {
//             const offset = (y * pixelSize + x) * 4 // RGBA = 4 bytes
//             buffer[offset    ] = x    // R
//             buffer[offset + 1] = y    // G
//             buffer[offset + 2] = 0    // B
//             buffer[offset + 3] = 255  // Alpha
//           }
//         }
//         image.write('image.png')
//       })
// */

//         // zip.file(img.name, imgData, { base64: true });



//       })
    //   const zipped = await zip.generateAsync(
    //   {
    //     type: 'blob',
    //     comment: 'Optional comment for example your website URL',
    //   })
    //   saveAs(zipped, 'archive file name')
    }
    handleZipDownload();
    // this.setState({status: "Ready", downloadActive: true, progress: "0"})
  }



    pbSelectAll = (event) => {

      const pasteBoardSelectField = document.getElementById("download-names");
      const length = pasteBoardSelectField.options.length;
      for(var i = 0;i<length;i++){
      pasteBoardSelectField.options[i].selected = "selected";
      }
   }


  pbRemove = (event) => {
    const pasteBoardSelectField = document.getElementById("download-names");
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
  }



  render (){

    return  <>
    <Rnd
      id={this.props.id}
      className="content"
      cancel="BoxTitleCloseBox"
      dragHandleClassName="headerTitle"
      minWidth={400}
      minHeight={300}
      size={{ width: this.state.width,  height: this.state.height }}
      position={{ x: this.state.x, y: this.state.y }}
      onDragStop={(e, d) => { this.setState({ x: d.x, y: d.y }) }}
      onClick={() => {
        const divs = document.querySelectorAll(".content");
        divs.forEach(div => { 
          div.style.zIndex-=2
        })
        document.getElementById(this.props.id).style.zIndex=2
      }}      
    >  
        {/*<div id="downloadContent" className="content">*/}
        <div id="BoxTitle" className="headerTitle">
          <div className="topTitleLine"></div>
          <div className="titleLines"></div>
          <div className="titleLines"></div>
          <div className="titleLines"></div>
          <div className="titleLines"></div>
          <div className="bottomTitleLines"></div>
          <div id="BoxTitleHandle" className="callTitle">Download</div>
          <div id="BoxTitleCloseBox" className="control-box close-box" >
          <a id="BoxTitleCloseInner" className="control-box-inner" onClick={this.closeWindow}></a>
          </div>
        </div>

          <div className="row-container">
          <div className="column-container">
            <select id="download-names" multiple size="14">
              
            </select>

          <div className="row-container">
            <button className="command_button" id="pbSelect" onClick={this.pbSelectAll}>Select All</button>
            <button className="command_button" id="pbRemove" onClick={this.pbRemove}>Remove</button>
          </div>

          </div>


          <div className="column-container">

        <div className="row-container">

          <div id="downloadBlock" className="column-container">
            <div id="downloadRow" className="row-container">
              <p>Set a filename</p>
            </div>
            <div id="downloadRow" className="row-container">
              <input type="text" id="filename" placeholder="OutfileName.csv" />
            </div>

            <div id="downloadRow" className="row-container">
              <button disabled={!this.state.downloadActive} className="command-button" value="Download" onClick={this.dumpWithOptions}>Download</button>
              <button disabled={this.state.downloadActive} className="command-button" value="Cancel" >Cancel</button>
            </div>
          </div>

        </div>

            <div id="downloadRow" className="row-container">
              <input type="checkbox" id="CSV" value="CSV" checked/>
              <label for="vehicle1"> Table as CSV </label>
            </div>
            <div id="downloadRow" className="row-container">
              <input type="checkbox" id="Image" value="True Image"/>
              <label for="vehicle1"> Images </label>
            </div>
            <div id="downloadRow" className="row-container">
              <input type="checkbox" id="Histogram" value="Histogram"/>
              <label for="vehicle1"> Histograms </label>
            </div>
            <div id="downloadRow" className="row-container">
              <div id="idCOMPT">
                <label for="progress-bar">{this.state.status}</label>
                <progress id="progress-bar" value={this.state.progress} max={this.state.maxAmount}>{toString(this.state.progress)}%</progress>
              </div>
            </div>
          </div>
        </div>

  </Rnd>


        </>
  }
}