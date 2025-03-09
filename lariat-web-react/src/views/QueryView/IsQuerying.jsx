import React, {useState} from 'react';
import Draggable from 'react-draggable';
import { Rnd } from "react-rnd";
import Downshift from 'downshift'

import DownshiftTwo from './MultiDownshift.jsx';
import { MultiDownshift, MultiDropdownApp,  ArrowIcon } from './MultiDropDown.jsx'
// import { Select, Space } from 'antd';

// import JSZip from 'jszip'
// import { CallBox } from "./CallBox.jsx";
import "./isquery.css"
// import { Select } from "antd";
import streamSaver from 'streamsaver'
import Dropzone from 'react-dropzone'



export default class IsQuerying extends React.Component{
            //searchVisible, setSearchVisible props
           constructor(props){
              super(props);
              this.Ref = React.createRef();
              this.closeWindow = this.closeWindow.bind(this);
              this.dumpWithOptions = this.dumpWithOptions.bind(this);
              this.submitQuery = this.submitQuery.bind(this);
              this.handleFileUpload = this.handleFileUpload.bind(this);
              // this.handleDatasetChange = this.handleDatasetChange.bind(this);
              // this.handleResolutionChange = this.handleResolutionChange.bind(this);
              // this.handleToolChange = this.handleToolChange.bind(this);

              // this.showCheckboxes = this.showCheckboxes.bind(this);
              this.fetchMap = new Map([
                [":", "%3A"], [";", "%3B"], ["<","%3C"], ["=" , "%3D"],
                [">" , "%3E"],["?" , "%3F"],["@" , "%40"],["!" , "%21"],
                ["\"" , "%22"],["#" , "%23"],["$" , "%24"],["%" , "%25"],
                ["&" , "%26"],["'" , "%27"],["(" , "%28"],[")" , "%29"],
                ["*" , "%2A"],["+" , "%2B"],["," , "%2C"],["-" , "%2D"],
                ["." , "%2E"],["/" , "%2F"]]);

              this.state = {
                width: 800,
                height: 442,
                x: window.innerWidth/2-400,
                y: window.innerHeight/2-300,
                showSearch: true,
                ChooseDownshift : {
                  "Dataset": "Select Dataset",
                  "Resolution": "Select Resolution",
                  "Tool": "Select Tool",
                  "Search": "Select Similarity Type",
                  },
                resChoices: ["All"],
                toolChoices: ["All"],
                // imageNodeList: new Array(),
                }
              // this.featureOptions = this.props.storetable[Object.keys(this.props.storetable)[0]][Object.keys(this.props.storetable[Object.keys(this.props.storetable)[0]])[0]].map((el) => return el)
              // this.datasets = ["All"].concat([...Object.keys(this.props.storetable)])
              // this.ChooseDownshift = {
              //     Dataset: "Select Dataset",
              //     Resolution: "Select Resolution",
              //     Tool: "Select Tool",
              //     Search: "Select Similarity Type",
              //   }
                this.resChoices= ["All","2000","5000","10000"]
                this.toolChoices= ["All","mustache","quagga"]
                this.imageNodeList = new Array()
              }

  componentDidMount() {
  }



  async handleFileUpload(fileArray){
    const parentNode = document.querySelector("#accepted_files")
    const dataTransfer = new DataTransfer();
    for(var i=0;i<fileArray.length;i++){
      const fptr = fileArray[i]
      dataTransfer.items.add(fptr)

      //already loaded, or not image.
      if((fptr.type.split("/")[0]!="image")||(document.querySelector(`[id="${fptr.name}"]`)!=undefined)){
        continue
      }

      let childDiv = document.createElement('div');
      childDiv.id = `${fptr.name}`;
      let childX = document.createElement('button');
      childX.innerHTML = "x";
      childX.style.width = 12;
      childX.style.height = 12;
      childX.onclick = function(e){
        document.querySelector(`[id="${fptr.name}"]`).remove()
      }
      // document.querySelector(`[id="@asked-gpt-to-draw-anything-he-wants-and-im-satisfied-v0-u2wvxv3qlwge1.webp"]`).onclick = function(e){document.querySelector(`[id="@asked-gpt-to-draw-anything-he-wants-and-im-satisfied-v0-u2wvxv3qlwge1.webp"]`).remove()}
      childDiv.append(childX)
      let childspan = document.createElement('span');
      childspan.innerHTML = ` ${fptr.name}`;
      childDiv.append(childspan);

      // let childNode = document.createElement('p');
      // childNode.id = `@${fptr.name}`;
      // childNode.innerHTML = `@ ${fptr.name}`;
      parentNode.append(childDiv);
      const reader = new FileReader();


      switch(fptr.type){
        /*
        handling SVG https://developer.mozilla.org/en-US/docs/Web/API/Path2D/Path2D

        let p = new Path2D("M10 10 h 80 v 80 h -80 Z");
        ctx.fill(p);
        */
        case "image/svg+xml": 
          alert("upload failed!!! not implemented!")
          // console.log("not implemented!")
          // console.log(`[id="@${fptr.name}"]`)
          document.querySelector(`[id="${fptr.name}"]`).remove()
          break;

        //handles PNG/JPEG
        default:
          reader.onload = async function (event) {
            const scalar = 128

            const imageNode = document.createElement('canvas');
            imageNode.id = `canvasImage@${fptr.name}`
            imageNode.style.marginLeft="12px"

            var ctx = imageNode.getContext("2d");

            // const imageData = new ImageData(imageDataArray, 455, 455);
            // ctx.putImageData(imageData, 0, 0);

            console.log(this.imageNodeList)

            //standard images
            const imageData = new Image();
            imageData.onload=function(){
              var scalewidth = this.width
              var scaleheight = this.height
              console.log(scalewidth, scaleheight)
              if(scalewidth<scaleheight){
                const multiplier = scaleheight/scalar
                imageNode.width = ctx.width = this.width/multiplier
                imageNode.height= ctx.height = this.height/multiplier
              ctx.drawImage(this,0,0,this.width/multiplier,scalar);

              } else {
                const multiplier = scalewidth/scalar
                imageNode.height = ctx.height = this.height/multiplier
                imageNode.width = ctx.width = this.width/multiplier
              ctx.drawImage(this,0,0,scalar,this.height/multiplier);
              }
            }
            imageData.src=event.target.result;
            childDiv.key=event.target.result;
            childDiv.append(document.createElement('br'))
            childDiv.append(imageNode)
          }
      };

     reader.readAsDataURL(dataTransfer.files[i])
    }
  }


  submitQuery = async () => {

    const parentNode = document.querySelector("#accepted_files")
    for(var i = 0; i<parentNode.childNodes.length;i++){
      console.log(parentNode.childNodes[i].key.split(",")[1])
      console.log(Uint8Array.from(atob(parentNode.childNodes[i].key.split(",")[1]), c => c.charCodeAt(0)))

      //process image to 65x65.


      //for each, fetch to flaskAPI (or fetch as batch)
          //to support this we need a live inference model.

      //provide HOWTO for people to make their own embeddings?

    }
  } 
    // console.log(dataTransfer.files)

    // for(var i=0;i<dataTransfer.files.length;i++){
    //   console.log("here")
    //   // var imageData = new Image();
    //   // console.log(dataTransfer.files[i])
    //   const fileNode = document.querySelector(`[id="@${dataTransfer.files[i].name}"]`)


    //   const imageNode = document.createElement('canvas');
    //   var ctx = imageNode.getContext("2d");
    //   ctx.width = ctx.height = 100;
    //   dataTransfer.setData("text/plain", imageNode.toDataURL())
    //   // imageData.onload=function(){ctx.drawImage(this,0,0);}
    //   // const imageBase64 = reader.readAsDataURL(dataTransfer.files[i])
    //   // imageData.onload=function(){ctx.drawImage(this,0,0);}
    //   // imageData.src=imageBase64

    //   fileNode.append(imageNode)

    //   imageData.decode().then(() => {
    //       let width = imageData.width;
    //       let height = imageData.height;
    //       console.log("here")
    //       console.log(width, height)
    //   });
    // }

    // console.log(dataTransfer.files)
    // }




  // handleDatasetChange(value){
  //   const reply = new Set()
  //   for(var i=0;i<value.length;i++){
  //     if(value[i].name==="All"){
  //       Object.keys(this.props.storetable).forEach((dataKey =>{
  //         Object.keys(this.props.storetable[dataKey]).forEach((resKey =>{
  //           reply.add(resKey)
  //         }))
  //       }))
  //       break;

  //     } else{
  //       Object.keys(this.props.storetable[value[i].name]).forEach((entry =>{
  //         reply.add(entry)
  //       }))
  //     }
  //   }
  //   console.log(reply)
  //   this.setState({resChoices: ["All", ...reply]})
  // }


  // handleResolutionChange(value){
  //   console.log(this.props)
  //   const dataSelected = document.querySelectorAll("#DatasetSelected")
  //   // const resolutionSelected = document.querySelectorAll("#DatasetSelected")
  //   const reply = new Set()
  //   for(var i=0;i<value.length;i++){
  //     console.log(value[i].name)
  //     if(value[i].name==="All"){
  //       dataSelected.forEach((dataKey =>{
  //         console.log(dataKey.innerHTML)
  //         Object.keys(this.props.storetable[dataKey.innerHTML]).forEach((resKey =>{
  //           this.props.storetable[dataKey.innerHTML][resKey].forEach((toolKey =>{
  //             reply.add(toolKey)
  //           }))
  //         }))
  //       }))
  //       break;

  //     } else{
  //       dataSelected.forEach((dataKey =>{
  //         console.log(dataKey.innerHTML)
  //         this.props.storetable[dataKey.innerHTML][value[i].name].forEach((toolKey =>{
  //             reply.add(toolKey)
  //           }))
  //         }))
  //     }
  //   }
  //   console.log(reply)
  //   this.setState({toolChoices: ["All", ...reply]})
  //   // console.log( this.state.resChoices)
  // }

  // handleToolChange(value){
  //   const reply = []
  //   for(var i=0;i<value.length;i++){
  //     // Object.keys(this.props.storetable[value[i].name]).forEach(key =>{
  //       // reply.add(key)
  //     // })
  //     console.log(value[i])
  //     // console.log(this.props)

  //   }
  //   // const outfield = new Set();
  //   // if(reply.includes("All")){
  //     //take all resolutions from our tableMemory and add them to field 2
  //   // } else {
  //     // for(var i=0;i<reply.length;i++){
  //       // this.props.storetable[]
  //     // }
  //     //take resolutions as expected and move them to field 2. 
  //   // console.log(reply)

  // }


  handleChange(value){
    // console.log(this.ChooseDownshift[value[0]])
    // this.ChooseDownshift[value[0]] = value[1]
    // console.log(this.ChooseDownshift[value[0]])
    console.log(value)
    const name = value[0]
    const reply = value[1]

    console.log(name, reply)

    if(reply!="All"){
      switch(name) {
        case "Dataset":
          var dlisted = Object.keys(this.props.storetable[reply])
          // this.setState({resChoices: ["All", ...dlisted]})
          this.resChoices =  ["All", ...dlisted]
          console.log(dlisted)
          console.log(this.resChoices)
          // console.log(this.state.resChoices)
          break;
        case "Resolution":
          const rlisted = document.querySelectorAll("span#DatasetSelected").forEach((entry =>{
            console.log(...this.props.storetable[entry.innerHTML])
            return [...this.props.storetable[entry.innerHTML]]
          }))
          // [...this.props.storetable[document.querySelectorAll("span#DatasetSelected").innerHTML][reply]]
          this.toolChoices= ["All", ...rlisted]
          console.log(rlisted)
          console.log(this.toolChoices)
          break;
        default:
          // code block
      }
    } 
  };



  componentDidUpdate(prevProps, prevState) {
    // if((prevState.resChoices!=this.state.resChoices)||(prevState.toolChoices!=this.state.toolChoices)){
      // this.setState({resChoices: this.state.resChoices, toolChoices, this.state.toolChoices})

    // }

    // if((prevState.resChoices!=this.state.resChoices)||(prevState.toolChoices!=this.state.toolChoices)){
    //   console.log("state changed")
    //   this.setState({resChoices: this.state.resChoices, toolChoices: this.state.toolChoices})
    //   this.resChoices = this.state.resChoices;
    //   this.toolChoices = this.state.toolChoices;
    //   console.log(this.resChoices)
    // }

    if(prevProps.searchVisible != this.props.searchVisible){
      const divs = document.querySelectorAll(".content");
    // this.setState({showAnt: this.props.searchVisible})

    divs.forEach(div => { 
        div.style.zIndex-=2
      })

      document.getElementById(this.props.id).style.zIndex=0
    // document.querySelector(".selectSpace").style.visibility=this.props.searchVisible
    }
  }

  closeWindow(){
    // this.setState({showAnt: 'hidden'})
    // setTimeout(this.setState({showAnt: 'hidden'}))
    // document.querySelector(".selectSpace").style.visibility="hidden"
    this.props.setSearchVisible("hidden")
    // this.props.handleIsDownloadingChange("hidden");
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
  }



  pbSelectAll = (event) => {
  }


  pbRemove = (event) => {
  }


  render (){

    return  <>
    <Rnd
      id={this.props.id}
      className="content"
      cancel="BoxTitleCloseBox"
      dragHandleClassName="headerTitle"
      minWidth={800}
      minHeight={442}
      size={{ width: this.state.width,  height: this.state.height }}
      style={{ visibility: this.props.searchVisible }}
      position={{ x: this.state.x, y: this.state.y }}
      onDragStop={(e, d) => { this.setState({ x: d.x, y: d.y }) }}
      onResizeStop={(e, direction, ref, delta, position) => {
        this.setState({
          width: ref.style.width,
          height: ref.style.height,
          ...position,
        });
      }}
      onClick={() => {
        const divs = document.querySelectorAll(".content");
        divs.forEach(div => { 
          div.style.zIndex-=2
        })
        // console.log(this.props.id)
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
          <div id="BoxTitleHandle" className="callTitle">Vector Search</div>
          <div id="BoxTitleCloseBox" className="control-box close-box" >
          <a id="BoxTitleCloseInner" className="control-box-inner" onClick={this.closeWindow}></a>
          </div>
        </div>
        <div className="row-container" style={{justifyContent: "center", height: 380}}>
          <div className="column-container" style={{margin: 8, marginLeft:22, width:300}}>

          <MultiDropdownApp id="dataset" tag={"Dataset"} choices={["All",...Object.keys(this.props.storetable)]}></MultiDropdownApp>
          <MultiDropdownApp id="resolution" tag={"Resolution"} choices={[...this.resChoices]}></MultiDropdownApp>
          <MultiDropdownApp id="tools" tag={"Tool"} choices={[...this.toolChoices]} handleChange={this.handleToolChange}></MultiDropdownApp>

          <div className="row-container" style={{margin: 8, marginLeft:22, width:600}}>
            <DownshiftTwo   tag="Similarity Type"
                            choices={["All","Images","Epigenomic","Loop Orientation"]} handleChange={this.handleChange}>
            </DownshiftTwo>
          </div>

          </div>

          <div className="column-container" style={{margin: 8, marginLeft:22}}>

            <Dropzone onDrop={acceptedFiles => this.handleFileUpload(acceptedFiles)}>
              {({getRootProps, getInputProps}) => (
                <div style={{display:"flex", alignItems: "center", justifyContent: "center", width: 400, backgroundColor:"#141414", marginTop:22, marginRight:22}}>
                  <div {...getRootProps()}
                        style={{  textAlign: "center",
                                  height: 80,
                                  width: 300,
                                  margin: 36,
                                  padding: 20,
                                  border: "1px dashed rgb(112 112 112)",
                                  colorScheme: "dark",
                                  backgroundColor: "#141414"
                                }}>
                    <input {...getInputProps()} />
                    <p style={{marginBottom: 0}}>Drag 'n' drop some files here, or click to select files</p>
                  </div>
                </div>
              )}
            </Dropzone>

            <div  id="accepted_files" 
                  style={{  whiteSpace: "pre-wrap", 
                            wordBreak: "break-word",
                            overflowY: "scroll",
                            maxHeight: "200px",
                            margin: "12px",
                            width: "400px"
                          }}>
            </div>
          </div>
        </div>
        <button   onClick={this.submitQuery}
                  style={{marginLeft: "60px"}}>
        Submit Search
        </button>


  </Rnd>


        </>
  }
}