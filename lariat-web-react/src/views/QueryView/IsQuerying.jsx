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
              this.fromUserQuery = this.fromUserQuery.bind(this);
              this.routeQuery = this.routeQuery.bind(this);
              this.toggleSearchInput = this.toggleSearchInput.bind(this)
              this.fromLariatQuery = this.fromLariatQuery.bind(this);
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
                toggleDropzone: false,
                resChoices: ["All"],
                toolChoices: ["All"],
                // imageNodeList: new Array(),
                }

                this.resChoices= ["All","2000","5000","10000"]
                this.toolChoices= ["All","mustache","quagga"]
                this.imageNodeList = new Array()
                this.searchInputRoute = ""
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




  routeQuery = async () => {
    //Check Fields
    const datasetSearchFilter = document.querySelectorAll("#DatasetSelected");
    const resolutionSearchFilter = document.querySelectorAll("#ResolutionSelected");
    const toolsSearchFilter =  document.querySelectorAll("#ToolSelected");

    var datasetNames = new Array();
    var resolutionNames = new Array();
    var toolsNames = new Array();

    //Load datafields or All
    for(var i = 0; i<datasetSearchFilter.length;i++){
      if (datasetSearchFilter[i].innerHTML === "All"){
        datasetNames = [];
        datasetNames = [...Object.keys(this.props.storetable)]
      break;
      } else {
        datasetNames.push(datasetSearchFilter[i].innerHTML)
      }
    }

    //Load res fields or All
    for(var i = 0; i<resolutionSearchFilter.length;i++){
      if (resolutionSearchFilter[i].innerHTML === "All"){
        resolutionNames = [];
        resolutionNames = this.resChoices.slice(1);
      break;
      } else {
        resolutionNames.push(resolutionSearchFilter[i].innerHTML)
      }
    }

    //Load tool fields or All
    for(var i = 0; i<toolsSearchFilter.length;i++){
      if (toolsSearchFilter[i].innerHTML === "All"){
        toolsNames = [];
        toolsNames = this.toolChoices.slice(1);
      break;
      } else {
        toolsNames.push(toolsSearchFilter[i].innerHTML)
      }
    }

    //Constr. Parameter for 
    var queryRoute = ""
    datasetNames.forEach((dataElm) => {
      resolutionNames.forEach((resElm) => {
        toolsNames.forEach((toolElm) => {
          console.log(dataElm+resElm+toolElm)
          queryRoute += dataElm+resElm+toolElm + ","
          
        })
      })
    })

    // queryRoute is the submission for search @ /bitmaskSearch
    console.log("queryRoute")
    console.log(queryRoute)
    return queryRoute
  }



  //One method, we check for user supplied images and submit them one at a time
  fromUserQuery = async () => {
    const queryRoute = this.routeQuery();
    console.log('dropzone')

    const parentNode = document.querySelector("#accepted_files")
    for(var i = 0; i<parentNode.childNodes.length;i++){
      console.log(parentNode.childNodes[i].key.split(",")[1])
      console.log(Uint8Array.from(atob(parentNode.childNodes[i].key.split(",")[1]), c => c.charCodeAt(0)))

      //process image to 65x65.


      //for each, fetch to flaskAPI (or fetch as batch)
          //to support this we need a live inference model.

      //provide HOWTO for people to make their own embeddings?

      //1. Handle Images that are ours
      //2. Handle Images that are from user.


    }
  }

  //Two method, we use Lariat stashed images for query
  fromLariatQuery = async () => {
    const queryRoute = this.routeQuery();
    console.log('lariat')

  }


  submitQuery = async () => {
    console.log(this.searchInputRoute)
    switch(this.searchInputRoute){
      case("clipboard"):
        await this.fromLariatQuery();
        break;
      case("dropzone"):
        await this.fromUserQuery();
        break;
      default:
        console.log('huh')
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



toggleSearchInput(response){
    const label = response[0]
    const reply = response[1]

    console.log(label, reply)
    switch(reply) {
      case "User Upload":
        document.querySelector("#dropzone-blind").style.visibility="visible" 
        document.querySelector("#clipboard-blind").style.visibility="hidden"
        this.searchInputRoute = "dropzone"
        console.log(this.searchInputRoute)
        break;
      case "Clipboard":
        document.querySelector("#dropzone-blind").style.visibility="hidden" 
        //it seems unusable when hidden. no need to disable?
        document.querySelector("#clipboard-blind").style.visibility="visible"
        this.searchInputRoute = "clipboard"
        console.log(this.searchInputRoute)
        break;
      default:
        // code block
    }
    // } 
  };



  componentDidUpdate(prevProps, prevState) {
    if(prevProps.searchVisible != this.props.searchVisible){
      const divs = document.querySelectorAll(".content");
    // this.setState({showAnt: this.props.searchVisible})

    divs.forEach(div => { 
        div.style.zIndex-=2
      })

      document.getElementById(this.props.id).style.zIndex=0
    document.querySelector("#dropzone-blind").style.visibility=this.props.searchVisible 
    }
  }

  closeWindow(){
    // this.setState({showAnt: 'hidden'})
    // setTimeout(this.setState({showAnt: 'hidden'}))
    // document.querySelector(".selectSpace").style.visibility="hidden"
    this.props.setSearchVisible("hidden")
    document.querySelector("#dropzone-blind").style.visibility="hidden" 
    document.querySelector("#clipboard-blind").style.visibility="hidden"
    this.searchInputRoute = "dropzone"
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



  queryClipboardSelectAll = (event) => {
    const pasteBoardSelectField = document.getElementById("query-names");
    const length = pasteBoardSelectField.options.length;
    for(var i = 0;i<length;i++){
    pasteBoardSelectField.options[i].selected = "selected";
    }
  }


  querySearchRemove = (event) => {
    const pasteBoardSelectField = document.getElementById("query-names");
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
      <div className="column-container" style={{margin: 8, marginLeft:22, width:300}}>
        <div className="row-container" style={{justifyContent: "center", height: 24}}>

          <MultiDropdownApp   id="dataset" 
                              tag={"Dataset"} 
                              choices={["All",...Object.keys(this.props.storetable)]}>
          </MultiDropdownApp>

          <MultiDropdownApp   id="resolution" 
                              tag={"Resolution"} 
                              choices={[...this.resChoices]}>
          </MultiDropdownApp>

          <MultiDropdownApp   id="tools" 
                              tag={"Tool"} 
                              choices={[...this.toolChoices]} 
                              handleChange={this.handleToolChange}>
          </MultiDropdownApp>
        </div>
      </div>

      <div className="row-container" style={{justifyContent: "center"}}>
        <div className="column-container" style={{margin: 8, marginLeft:22}}>

{/*            <label class="switch">
              <input type="checkbox" on></input>
              <span className="slider round"></span>
            </label>*/}
          <div id="dropzone-blind">
            <Dropzone   onDrop={acceptedFiles => this.handleFileUpload(acceptedFiles)} 
                        disabled={this.state.toggleDropzone}>

              {({getRootProps, getInputProps}) => (
                <div style={{ display:"flex", 
                              alignItems: "center", 
                              justifyContent: "center", 
                              width: 400, 
                              backgroundColor:"#141414",
                              marginTop:22, 
                              marginRight:22}}>

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
                    <p style={{marginBottom: 0}}>
                      Drag 'n' drop some files here, or click to select files
                    </p>
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

          <div id="clipboard-blind" style={{marginTop: -160, visibility: "hidden"}}>

            <select id="query-names" style={{width: 600}} multiple size="8">
            </select>
            <div className="row-container">
              <button   className="command_button" 
                        id="querySearchSelect" 
                        onClick={this.queryClipboardSelectAll}>
                        Select All
              </button>

              <button   className="command_button" 
                        id="querySearchRemove" 
                        onClick={this.querySearchRemove}>
                        Remove
              </button>
            </div>

          </div>


        </div>

      </div>
      <div    className="row-container" 
              style={{justifyContent: "center"}}>

        <div    className="row-container">

          <button   onClick={this.submitQuery}>
          Search
          </button>

{/*            <select name="available" id="user-source-select" selected="user">
              <option value="user">Upload</option>
              <option value="database">Lariat Database</option>
              <option value="all">All</option>
            </select>*/}

          <DownshiftTwo   tag="Input Source"
                          choices={["User Upload", "Clipboard"]} 
                          handleChange={this.toggleSearchInput}>
          </DownshiftTwo>

          <DownshiftTwo   tag="Vector Search Type"
                          choices={["All","Images","Epigenomic","Loop Orientation"]} 
                          handleChange={this.handleChange}>
          </DownshiftTwo>
        </div>
      </div>
    </Rnd>
          </>
  }
}