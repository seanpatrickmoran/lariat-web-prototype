import Draggable from 'react-draggable';
import React, {useEffect,useState} from 'react';
import useLocalStorage from './../CustomHooks/UseLocalStorage.js'



export default class InspectBody extends React.Component{
         constructor(props){
            super(props);
            this.state = {selectValue: ''};  // initial state value
            this.resolutionOptions = (this.props.storetable[Object.keys(this.props.storetable)[0]]).map((el) => <option value={el} key={el}>{el}</option>);
            this.offSetQueries = null;
            this.offset = 0;
           }

componentDidMount(){
      const node = document.getElementById("names-field");
      console.log(Object.keys(this.props.storetable)[0])
      const fetchPromise = fetch(`http://localhost:8080/api/read_limiter?offset=${this.offset}&hic_path=${Object.keys(this.props.storetable)[0]}&resolution=${this.props.storetable[Object.keys(this.props.storetable)[0]][0]}`);
            fetchPromise.then(response => {
              return response.json();
                  }).then(entries => {
              let names = entries.map(elem => elem.name).join("<option />");
              console.log(names)
              node.innerHTML = "<option />" + names;
              });


      }

  handleDatasetChange = (event) => {
    this.setState({selectValue: event.target.value});
    if (event.target.value != "dataset"){
      this.resolutionOptions = this.props.storetable[event.target.value].map((el) => <option value={el} key={el}>{el}</option>);
      const storeHicPath = document.getElementById("field-select").value;
      const storeResolution = document.getElementById("resolution-field-select").value;
      const fetchPromise = fetch(`http://localhost:8080/api/read_limiter?offset=${this.offset}&hic_path=${event.target.value}&resolution=${this.props.storetable[event.target.value][0]}`);
      const node = document.getElementById("names-field");

      fetchPromise.then(response => {
              return response.json();
                  }).then(entries => {
              let names = entries.map(elem => elem.name).join("<option />");
              console.log(names)
              node.innerHTML = "<option />" + names;
              });
      }

    else {
      this.resolutionOptions = "";
      const node = document.getElementById("names-field");
      node.innerHTML = "";
    }
  };


  handleResolutionChange = (event) => {
    this.setState({selectValue: event.target.value});
    if (event.target.value != "resolution" && document.getElementById("field-select").value!="dataset"){
      const storeHicPath = document.getElementById("field-select").value;
      console.log(storeHicPath)
      const storeResolution = event.target.value;
      const fetchPromise = fetch(`http://localhost:8080/api/read_limiter?offset=${this.offset}&hic_path=${storeHicPath}&resolution=${event.target.value}`);
      const node = document.getElementById("names-field");

      fetchPromise.then(response => {
              return response.json();
                  }).then(entries => {
              let names = entries.map(elem => elem.name).join("<option />");
              node.innerHTML = "<option />" + names;
              });
      };
    };


    handleIncrement = (event) => {
      const storeHicPath = document.getElementById("field-select").value;
      const storeResolution = document.getElementById("resolution-field-select").value;
      const fetchPromise = fetch(`http://localhost:8080/api/read_limiter?offset=${this.offset+200}&hic_path=${storeHicPath}&resolution=${storeResolution}`);
      const node = document.getElementById("names-field");
      fetchPromise.then(response => {
              return response.json();
                  }).then(entries => {
              let names = [...entries.map(elem => elem.name)];
              if (names.length!=0){
                  this.offset += 200;
                  let names = entries.map(elem => elem.name).join("<option />");
                  node.innerHTML = "<option />" + names;
                }
              });
    }


    handleDecrement = (event) => {
      const storeHicPath = document.getElementById("field-select").value;
      const storeResolution = document.getElementById("resolution-field-select").value;
      const fetchPromise = fetch(`http://localhost:8080/api/read_limiter?offset=${this.offset-200}&hic_path=${storeHicPath}&resolution=${storeResolution}`);
      const node = document.getElementById("names-field");

      fetchPromise.then(response => {
              return response.json();
                  }).then(entries => {
              let names = [...entries.map(elem => elem.name)];
              if (names.length!=0){
                  this.offset -= 200;
                  let names = entries.map(elem => elem.name).join("<option />");
                  node.innerHTML = "<option />" + names;
                }
              });
    }

    handleInspect = (event) => {

      //on change, do this.
      //when change resolution, propogate this
      // when change dataset, bubble resolution, bubble this.
      // when component mounts, bubble dataset, bubble resolution, bubble this.
      console.log(event.target.value.replace("#","%23"))
      const fetchPromise = fetch(`http://localhost:8080/api/getImageSingleton?name=${event.target.value.replace("#","%23")}`);
      // the '#' may break, if so encode it with %23.
      // http://localhost:8080/api/getImageSingleton?name=GM12878_5000_mustache_%234

      fetchPromise.then(response => {
        return response.json();
            }).then(entries => {
              console.log(entries);
        // let names = [...entries.map(elem => elem.name)];
        // if (names.length!=0){
            // this.offset -= 200;
            // let names = entries.map(elem => elem.name).join("<option />");
            // node.innerHTML = "<option />" + names;
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

      <div id="content" className="content">
      <div className="control-box close-box"><a className="control-box-inner"></a></div>
      <div className="control-box zoom-box">
         <div className="control-box-inner">
            <div className="zoom-box-inner"></div>
         </div>
      </div>
      <div className="control-box windowshade-box">
         <div className="control-box-inner">
            <div className="windowshade-box-inner"></div>
         </div>
      </div>
      <h1 className="title">Inspect</h1>
      <div className="container">
        <div className="block">

          <div className="row-container">
             <button type="button" id="inspectBtn">Inspect</button>
             <button type="button" id="popViewBtn">PopView</button> 
             <button type="button" id='tail-sql'>Filter</button>
             <button type="button" id="selectToPopboard">Copy</button> 
          </div>


          <div className="row-container">
            <div className="column-container">
              <div className="row-container">
               <label for="field-select">Dataset:</label>
              </div>
              <div className="row-container">
                <label for="field-select">Resolution:</label>
              </div>

            </div>


            <div className="column-container">
              <div className="row-container">
               <select name="fields" id="field-select" onChange={this.handleDatasetChange}>
                               {
                Object.keys(this.props.storetable).map((key) => {
                  return  <option value={key}>{key}</option>
                  })        
                } 
                </select>              
              </div>

              <div className="row-container">
                <select id="resolution-field-select" onChange={this.handleResolutionChange}>
                  {this.resolutionOptions}
                </select>
              </div>
             </div>  
          </div>

         <div className="row-container">
            <select id="names-field" size="12" onChange={this.handleInspect}></select>
         </div>  

          <div className="row-container">
                      <div className="column-container">
               <div id="sql-query-payload" className="column-container">
               </div>
             </div>
          </div>

         <div className="row-container offset-navigation" >
          <button type="button" id="offSetLeftButton" onClick={this.handleDecrement}>&#8592;</button>
          <button type="button" id="offSetRightButton" onClick={this.handleIncrement}>&#8594;</button>
          </div>
        </div>
      <div class="block">
         <div class="row-container">
            <canvas id="canvas-inspect" width="450" height="450"></canvas>
         </div>
       </div>
      </div>
      </div>

  </Draggable>
  
  </>
  }
}
