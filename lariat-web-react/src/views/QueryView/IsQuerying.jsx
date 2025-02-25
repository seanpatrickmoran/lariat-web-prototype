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
                height: 600,
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
      if((fptr.type.split("/")[0]!="image")||(document.querySelector(`[id="@${fptr.name}"]`)!=undefined)){
        continue
      }

      let childNode = document.createElement('p');
      childNode.id = `@${fptr.name}`;
      childNode.innerHTML = `@ ${fptr.name}`;
      parentNode.append(childNode);
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
          document.querySelector(`[id="@${fptr.name}"]`).remove()
          break;

        //handles PNG/JPEG
        default:
          reader.onload = async function (event) {
            const scalar = 128
            const imageNode = document.createElement('canvas');
            imageNode.id = `canvasImage@${fptr.name}`
            imageNode.style.marginLeft="12px"

            var ctx = imageNode.getContext("2d");

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
            childNode.key=event.target.result;
            childNode.append(document.createElement('br'))
            childNode.append(imageNode)
          }
      };

     reader.readAsDataURL(dataTransfer.files[i])
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




  // showCheckboxes() {
  //     const cbox = document.querySelector("#checkBoxes");
  //     console.log(cbox)
  //     console.log(this.state.showSearch)

  //     if (this.state.showSearch===true) {
  //         cbox.style.display = "block";
  //         this.setState({showSearch: false});
  //     } else {
  //         cbox.style.display = "none";
  //         this.setState({showSearch: true});
  //     }
  // }


  render (){

    return  <>
    <Rnd
      id={this.props.id}
      className="content"
      cancel="BoxTitleCloseBox"
      dragHandleClassName="headerTitle"
      minWidth={720}
      minHeight={400}
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
        <div className="row-container" style={{justifyContent: "center"}}>
          <div className="column-container" style={{margin: 8, marginLeft:22, width:300}}>
{/*
          <MultiDropdownApp id="dataset" tag={"Dataset"} choices={["All",...Object.keys(this.props.storetable)]}  handleChange={this.handleDatasetChange}></MultiDropdownApp>
          <MultiDropdownApp id="resolution" tag={"Resolution"} choices={[...this.resChoices]}  handleChange={this.handleResolutionChange}></MultiDropdownApp>
          <MultiDropdownApp id="tools" tag={"Tool"} choices={[...this.toolChoices]} handleChange={this.handleToolChange}></MultiDropdownApp>*/}
          
          <MultiDropdownApp id="dataset" tag={"Dataset"} choices={["All",...Object.keys(this.props.storetable)]}></MultiDropdownApp>
          <MultiDropdownApp id="resolution" tag={"Resolution"} choices={[...this.resChoices]}></MultiDropdownApp>
          <MultiDropdownApp id="tools" tag={"Tool"} choices={[...this.toolChoices]} handleChange={this.handleToolChange}></MultiDropdownApp>
{/*
          <DownshiftTwo id="dataset" tag={"Dataset"} choices={["All",...Object.keys(this.props.storetable)]} handleChange={this.handleChange}>
          </DownshiftTwo>
          <DownshiftTwo id="resolution" tag={"Resolution"} choices={[...this.resChoices]} handleChange={this.handleChange}>
          </DownshiftTwo>
          <DownshiftTwo id="tools" tag={"Tool"} choices={[...this.toolChoices]} handleChange={this.handleChange}>
          </DownshiftTwo>*/}
{/* 
          make these the same way we did the chat text. for every selected item, load it into a div using the pattern
          <div id={`${name}_selected`}key={name}>
            <span>name</span>
            <div onClick={document.querySelector(`#${name}_selected`).remove()}></div>
          </div>
*/}





{/*            <select id="dataset-search-select" selected="Dataset"><option>Dataset</option><option>All</option></select>
            <select id="resolution-search-select" selected="Resolution"><option>Resolution</option><option>All</option></select>
            <select id="tool-search-select" selected="Tools"><option>Tools</option><option>All</option></select>*/}
{/*           <Space className="selectSpace" style={{ width: '480px', margin: 8, marginLeft:22, visibility: this.state.showAnt, transitionDelay: 0, transition: '0s'}} direction="horizontal">
              <Select
                mode="multiple"
                allowClear
                style={{ width: '120px' }}
                placeholder="Dataset"
                onChange={this.handleChange}
              />
              <Select
                mode="multiple"
                allowClear
                style={{ width: '120px' }}
                placeholder="Resolution"
                onChange={this.handleChange}
              />
              <Select
                mode="multiple"
                allowClear
                style={{ width: '120px' }}
                placeholder="Tools"
                onChange={this.handleChange}
              />
            </Space>*/}
          <div className="row-container" style={{margin: 8, marginLeft:22, width:600}}>
            <DownshiftTwo   tag="Similarity Type"
                            choices={["All","Images","Epigenomic","Loop Orientation"]} handleChange={this.handleChange}>
            </DownshiftTwo>
          </div>

          </div>

          <div className="column-container-container" style={{margin: 8, marginLeft:22}}>

          <Dropzone onDrop={acceptedFiles => this.handleFileUpload(acceptedFiles)}>
            {({getRootProps, getInputProps}) => (
              <div style={{display:"flex", alignItems: "center", justifyContent: "center"}}>
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
                          margin: "12px"
                        }}>
          </div>
          </div>

        </div>




{/*          <div className="row-container" style={{margin: 8, marginLeft:22}}>
            <select id="criteria-search-select" selected="Search Criteria">
              <option>Similarity Criteria</option>
              <option>All</option>
              <option>Image</option>
              <option>Histogram</option>
              <option>Epigenomic Signal</option>
              <option>CTCF Orientation</option>
            </select>
          </div>*/}





{/*
          <div className="multipleSelection">
          <div className="selectBox">
              <select>
                  <option>Select Search</option>
              </select>
              <div className ="overSelect"></div>
          </div>
          </div>
          <div id="checkBoxes">
                <label for="first">
                    <input type="checkbox" id="first" />
                    Image
                </label>
 
                <label for="second">
                    <input type="checkbox" id="second" />
                    Histogram
                </label>
                <label for="third">
                    <input type="checkbox" id="third" />
                    Epigenomic Signal
                </label>
                <label for="fourth">
                    <input type="checkbox" id="fourth" />
                    CTCF Orientation
                </label>
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
            </div>
          </div>
        </div>*/}

  </Rnd>


        </>
  }
}