import Draggable from 'react-draggable';
// import React, {useState} from 'react';
import React, {useEffect,useState} from 'react';
// import { fetchTest } from './QueryView.jsx';
import useLocalStorage from './../CustomHooks/UseLocalStorage.js'



export default class InspectBody extends React.Component{
         constructor(props){
            super(props);
            this.state = {selectValue: ''};  // initial state value
            // this.ResolutionState = {selectValue: ''};  // initial state value
            this.resolutionOptions = null;
            this.offSetQueries = null;
            this.offset = 0;
           }

  // componentDidMount(){
  // };

  handleDatasetChange = (event) => {
    this.setState({selectValue: event.target.value});
    if (event.target.value != "dataset"){
      this.resolutionOptions = this.props.storetable[event.target.value].map((el) => <option value={el} key={el}>{el}</option>);
      const storeHicPath = document.getElementById("dataset-field-select").value;
      const storeResolution = document.getElementById("resolution-field-select").value;
      const fetchPromise = fetch(`http://localhost:8080/api/read_limiter?offset=${this.offset}&hic_path=${storeHicPath}&resolution=${storeResolution}`);
      const node = document.getElementById("names");

      fetchPromise.then(response => {
              return response.json();
                  }).then(entries => {
              let names = entries.map(elem => elem.name).join("<option />");
              node.innerHTML = "<option />" + names;
              });
      }

    else {
      this.resolutionOptions = "";
      const node = document.getElementById("names");
      node.innerHTML = "";
    }
  };


  handleResolutionChange = (event) => {
    this.setState({selectValue: event.target.value});
    if (event.target.value != "resolution" && document.getElementById("dataset-field-select").value!="dataset"){
      const storeHicPath = document.getElementById("dataset-field-select").value;
      const storeResolution = event.target.value;
      const fetchPromise = fetch(`http://localhost:8080/api/read_limiter?offset=${this.offset}&hic_path=${storeHicPath}&resolution=${storeResolution}`);
      const node = document.getElementById("names");

      fetchPromise.then(response => {
              return response.json();
                  }).then(entries => {
              let names = entries.map(elem => elem.name).join("<option />");
              node.innerHTML = "<option />" + names;
              });
      };
    };




    handleIncrement = (event) => {
      const storeHicPath = document.getElementById("dataset-field-select").value;
      const storeResolution = document.getElementById("resolution-field-select").value;
      const fetchPromise = fetch(`http://localhost:8080/api/read_limiter?offset=${this.offset+200}&hic_path=${storeHicPath}&resolution=${storeResolution}`);
      const node = document.getElementById("names");

      fetchPromise.then(response => {
              return response.json();
                  }).then(entries => {
              names = [...entries.map(elem => elem.name)];
              if (names.length!=0){
                  this.offset += 200;
                  let names = entries.map(elem => elem.name).join("<option />");
                  node.innerHTML = "<option />" + names;
                }
              });
    }


    handleDecrement = (event) => {
      const storeHicPath = document.getElementById("dataset-field-select").value;
      const storeResolution = document.getElementById("resolution-field-select").value;
      const fetchPromise = fetch(`http://localhost:8080/api/read_limiter?offset=${this.offset-200}&hic_path=${storeHicPath}&resolution=${storeResolution}`);
      const node = document.getElementById("names");

      fetchPromise.then(response => {
              return response.json();
                  }).then(entries => {
              names = [...entries.map(elem => elem.name)];
              if (names.length!=0){
                  this.offset -= 200;
                  let names = entries.map(elem => elem.name).join("<option />");
                  node.innerHTML = "<option />" + names;
                }
              });
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

      <div id="content" class="content">
      <div class="control-box close-box"><a class="control-box-inner"></a></div>
      <div class="control-box zoom-box">
         <div class="control-box-inner">
            <div class="zoom-box-inner"></div>
         </div>
      </div>
      <div class="control-box windowshade-box">
         <div class="control-box-inner">
            <div class="windowshade-box-inner"></div>
         </div>
      </div>
      <h1 class="title">Inspect</h1>
      <section class="container">
        <div class="block">

          <div class="row-container">
             <button type="button" id="inspectBtn">Inspect</button>
             <button type="button" id="popViewBtn">PopView</button> 
             <button type="button" id='tail-sql'>Filter</button>
             <button type="button" id="selectToPopboard">Copy</button> 
          </div>


          <div class="row-container">
            <div class="column-container">
              <div class="row-container">
               <label for="field-select">Dataset:</label>
              </div>
              <div class="row-container">
                <label for="field-select">Resolution:</label>
              </div>

            </div>


            <div class="column-container">
              <div class="row-container">
               <select name="fields" id="field-select" value="dataset"></select>
              </div>

              <div class="row-container">
               <select id="resolution-field-select" value="resolution"></select>
              </div>
             </div>  
          </div>

         <div class="row-container">
            <select id="names-field" size="12"></select>
         </div>  

          <div class="row-container">
                      <div class="column-container">
               <div id="sql-query-payload" class="column-container">
               </div>
             </div>
          </div>

         <div class="row-container offset-navigation" >
            <button type="button" id="offSetLeftButton">&#8592;</button>
            <button type="button" id="offSetRightButton">&#8594;</button>
          </div>
        </div>
      </section>
      </div>

  </Draggable>
  
  </>
  }
}
