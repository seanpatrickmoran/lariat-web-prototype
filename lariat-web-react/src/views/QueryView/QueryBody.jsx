import Draggable from 'react-draggable';
// import React, {useState} from 'react';
import React, {useEffect,useState} from 'react';
// import { fetchTest } from './QueryView.jsx';
import useLocalStorage from './../CustomHooks/UseLocalStorage.js'

export default class QueryBody extends React.Component{
         constructor(props){
            super(props);
      this.state = {
        selectValue: '',
        visibility: '',
        contents: ''
                    };  // initial state value
            this.resolutionOptions = null;
            this.offSetQueries = null;
            this.offset = 0;
           }

    componentDidUpdate(prevProps, prevState) {
      // console.log(this.props.pasteBoardProps.contents === prevProps.pasteBoardProps.contents);
      if (this.props.pasteBoardProps.contents !== prevProps.pasteBoardProps.contents){
        this.setState({visibility: "visible", contents: this.props.pasteBoardProps.contents});
        this.props.pasteBoardPropsUpdate({visibility: this.state.visibility, contents: this.props.pasteBoardProps.contents});
      }
    }

  handleDatasetChange = (event) => {
    this.setState({selectValue: event.target.value});
    if (event.target.value != "dataset"){
      this.resolutionOptions = this.props.storetable[event.target.value].map((el) => <option value={el} key={el}>{el}</option>);
      const storeHicPath = document.getElementById("dataset-field-select").value;
      const storeResolution = document.getElementById("resolution-field-select").value;
      const fetchPromise = fetch(`http://localhost:8080/api/read_limiter?offset=${this.offset}&hic_path=${storeHicPath}&resolution=${storeResolution}`);
      const node = document.getElementById("queryNames");

      fetchPromise.then(response => {
              return response.json();
                  }).then(entries => {
              const names = entries.map(elem => elem.name).join("<option />");
              node.innerHTML = "<option />" + names;
              });
      }

    else {
      this.resolutionOptions = "";
      const node = document.getElementById("queryNames");
      node.innerHTML = "";
    }
  };


  handleResolutionChange = (event) => {
    this.setState({selectValue: event.target.value});
    if (event.target.value != "resolution" && document.getElementById("dataset-field-select").value!="dataset"){
      const storeHicPath = document.getElementById("dataset-field-select").value;
      const storeResolution = event.target.value;
      const fetchPromise = fetch(`http://localhost:8080/api/read_limiter?offset=${this.offset}&hic_path=${storeHicPath}&resolution=${storeResolution}`);
      const node = document.getElementById("queryNames");

      fetchPromise.then(response => {
              return response.json();
                  }).then(entries => {
              const names = entries.map(elem => elem.name).join("<option />");
              node.innerHTML = "<option />" + names;
              });
      };
    };




    handleIncrement = (event) => {
      console.log('hey')
      const storeHicPath = document.getElementById("dataset-field-select").value;
      const storeResolution = document.getElementById("resolution-field-select").value;
      const fetchPromise = fetch(`http://localhost:8080/api/read_limiter?offset=${this.offset+200}&hic_path=${storeHicPath}&resolution=${storeResolution}`);
      const node = document.getElementById("queryNames");

      fetchPromise.then(response => {
              return response.json();
                  }).then(entries => {
              const queryNames = [...entries.map(elem => elem.name)];
              if (queryNames.length!=0){
                  this.offset += 200;
                  const names = entries.map(elem => elem.name).join("<option />");
                  node.innerHTML = "<option />" + names;
                }
              });
    }


    handleDecrement = (event) => {
      const storeHicPath = document.getElementById("dataset-field-select").value;
      const storeResolution = document.getElementById("resolution-field-select").value;
      const fetchPromise = fetch(`http://localhost:8080/api/read_limiter?offset=${this.offset-200}&hic_path=${storeHicPath}&resolution=${storeResolution}`);
      const node = document.getElementById("queryNames");

      fetchPromise.then(response => {
              return response.json();
                  }).then(entries => {
              const queryNames = [...entries.map(elem => elem.name)];
              if (queryNames.length!=0){
                  this.offset -= 200;
                  const names = entries.map(elem => elem.name).join("<option />");
                  node.innerHTML = "<option />" + names;
                }
              });
    }

    copyToPasteboard = (event) => {
        var fieldSelect = document.getElementById("queryNames");
        const optionsSelect = fieldSelect.selectedOptions;
        const dumpArr = new Array(optionsSelect.length);
        for (var i = 0; i < optionsSelect.length; i++) {
          // dumpArr[i] = JSON.parse(JSON.stringify(window.api.getNames(optionsSelect[i].value)))[0]
            dumpArr[i] = optionsSelect[i].value;
            console.log(optionsSelect[i].value)
            // dumpArr[i] = window.api.getNames(optionsSelect[i].value)[0]
            // console.log(window.api.getNames(optionsSelect[i].value))
        }if (dumpArr.length === 0){
            return
        }
        let entries = this.props.pasteBoardProps.contents;
        dumpArr.forEach((elem) => {
          entries += "," + elem;
        });

        // console.log(newEntry)
        this.props.pasteBoardPropsUpdate({visibility:"visible", contents: entries});
        // localStorage.setItem('pasteBoardProps', JSON.stringify({visibility:"visible", contents: entries}));

        console.log(this.props.pasteBoardProps.contents)
    };


    qvSelectAll = (event) => {
      console.log("hello!")
      const fieldSelect = document.getElementById("queryNames");
      console.log(fieldSelect);
      const length = fieldSelect.options.length;
      for(var i = 0;i<length;i++){
        fieldSelect.options[i].selected = "selected";
      }
   }
 // var fieldSelect = document.getElementById("names");
    // const optionsSelect = fieldSelect.selectedOptions;
    // const dumpArr = new Array(optionsSelect.length);
    // for (let i = 0; i < optionsSelect.length; i++) {
    //   // dumpArr[i] = JSON.parse(JSON.stringify(window.api.getNames(optionsSelect[i].value)))[0]
    //     dumpArr[i] = optionsSelect[i].value;
    //     console.log(optionsSelect[i].value)
    //     // dumpArr[i] = window.api.getNames(optionsSelect[i].value)[0]
    //     // console.log(window.api.getNames(optionsSelect[i].value))
    // }if (dumpArr.length === 0){
    //     return
    // }





        // Object.assign(this.props.pasteBoardProps.contents);



	  render (){
  return <>

  <Draggable
  handle="#queryTitle"
  position={null}
  scale={1}
  onStart={this.handleStart}
  onDrag={this.handleDrag}
  onStop={this.handleStop}>

  {/*<div id="queryContent" className="content">*/}
  {/*<div className="control-box close-box"><a className="control-box-inner"></a></div>*/}

  <div id="queryContent" className="content">
{/*    <div id="queryTitle" className="headerTitle">
      <div className="titleLines"></div>
      <div className="titleLines"></div>
      <div className="titleLines"></div>
      <div className="titleLines"></div>
      <div className="titleLines"></div>
      <div className="titleLines"></div>
      <div id="queryTitleHandle" className="callTitle">Query</div>
      <div id="queryTitleCloseBox" className="control-box close-box" onClick={this.closeWindow} >
      <a id="queryTitleCloseInner" className="control-box-inner"></a>
      </div>
    </div>*/}
        <div id="BoxTitle" className="headerTitle">
          <div className="topTitleLine"></div>
          <div className="titleLines"></div>
          <div className="titleLines"></div>
          <div className="titleLines"></div>
          <div className="titleLines"></div>
          <div className="bottomTitleLines"></div>
          <div id="BoxTitleHandle" className="callTitle">Query</div>
          <div id="BoxTitleCloseBox" className="control-box close-box" >
          <a id="BoxTitleCloseInner" className="control-box-inner" ></a>
          </div>
        </div>



    {/*<h1 className="title">SQL Query</h1>*/}
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
      <select name="fields" id="resolution-field-select" selected="resolution" onChange={this.handleResolutionChange}>
        <option value="resolution">Resolution</option>
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
      <button type="button" id="selectAll" onClick={this.qvSelectAll}>Select All</button>
      <button type="button" id="copyToPbBtn" onClick={this.copyToPasteboard}>Copy</button>
    </div>
    <div id="queryNamesDiv">
      <select id="queryNames" multiple size="10"></select>
    </div>

    <div className="row-container offset-navigation" >
      <button type="button" id="offSetLeftButton" onClick={this.handleDecrement}>&#8592; Prev</button>
      <button type="button" id="offSetRightButton" onClick={this.handleIncrement}>Next &#8594;</button>
    </div>
    <div className="row-container offset-navigation">
      <span id="offsetPage"></span>
    </div>
  </div>
  </Draggable>
  
  </>
  }
}
