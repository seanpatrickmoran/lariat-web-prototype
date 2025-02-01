import Draggable from 'react-draggable';
// import React, {useState} from 'react';
import React, {useEffect,useState} from 'react';
// import { fetchTest } from './QueryView.jsx';
import useLocalStorage from './../CustomHooks/UseLocalStorage.js'
// import { intersectingRows, nonIntersectingRows} from './Pairs.js';



export default class PairsBody extends React.Component{
        constructor(props){
          super(props);
          this.state = {
            selectValue: '',
            visibility: '',
            contents: '',
            dataSetOptionsLeft: '',
            dataSetOptionsRight: '',
                        };  // initial state value
          this.resolutionOptions = {
            left: '',
            right: '',
          };

          this.offSetQueries = null;
          this.offset = 0;
        }


    componentDidMount(){
      this.state.dataSetOptionsLeft = Object.keys(this.props.storetable).map((key) => {
        return  <option value={key}>{key}</option>
          })
      this.state.dataSetOptionsRight = Object.keys(this.props.storetable).map((key) => {
        return  <option value={key}>{key}</option>
          })

      this.setState({dataSetOptionsLeft: Object.keys(this.props.storetable).map((key) => {
              return  <option value={key}>{key}</option>
            })})

      this.setState({dataSetOptionsRight: Object.keys(this.props.storetable).map((key) => {
              return  <option value={key}>{key}</option>
            })})

      const datasetHandle = Object.keys(this.props.storetable)[0];
      this.resolutionOptions.left = this.props.storetable[datasetHandle].map((el) => {
        return <option value={el} key={el}>{el}</option>
      });
      this.resolutionOptions.right = this.props.storetable[datasetHandle].map((el) => {
        return <option value={el} key={el}>{el}</option>
      });
    }


    componentDidUpdate(prevProps, prevState) {
      // console.log(this.props.pasteBoardProps.contents === prevProps.pasteBoardProps.contents);
      if (this.props.pasteBoardProps.contents !== prevProps.pasteBoardProps.contents){

        this.setState({visibility: "visible", contents: this.props.pasteBoardProps.contents});
        this.props.pasteBoardPropsUpdate({visibility: this.state.visibility, contents: this.props.pasteBoardProps.contents});
      }
    }


  handleDatasetChange = (event) => {
    const bubbleDownHandle =  event.target.name.split("-")[1];
    console.log(bubbleDownHandle);
    this.setState({selectValue: event.target.value});
    if (event.target.value != "dataset"){
      this.resolutionOptions[bubbleDownHandle] = this.props.storetable[event.target.value].map((el) => {
       return <option value={el} key={el}>{el}</option>
     });

      }
  };



  async parallelFetch(baseString, offsetInt){
    console.log(baseString)
    const array = []
    for(var i = 0; i<6; i++){
      array.push(fetch(`http://localhost:8080/api/read_limiter?offset=${offsetInt+i*200}` + baseString));
    }

    const response = await Promise.allSettled(array);
    const resolvedArray = [];

    response.map(repl => {
      if (repl.status==="fulfilled"){
        resolvedArray.push(repl.value)
      }
    })

    const responseBody = await Promise.all(resolvedArray.map((item) => {
      return item.json();
    }))

    console.log(await responseBody);
    return await responseBody
  };


  setOperatorAND = () =>{
    const datasetA = document.getElementById("dataset-left").value;
    const resolutionA = document.getElementById("resolution-left").value;
    const datasetB = document.getElementById("dataset-right").value;
    const resolutionB = document.getElementById("resolution-right").value;

    if ((resolutionA==="resolution")||(resolutionB==="resolution")){
      return;
    }
    console.log()
    const fetchPromise = fetch(`http://localhost:8080/api/captureIntersect?hic_path1=${datasetA}&hic_path2=${datasetB}&resolution1=${resolutionA}&resolution2=${resolutionB}`);
    fetchPromise.then(response => {
            console.log(response);
            return response.json();
                }).then(entries => {
                  // console.log(entries)
                  const selectNode = document.getElementById("names");
                  // var payload;
                  const names = entries.map((el) => {
                    return el
                  }).join("<option/>");
                  selectNode.innerHTML = <option/> + names;
                  console.log(names);
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

  <div id="pairsContent" className="content">
    <h1 className="title">Pairs</h1>
    <div className="control-box close-box"><a className="control-box-inner"></a></div>
    <div className="control-box zoom-box"><div className="control-box-inner"><div className="zoom-box-inner"></div></div></div>
    <div className="control-box windowshade-box"><div className="control-box-inner"><div className="windowshade-box-inner"></div></div></div>

    <div className="row-container" id="field-rows">
      <div className="column-container">
          <div className="row-container">
            <select className="row-selection" name="dataset-left" id="dataset-left" onChange={this.handleDatasetChange}>
              {
                this.state.dataSetOptionsLeft      
              }
              </select>
          </div>
          <div className="row-container">
            <select className="row-selection" name="resolution-left" id="resolution-left">
              <option value="resolution">Resolution</option>
              {this.resolutionOptions.left}
            </select>
          </div>
      </div>

    <div className="row-container">
    <div className="column-container">
      <div className="row-container">
        <select className="row-selection" name="dataset-right" id="dataset-right" onChange={this.handleDatasetChange}>
          {
            this.state.dataSetOptionsRight      
          }          
        </select>
      </div>
      <div className="row-container">
        <select className="row-selection" name="resolution-right" id="resolution-right">
          
          <option value="resolution">Resolution</option>
          {this.resolutionOptions.right}
        </select>
      </div>
    </div>
    </div>
    </div>

    <div className="row-container">
      <button type="button" id="intersectBtn" onClick={this.setOperatorAND}>a AND b</button>
      <button type="button" id="aNotbBtn">a NOT b</button>
      <button type="button" id="bNotaBtn">b NOT a</button>
      <button type="button" id="inspectBtn">FUSE</button>
      <button type="button" id="inspectBtn">PART</button>
      <button type="button" id="selectAllBtn">Select All</button>
      <button type="button" id="copyAButton">Copy A</button>
      <button type="button" id="copyBButton">Copy B</button>
    </div>

    <div>
      <select id="names" multiple size="16">
      </select>
      
    </div>
  </div>

  </Draggable>
  </>
  }
}