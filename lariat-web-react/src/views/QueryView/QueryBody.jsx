import Draggable from 'react-draggable';
// import React, {useState} from 'react';
import React, {useEffect,useState} from 'react';
// import { fetchTest } from './QueryView.jsx';
import useLocalStorage from './../CustomHooks/UseLocalStorage.js'

export default class QueryBody extends React.Component{
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
    console.log(event.target.value);
    console.log(this.state.selectValue);
    if (event.target.value != "dataset"){
      this.resolutionOptions = this.props.storetable[event.target.value].map((el) => <option value={el} key={el}>{el}</option>);

      const fetchPromise = fetch(`http://localhost:8080/api/read_limiter?offset=${this.offset}`);
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

      //check that we have anything new.
      const fetchPromise = fetch(`http://localhost:8080/api/read_limiter?offset=${this.offset+200}`);
      const node = document.getElementById("names");

      fetchPromise.then(response => {
              return response.json();
                  }).then(entries => {
              names = [...entries.map(elem => elem.name)];
              console.log(names);
              if (names.length!=0){
                  this.offset += 200;
                  let names = entries.map(elem => elem.name).join("<option />");
                  node.innerHTML = "<option />" + names;
                }
              });
    }


    handleDecrement = (event) => {
      const fetchPromise = fetch(`http://localhost:8080/api/read_limiter?offset=${this.offset-200}`);
      const node = document.getElementById("names");

      fetchPromise.then(response => {
              return response.json();
                  }).then(entries => {
              names = [...entries.map(elem => elem.name)];
              console.log(names);
              if (names.length!=0){
                  this.offset -= 200;
                  let names = entries.map(elem => elem.name).join("<option />");
                  node.innerHTML = "<option />" + names;
                }
              });
    }


	  render (){
  return <>
  <body>
  <section>

  <Draggable
  handle=".title"
  position={null}
  scale={1}
  onStart={this.handleStart}
  onDrag={this.handleDrag}
  onStop={this.handleStop}>

  <div id="content" className="content">
  <div className="control-box close-box"><a className="control-box-inner"></a></div>
  <div className="control-box zoom-box"><div className="control-box-inner"><div className="zoom-box-inner"></div></div></div>
  <div className="control-box windowshade-box"><div className="control-box-inner"><div className="windowshade-box-inner"></div></div></div>

    <h1 className="title">SQL Query</h1>
    <div className="row-container">
      <select name="fields" id="dataset-field-select" selected="dataset" onChange={this.handleDatasetChange}>
        <option value="dataset">Dataset</option>
        {
          Object.keys(this.props.storetable).map((key) => {
              return  <option value={key}>{key}</option>
              })        
        }
      </select>
    </div>

    <div className="row-container">
      <select name="fields" id="resolution-field-select" selected="resolution">
        {this.resolutionOptions}
      </select>
    </div>

    <div className="row-container">
      <select name="available" id="names-field-select" selected="all">
        <option value="all">All</option>
        {/*{this.offSetQueries}*/}
      </select>
    </div>
    <div className="row-container">
      <button type="button" id="queryBtn">Query</button>
      <button type="button" id="inspectBtn">Inspect</button>
      <button type="button" id="copyToPbBtn">Copy</button>
    </div>
    <div>
      <select id="names" multiple size="10"></select>
    </div>

    <div className="row-container offset-navigation" >
      <button type="button" id="offSetLeftButton" onClick={this.handleDecrement}>&#8592;</button>
      <button type="button" id="offSetRightButton" onClick={this.handleIncrement}>&#8594;</button>
    </div>
    <div className="row-container offset-navigation">
      <span id="offsetPage"></span>
    </div>
  </div>
  </Draggable>
  
  </section>
  </body>
  </>
  }
}
