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
      id={this.props.id}
      className="content"
      cancel="BoxTitleCloseBox"
      dragHandleClassName="headerTitle"
      minWidth={300}
      minHeight={276}
      maxWidth={300}
      maxHeight={276}
      size={{ width: this.state.width,  height: this.state.height }}
      position={{ x: this.state.x, y: this.state.y }}
      onClick={() => {
        const divs = document.querySelectorAll(".content");
        divs.forEach(div => { 
          div.style.zIndex-=2
        })
        document.getElementById(this.props.id).style.zIndex=0
      }}

      onDragStop={(e, d) => { this.setState({ x: d.x, y: d.y }) }}>

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
    <div>
      <p style={{margin:24, marginBottom:0}}>Running Lariat</p>
      <p style={{margin:24, marginTop: 2, marginBottom:0}}>Made by Sean Moran</p>
      <p style={{margin:24, marginTop: 2, marginBottom:0}}><a href="https://jieliu6.github.io/">Jie Liu Labs</a></p>
      <p style={{margin:24, marginTop: 2, marginBottom:12,fontSize: 10}}>Apache License 2024, Sean Moran, Jie Liu, University of Michigan. All rights reserved.</p>
    </div>

    </Rnd>
    </>
}}
