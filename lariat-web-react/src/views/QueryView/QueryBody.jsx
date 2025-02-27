import { Rnd } from "react-rnd";

import React, {useEffect,useState} from 'react';
// import { fetchTest } from './QueryView.jsx';
import useLocalStorage from './../CustomHooks/UseLocalStorage.js'
// import { CallBox } from "./QBox.jsx";

export default class QueryBody extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      width: 480,
      height: 360,
      x: 10,
      y: 28,        
      selectValue: '',
      visibility: '',
      contents: '',
      isCalling: "hidden",
      isQuerying: "hidden",
      };
    this.resolutionOptions = null;
    this.offSetQueries = null;
    this.offset = 0;
    this.invokeCallBox = this.invokeCallBox.bind(this);
    this.invokeQueryBox = this.invokeQueryBox.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
      if (this.props.pasteBoardProps.contents !== prevProps.pasteBoardProps.contents){
        this.setState({visibility: "visible", contents: this.props.pasteBoardProps.contents});
        this.props.pasteBoardPropsUpdate({visibility: this.state.visibility, contents: this.props.pasteBoardProps.contents});
      }
      if((this.state.isCalling !== prevProps.callBoxProps.visibility)){
        console.log('1')
        this.props.setCallBoxProps({visibility: this.state.isCalling});
      }
      else if(this.props.callBoxProps.visibility!=prevProps.callBoxProps.visibility){
        console.log('2')
        this.setState({isCalling : this.props.callBoxProps.visibility})
        this.props.setCallBoxProps({visibility: this.state.isCalling});

      }
    }

  handleDatasetChange = (event) => {
    this.setState({selectValue: event.target.value});
    if (event.target.value != "dataset"){
      // console.log(Object.keys(this.props.storetable[event.target.value]))
      this.resolutionOptions = Object.keys(this.props.storetable[event.target.value]).map((el) => <option value={el}>{el}</option>);
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
          dumpArr[i] = optionsSelect[i].value;
          // console.log(optionsSelect[i].value)
      }if (dumpArr.length === 0){
          return
      }
      let entries = this.props.pasteBoardProps.contents;
      dumpArr.forEach((elem) => {
        entries += "," + elem;
      });

      this.props.pasteBoardPropsUpdate({visibility:"visible", contents: entries});
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


  invokeCallBox(){
    this.setState({isCalling : "visible"})
    const divs = document.querySelectorAll(".content");

    divs.forEach(div => { 
      div.style.zIndex-=1
    })

    document.getElementById("queryBox").style.zIndex=1    
  }


  invokeQueryBox(){
    if(this.state.isQuerying=="hidden"){
      this.setState({isQuerying: "visible"})
      this.props.setSearchVisible("visible")
    } else{
    this.setState({isQuerying: "hidden"})
    }
    console.log(this.state.isQuerying)
    // document.getElementById("queryBox").style.zIndex=1    
  }


  render (){
    return <>


    <Rnd
      id={this.props.id}
      className="content"
      cancel=".colloidalCallButton"
      dragHandleClassName="headerTitle"
      minWidth={340}
      minHeight={470}
      size={{ width: this.state.width,  height: this.state.height }}
      position={{ x: this.state.x, y: this.state.y }}
      onClick={() => {
        const divs = document.querySelectorAll(".content");
        divs.forEach(div => { 
          div.style.zIndex-=1
        })
        document.getElementById(this.props.id).style.zIndex=0
      }}

      onDragStop={(e, d) => { this.setState({ x: d.x, y: d.y }) }}
      onResizeStop={(e, direction, ref, delta, position) => {
        this.setState({
          width: ref.style.width,
          height: ref.style.height,
          ...position,
        });
      }}
    >  

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
      <button type="button" id="semanticQuery" onClick={this.invokeQueryBox}>Search</button>
      <button type="button" id="selectAll" onClick={this.qvSelectAll}>Select All</button>
      <button type="button" id="copyToPbBtn" onClick={this.copyToPasteboard}>Copy</button>
    </div>
    <div id="queryNamesDiv">
      <select id="queryNames" multiple size="10"></select>
    </div>

    <div className="row-container offset-navigation" >
      <button type="button" id="offSetLeftButton" onClick={this.handleDecrement}>&#8592; Prev</button>
      <button type="button" id="colloidalCallButton" onClick={this.invokeCallBox}>@&gt;</button>
      <button type="button" id="offSetRightButton" onClick={this.handleIncrement}>Next &#8594;</button>
    </div>
    <div className="row-container offset-navigation">
      <span id="offsetPage"></span>
    </div>
  </Rnd>
  </>
  }
}
