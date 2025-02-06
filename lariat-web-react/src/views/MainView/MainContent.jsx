import React, {useState} from 'react';
import Draggable from 'react-draggable';
import { Rnd } from "react-rnd";

// import { ipcRenderer } from 'electron';

export default class MainContent extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      term: "$>",
      written: "",
      messages: [],
      width: 250,
      height: 250,
      x: window.innerWidth/2-125,
      y: window.innerHeight/2-250,
    };
    this.closeWindow = this.closeWindow.bind(this);
  }

  eventLogger = (e, data) => {
    console.log('Event: ', e);
    console.log('Data: ', data);
  };
  componentDidMount() {
      // setTimeout(() => {
      //     console.log('hello');
      // }, 10);
  }
  closeWindow(){
    this.props.handleCallChange("hidden");
  }
  render (){

  function closeMosaicWindow(){
    document.getElementById("showStartMosaic").style.visibility = "hidden"
  }
    return  <>
  <div id="main_docs" className="content">
    <div id="BoxTitle" className="headerTitle">
      <div className="topTitleLine"></div>
      <div className="titleLines"></div>
      <div className="titleLines"></div>
      <div className="titleLines"></div>
      <div className="titleLines"></div>
      <div className="bottomTitleLines"></div>
      <div id="BoxTitleHandle" className="callTitle">DOCS</div>
      <div id="BoxTitleCloseBox" className="control-box close-box" onClick={this.closeWindow}>
      <a id="BoxTitleCloseInner" className="control-box-inner" ></a>
      </div>
    </div>

    <ul>
      <li>Welcome to Lariat! A toolkit for architectural chromatin analysis.</li>
      <li>DOCUMENTATION</li>
    </ul>
    <p className="main-document">The overall goal of Lariat is to provide a tool for anyone to easily perform rapid visualization and analysis of chromatin conformation capture results.</p>

    <p className="main-document"> 
    Use of the tools relies on the user to have formed a sqlite3 database compatible 
    for use with Larait via Ingest, which can be found on github at <a href="">https://github.com/seanpatrickmoran/Lariat</a>.
    Briefly, users will need to provide Ingest with original chomratin conformation 
    capture (3C) data-inputs such as .hic or .cool .mcool files. The user will also need 
    a secondary file that contains chromatin architectural information in tabular form.
    With both of these, ingestion queries and writes the image data and the data's metadata
    into a relational database that Lariat can access easily.
    Lariat is a convinient combination of tools to visualize, compare, and filter chromatin
    architectural features, built specifically with chromatin loops in mind. The easiest way
    to use Lariat is to populate its clipboard by exploring filter options under PAIRS and
    then finding shared loops or exclusive loops, and then exporting the records using DUMP.
    </p>
<hr></hr>
    <ul><li><a id="#alink_query">QUERY: Access Database Using Known Keys.</a></li></ul>
    <p className="main-document">
    The Query function allows the user to perform read functions on the SQL database linked to Lariat. 
    Query is also useful if the database's contents are not well understood or if the user seeks to
    combine data from many experiments from publically availible 3C-type data. By default, the database
    entries are written in exactly the same way via Ingest to the following schema:</p>

{/*    <pre>
         imag(name, 
              dataset, 
              condition, 
              coordinates, 
              numpyarr, 
              viewing_vmax, 
              dimensions, 
              hic_path, 
              PUB_ID, 
              resolution, 
              meta)</pre>*/}

    <p className="main-document">
    Lariat supports simplistic calling to the underlying SQLite database. SQL queries rely on the user
    entering a text input and using the input to check the column names for that input. The column name
    is specified by the "Choose Field" tag, and submits a query like so:
    </p>

    <pre>
    'SELECT * FROM imag WHERE (FIELD) = (?)';
    </pre>

    <p className="main-document">
    In this case (FIELD) would be substituted with whatever field the user chooses, and (?) would be the
     text input.
    </p>

<hr></hr>

    <ul><li><a id="#alink_inspect">INSPECT: Visualize and process architectural features.</a></li></ul>
    <p className="main-document">
    The Inspect function works by issuing a lookup on the existing datasets in the database, depending on the 3C 
    data-source-path as the keyname for the stored data. The keyname is only a String-value written at the time of
    logging the data with Ingest. It is not necessary for the keyname to point to a real location reachable on the
    user computer running Lariat.</p>

    <p className="main-document">
    To inspect data, select a dataset using the drop-down menu under data-set, and then highlight a corresponding
    name of an feature entry belonging to the dataset's keyname. Finally, press inspect, this will pre-populate some
    of the information in the filter-settings above the image, visualize the image, and give a description of the
    image below.
    </p>
    <p className="main-document">
    <u>The vMax or Viewing Maximum</u> is a normalization constant used to determine pixel intensity threshold to make
    chromatin features visible. By alittle clever image processing thanks to Ingest, we populate this field with
    a vMax number, but the user will be able to change this value to better see chromatin features.<br></br>
    </p>

    <p className="main-document">
    <u>Normalization</u> is the method of normalization used to prepare the image for viewing. This was determined by Ingest
    but may also be changed here between Linear, Log Normalization, and Quantile Normalization.<br></br>
    </p>

    <p className="main-document">
    <u>More Parameters</u> There's more!<br></br>
    </p>

<hr></hr>
    <ul><li><a id="#alink_viewer">VIEWER: Visualize and process architectural features.</a></li></ul>
    <p className="main-document">
    ...
    </p>

    <p className="main-document">
    <u>More Parameters</u> There's more!<br></br>
    </p>

<hr></hr>

    <ul><li><a id="#alink_pairs">Pairs: Access Database Using Known Keys.</a></li></ul>
    <p className="main-document">
    ...
    </p>

    <p className="main-document">
    <u>More Parameters</u> There's more!<br></br>
    </p>

<hr></hr>

    <ul><li><a id="#alink_dump">Dump: Access Database Using Known Keys.</a></li></ul>
    <p className="main-document">
    ...
    </p>

    <p className="main-document">
    <u>More Parameters</u> There's more!<br></br>
    </p>

  </div>
{/*
  <Draggable
    handle="#showStartMosaic"
    // defaultPosition={{x: 0, y: 0}}
    position={null}
    // grid={[25, 25]}
    scale={1}
    onStart={this.handleStart}
    onDrag={this.handleDrag}
    onStop={this.handleStop}>*/}
    <Rnd
      className="content"
      cancel="BoxTitleCloseBox"
      dragHandleClassName="headerTitle"
      minWidth={250}
      minHeight={250}
      size={{ width: this.state.width,  height: this.state.height }}
      position={{ x: this.state.x, y: this.state.y }}
      onDragStop={(e, d) => { this.setState({ x: d.x, y: d.y }) }}
    >


  {/*<div id="showStartMosaic" className="content">*/}
      <div id="BoxTitle" className="headerTitle">
        <div className="topTitleLine"></div>
        <div className="titleLines"></div>
        <div className="titleLines"></div>
        <div className="titleLines"></div>
        <div className="titleLines"></div>
        <div className="bottomTitleLines"></div>
        <div id="BoxTitleHandle" className="callTitle">CALL</div>
        <div id="BoxTitleCloseBox" className="control-box close-box" onClick={this.closeWindow}>
        <a id="BoxTitleCloseInner" className="control-box-inner" ></a>
        </div>
      </div>

    <div className="icon"><img src="./src/img/lariattmp.png" height={75} /></div>
    <ul>
      <li>Made by Sean Moran</li><br/>
      <li>MIT License, Lariat 2024, University of Michigan. All rights reserved.</li>
    </ul>


    </Rnd>

    </>
}
}