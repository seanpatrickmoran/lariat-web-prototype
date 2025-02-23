import React, {useState} from 'react';
import Draggable from 'react-draggable';
import { Rnd } from "react-rnd";

// import JSZip from 'jszip'
// import { CallBox } from "./CallBox.jsx";
import "./isquery.css"
import streamSaver from 'streamsaver'

// import { Jimp } from 'jimp';


export default class IsQuerying extends React.Component{
            //searchVisible, setSearchVisible props
           constructor(props){
              super(props);
              this.Ref = React.createRef();
              this.closeWindow = this.closeWindow.bind(this);
              this.dumpWithOptions = this.dumpWithOptions.bind(this);
              // this.showCheckboxes = this.showCheckboxes.bind(this);
              this.fetchMap = new Map([
                [":", "%3A"], [";", "%3B"], ["<","%3C"], ["=" , "%3D"],
                [">" , "%3E"],["?" , "%3F"],["@" , "%40"],["!" , "%21"],
                ["\"" , "%22"],["#" , "%23"],["$" , "%24"],["%" , "%25"],
                ["&" , "%26"],["'" , "%27"],["(" , "%28"],[")" , "%29"],
                ["*" , "%2A"],["+" , "%2B"],["," , "%2C"],["-" , "%2D"],
                ["." , "%2E"],["/" , "%2F"]]);

              this.state = {
                // downloadActive: true,
                // status: "Ready",
                // maxAmount: 9000,
                // progress: 0,
                width: 600,
                height: 350,
                x: window.innerWidth/2-320,
                y: window.innerHeight/2-280,

                showSearch: true
                }

              // this.blobMap = new Map();
           }

  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState) {
    // if(prevState.showSearch!=this.state.showSearch){
    //   this.setState

    // }
    if(prevProps.searchVisible != this.props.searchVisible){
    const divs = document.querySelectorAll(".content");

    divs.forEach(div => { 
      div.style.zIndex-=2
    })

    document.getElementById(this.props.id).style.zIndex=0
    }
  }

  closeWindow(){
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
      minWidth={400}
      minHeight={300}
      size={{ width: this.state.width,  height: this.state.height }}
      style={{ visibility: this.props.searchVisible }}
      position={{ x: this.state.x, y: this.state.y }}
      onDragStop={(e, d) => { this.setState({ x: d.x, y: d.y }) }}
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
          <div id="BoxTitleHandle" className="callTitle">Search</div>
          <div id="BoxTitleCloseBox" className="control-box close-box" >
          <a id="BoxTitleCloseInner" className="control-box-inner" onClick={this.closeWindow}></a>
          </div>
        </div>
          <div className="row-container" style={{margin: 8, marginLeft:22}}>
            <select id="dataset-search-select" selected="Dataset"><option>Dataset</option><option>All</option></select>
            <select id="resolution-search-select" selected="Resolution"><option>Resolution</option><option>All</option></select>
            <select id="tool-search-select" selected="Tools"><option>Tools</option><option>Alll</option></select>
          </div>
          <div className="row-container" style={{margin: 8, marginLeft:22}}>
            <select id="criteria-search-select" selected="Search Criteria">
              <option>Similarity Criteria</option>
              <option>All</option>
              <option>Image</option>
              <option>Histogram</option>
              <option>Epigenomic Signal</option>
              <option>CTCF Orientation</option>
            </select>
          </div>




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
            </div>     */}     

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
        </div>

  </Rnd>


        </>
  }
}