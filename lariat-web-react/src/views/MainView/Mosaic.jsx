import React, {useState} from 'react';
import Draggable from 'react-draggable';
import { Rnd } from "react-rnd";

export default class Moasic extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      favicon: "",
      // width: window.innerWidth/2,
      // height: window.innerHeight-26,
      x: window.innerWidth/2-125,
      y: window.innerHeight/2-250,
    };
    this.closeWindow = this.closeWindow.bind(this);
  }

  componentDidMount() {
    const faviconMode = window.matchMedia('(prefers-color-scheme: light)').matches ? "/colloidal.svg" : "/cyclops.svg";
    this.setState({favicon: faviconMode});
  }

  closeWindow(){
    this.props.handleCallChange("hidden");
  }

    render(){
      return  <>

    <Rnd
      className="content"
      cancel="BoxTitleCloseBox"
      dragHandleClassName="headerTitle"
      minWidth={300}
      minHeight={276}
      maxWidth={300}
      maxHeight={276}
      size={{ width: this.state.width,  height: this.state.height }}
      position={{ x: this.state.x, y: this.state.y }}
      onDragStop={(e, d) => { this.setState({ x: d.x, y: d.y }) }}
    >

      <div id="BoxTitle" className="headerTitle">
        <div className="topTitleLine"></div>
        <div className="titleLines"></div>
        <div className="titleLines"></div>
        <div className="titleLines"></div>
        <div className="titleLines"></div>
        <div className="bottomTitleLines"></div>
        <div id="BoxTitleHandle" className="callTitle">Welcome!</div>
        <div id="BoxTitleCloseBox" className="control-box close-box" onClick={this.closeWindow}>
        <a id="BoxTitleCloseInner" className="control-box-inner" ></a>
        </div>
      </div>

    <div className="icon"><img src={`./src/img/${this.state.favicon}`} height={75} /></div>
    <ul>
      <li>Running Lariat</li><br/>
      <li>Made by Sean Moran</li><br/>
      <li>MIT License, Lariat 2024, University of Michigan. All rights reserved.</li>
    </ul>


    </Rnd>
    </>
}}
