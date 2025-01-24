import Draggable from 'react-draggable';
// import React, {useState} from 'react';
import React, {useEffect,useState} from 'react';
import { fetchTest } from './QueryView.jsx';

  async function getTableMemory() {
    // const reply = window.api.invoke('load-table-memory','get table mem');
    // reply.then((result)=> { return result}); 
    // return reply
    console.log('what is it')
  };

export default class QueryBody extends React.Component{

  eventLogger = (e, data) => {
    console.log('Event: ', e);
    console.log('Data: ', data);
  };


  componentDidMount(){

  let tableMemory = {
    "datasetFields": Array(),
    // "resolutionFields": Array(),
    "resolutionFields": {},
    "NamesFields": "",
    "databaseName" : "",
    }

    // const well = await getTableMemory();


    console.log("component did mount");
    console.log(this);
  // tableMemory = await ...getTableMemory();

  // const reply = window.api.invoke('load-table-memory','get table mem').then((result) => result);
  // reply.then((result)=> {tableMemory = {...result}; 
    // console.log(result); 
    // console.log(tableMemory)});

  // console.log(reply)
  // console.log(tableMemory);

  // const options = window.api.invoke('talk-to-main', 'gimme');

  }

  // useEffect(() => {
  //     const fetchData = async () => {
  //         const response = await fetch(`http://localhost:8080/api/test`)
  //         const newData = await response.json()
  //         console.log(newData)
  //     };  

  //       fetchData();
  //   }, []);


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
      <select name="fields" id="dataset-field-select" selected="dataset">
        <option value="dataset">Dataset</option>
      </select>
    </div>

    <div className="row-container">
      <select name="fields" id="resolution-field-select" selected="resolution">
        <option value="resolution">Resolution</option>
      </select>
    </div>

    <div className="row-container">
      <select name="available" id="names-field-select" selected="all">
        <option value="all">All</option>
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
      <button type="button" id="offSetLeftButton">&#8592;</button>
      <button type="button" id="offSetRightButton">&#8594;</button>
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