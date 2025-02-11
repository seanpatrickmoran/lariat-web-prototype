import React, {useState} from 'react';
import { Rnd } from "react-rnd";
import Mosaic from './Mosaic.jsx'

import docuIcon from "./../../../../instructions/docuIcon.svg"
import overviewImage from "./../../../../instructions/Overview.svg"
import supervisorImage from "./../../../../instructions/SupervisorPlot.svg"
import similarityImage from "./../../../../instructions/Similarity.svg"
import semanticSearchImage from "./../../../../instructions/SemanticSearch.svg"
import queryviewImage from "./../../../../instructions/Queryview.svg"


// import { ipcRenderer } from 'electron';

export default class MainContent extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      favicon: "",
      // width: 800,
      // height: 640,
      x: 10,
      y: 28,         
      width: window.innerWidth/4*3,
      height: window.innerHeight/8*7,
    };
    this.closeWindow = this.closeWindow.bind(this);
  }

  eventLogger = (e, data) => {
    console.log('Event: ', e);
    console.log('Data: ', data);
  };
  componentDidMount() {
    const faviconMode = window.matchMedia('(prefers-color-scheme: light)').matches ? "/colloidal.svg" : "/cyclops.svg";
    this.setState({favicon: faviconMode});
  }
  closeWindow(){
    this.props.handleCallChange("hidden");
  }
  render (){

  function closeMosaicWindow(){
    document.getElementById("showStartMosaic").style.visibility = "hidden"
  }
    return  <>


    <Rnd
      className="content"
      cancel="BoxTitleCloseBox"
      dragHandleClassName="headerTitle"
      minWidth={300}
      minHeight={250}
      maxWidth={window.innerWidth}
      maxHeight={window.innerHeight}
      size={{ width: this.state.width,  height: this.state.height }}
      position={{ x: this.state.x, y: this.state.y }}
      onDragStop={(e, d) => { this.setState({ x: d.x, y: d.y }) }}
      style={{overflow: "scroll"}}

      onResizeStop={(e, direction, ref, delta, position) => {

        // document.getElementById("talk").style.maxHeight = 
        //   (parseInt(ref.style.height.split("px")[0])-26-20).toString()+"px";
        // document.querySelector(".textField").style.width = Math.round(.98*ref.style.width.split("px")[0]-20).toString()+"px";


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
      <div id="BoxTitleHandle" className="callTitle">DOCS</div>
      <div id="BoxTitleCloseBox" className="control-box close-box" onClick={this.closeWindow}>
      <a id="BoxTitleCloseInner" className="control-box-inner" ></a>
      </div>
    </div>


    <h1>Lariat</h1>
    <img src={docuIcon} width="125"></img>

    <ul>
      <li>Welcome to Lariat! A toolkit for architectural chromatin analysis.</li>
      <li>DOCUMENTATION</li>
    </ul>
    <p className="main-document">The overall goal of Lariat is to provide a tool for anyone to easily perform rapid visualization and analysis of chromatin conformation capture results.</p>
    <br></br>
     <img src={overviewImage} width="450"></img><img src={supervisorImage} width="450"></img>   

    <br></br>

    <p className="main-document"> 
    Use of the tools relies on the user to have formed a sqlite3 database compatible 
    for use with Larait via Ingest, which can be found on github at <a href="https://github.com/seanpatrickmoran/strainer">https://github.com/seanpatrickmoran/strainer</a>.
    Briefly, users will need to provide Ingest with original chomratin conformation 
    capture (3C) data-inputs such as .hic or .cool .mcool files. The user will also need 
    a secondary file that contains chromatin architectural information in tabular form.
    With both of these, ingestion queries and writes the image data and the data's metadata
    into a relational database that Lariat can access easily.
    Lariat is a convinient combination of tools to visualize, compare, and filter chromatin
    architectural features, built specifically with chromatin loops in mind. The easiest way
    to use Lariat is to populate its clipboard by exploring filter options under PAIRS and
    then finding shared loops or exclusive loops, and then exporting the records using DUMP.    </p>
    <br></br>

    <br></br>

<hr></hr>
    <ul><li><a id="#alink_query">QUERY: Access and query database.</a></li></ul>
    <p className="main-document">
    The Query function allows the user to perform read functions on the SQL database linked to Lariat. 
    Query is also useful if the database's contents are not well understood or if the user seeks to
    combine data from many experiments from publically availible 3C-type data. By default, the database
    entries are written in exactly the same way via Ingest to the following schema:</p>

    <pre>
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
              meta)</pre>

    <p className="main-document">
    Query's window has 3 dropdown menus and 3 buttons. Each dropdown menu scopes the selection of data 
    from the database. Only once two of three are selected will any data populate the field beneath.
    The fields for direct selectionare accessible via the query's select menus for the user to display up to 200 at a time for
    large field selection based on the data's source, its cell-type, and the contributing lab. Generally, there are a few thousand entries
    per datatype availible.</p>

    <img src={queryviewImage} width={550}></img>

    <p className="main-document">
    The three buttons 'Query,' 'Select All,' and 'Copy' are for semantic query, selecting all names in the names-field, and copying anything
    selected to the pasteboard. </p>




    <p className="main-document">
    The 'query' button launches a terminal emulator that allows access to an inference model, it has the following generic commands:</p>
    <p>    :clear</p>
    <p>    :help</p>
    <p>    :reset</p>
    <p>    :purge</p>
    <p>    :quit    <br/><br/></p>

    <p className="main-document">
    Not using a command will allow the user to talk to the inference model directly. A semantic search can be done using :?search</p>

    <img src={semanticSearchImage} width={550}></img>

    <p className="main-document">
    The inference agent will return a set of similar images that can be separately analyzed. User will be able to restrict what datasets or celltypes
    the inference agent will include in the semantic query.</p>

    <p className="main-document">
    Our semantic search is a retrival augmented generation setup, where the default is to use vectorizations of the images to perform HWSN or KNN
    to match most similar or related images.  </p>
   <img src={similarityImage} width={750}></img>





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


    <p className="main-document">
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

  {/*</div>*/}
      </Rnd>

  <div id="showStartMosaic" visibility="visible">
    <Mosaic />
  </div>

    </>
}
}