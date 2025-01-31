import Draggable from 'react-draggable';
// import React, {useState} from 'react';
import React, {useEffect,useState} from 'react';
// import { fetchTest } from './QueryView.jsx';
import useLocalStorage from './../CustomHooks/UseLocalStorage.js'


export default class PairsBody extends React.Component{
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
        // this.state.livePasteBoard = this.props.pasteBoardProps.contents;
        // this.props.pasteBoardPropsUpdate(oldState);
        // console.log(this.state.contents);
        // console.log(this.props.pasteBoardProps.contents)
        // console.log(prevProps.pasteBoardProps.contents)
        // console.log(this.props.pasteBoardProps.contents);
        // console.log(this.props.pasteBoardPropsUpdate);
        this.setState({visibility: "visible", contents: this.props.pasteBoardProps.contents});
        this.props.pasteBoardPropsUpdate({visibility: this.state.visibility, contents: this.props.pasteBoardProps.contents});
      }
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
            <select className="row-selection" name="dataset-left" id="dataset-left"></select>
          </div>
          <div className="row-container">
            <select className="row-selection" name="resolution-left" id="resolution-left"></select>
          </div>
      </div>

    <div className="row-container">
    <div className="column-container">
      <div className="row-container">
        <select className="row-selection" name="dataset-right" id="dataset-right"></select>
      </div>
      <div className="row-container">
        <select className="row-selection" name="resolution-right" id="resolution-right"></select>
      </div>
    </div>
    </div>
    </div>

    <div className="row-container">
      <button type="button" id="intersectBtn">a AND b</button>
      <button type="button" id="aNotbBtn">a NOT b</button>
      <button type="button" id="bNotaBtn">b NOT a</button>
      <button type="button" id="inspectBtn">FUSE</button>
      <button type="button" id="inspectBtn">PART</button>
      <button type="button" id="selectAllBtn">Select All</button>
      <button type="button" id="copyAButton">Copy A</button>
      <button type="button" id="copyBButton">Copy B</button>
    </div>

    <div>
      <select id="names" multiple size="16"> </select>
    </div>
  </div>

  </Draggable>
  </>
  }
}