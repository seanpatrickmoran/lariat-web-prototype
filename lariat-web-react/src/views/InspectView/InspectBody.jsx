import { Rnd } from "react-rnd";
import React, {useEffect,useState} from 'react';
import useLocalStorage from './../CustomHooks/UseLocalStorage.js'
import $ from 'jquery';
import { kronecker, formImage, fillImageArray } from './inspect.js';
import { Histogram } from './histogram.jsx';




export default class InspectBody extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        width: 800,
        height: 640,
        x: 10,
        y: 28,   
        selectValue: '',
        visibility: '',
        contents: '',
        colorMap: "GreyScale",
                    };
      this.resolutionOptions = Object.keys(this.props.storetable[Object.keys(this.props.storetable)[0]]).map((el) => <option value={el} key={el}>{el}</option>);
      this.featureOptions = this.props.storetable[Object.keys(this.props.storetable)[0]][Object.keys(this.props.storetable[Object.keys(this.props.storetable)[0]])[0]].map((el) => <option value={el} key={el}>{el}</option>);
      // this.featureOptions = Object.keys(this.props.storetable[Object.keys(this.props.storetable[Object.keys(this.props.storetable)[0]])[0]]).map((el) => <option value={el} key={el}>{el}</option>);
      this.offset = 0;
      this.storeImage;
      this.histogram;
      this.fetchMap = new Map([[":", "%3A"], [";", "%3B"], ["<","%3C"], ["=" , "%3D"],[">" , "%3E"],["?" , "%3F"],["@" , "%40"],["!" , "%21"],["\"" , "%22"],["#" , "%23"],["$" , "%24"],["%" , "%25"],["&" , "%26"],["'" , "%27"],["(" , "%28"],[")" , "%29"],["*" , "%2A"],["+" , "%2B"],["," , "%2C"],["-" , "%2D"],["." , "%2E"],["/" , "%2F"]]);
     }

    componentDidUpdate(prevProps, prevState) {
      if (this.props.pasteBoardProps.contents !== prevProps.pasteBoardProps.contents){
        this.setState({visibility: "visible", contents: this.props.pasteBoardProps.contents});
        this.props.pasteBoardPropsUpdate({visibility: this.state.visibility, contents: this.props.pasteBoardProps.contents});
      }
      if(this.state.colorMap != prevState.colorMap){
        const vMin = document.getElementById("filter0").value;
        const vMax = document.getElementById("filter1").value;
        const canvas = document.getElementById("canvas-inspect");
        canvas.width = 455;
        canvas.height = 455;
        const ctx = canvas.getContext("2d");
        var imageDataArray = formImage(this.storeImage, vMin, vMax, this.state.colorMap)
        const imageData = new ImageData(imageDataArray, 455, 455);
        ctx.putImageData(imageData, 0, 0);
      }

    }


componentDidMount(){

  //bug is here.
      const node = document.getElementById("names-field");
      const fetchPromise = fetch(`http://localhost:8080/api/read_limiter?offset=${this.offset}&hic_path=${Object.keys(this.props.storetable)[0]}&resolution=${Object.keys(this.props.storetable[Object.keys(this.props.storetable)[0]])[0]}`);
            fetchPromise.then(response => {
              return response.json();
                  }).then(entries => {
              let names = entries.map(elem => elem.name).join("<option />");
              node.innerHTML = "<option />" + names;
              $("#names-field")[0].selectedIndex = 0;

              let selection = document.getElementById("names-field");
              var value = selection;
              var name_query = selection.options[selection.selectedIndex].value;


              const inspectPromise = fetch(`http://localhost:8080/api/getImageSingleton?name=${[...name_query].map((char) => this.fetchMap.get(char) || char).join("")}`);
              inspectPromise.then(response => {
              return response.json();
                  }).then(inspectEntries => {
                    this.storeImage = inspectEntries[0].rgbaRawArray;
                    this.props.OnHistChange({width:380, height:280, data: inspectEntries[0].histogram})

                    const canvas = document.getElementById("canvas-inspect");
                    const vMax = document.getElementById("filter1");
                    vMax.value = inspectEntries[0].viewing_vmax;
                    const names = document.getElementById("fields-payload");
                    names.innerHTML = `${inspectEntries[0].dataset}<br/>${inspectEntries[0].name}<br/>`
                    const coordsArray = inspectEntries[0].coordinates.split(",");
                    names.innerHTML += coordsArray[0] +": " + coordsArray[1] +":"+ coordsArray[2]+ "<br/>";
                    names.innerHTML += coordsArray[3] +": " + coordsArray[4] +":"+ coordsArray[5];

                    canvas.width = 455;
                    canvas.height = 455;
                    const ctx = canvas.getContext("2d");

                    var imageDataArray = fillImageArray(inspectEntries[0].rgbaArray, this.state.colorMap);      
                    const imageData = new ImageData(imageDataArray, 455, 455);
                    ctx.putImageData(imageData, 0, 0);

                });
            });

      }

  handleDatasetChange = (event) => {
    this.setState({selectValue: event.target.value});
    if (event.target.value != "dataset"){
      console.log(this.props.storetable[event.target.value])
      this.resolutionOptions = Object.keys(this.props.storetable[event.target.value]).map((el) => <option value={el} key={el}>{el}</option>);
      const storeHicPath = document.getElementById("field-select").value;
      const storeResolution = document.getElementById("resolution-field-select").value;
      this.featureOptions = this.props.storetable[event.target.value][storeResolution].map((el) => <option value={el} key={el}>{el}</option>);
      const fetchPromise = fetch(`http://localhost:8080/api/read_limiter?offset=${this.offset}&hic_path=${event.target.value}&resolution=${this.props.storetable[event.target.value][0]}`);
      const node = document.getElementById("names-field");

      fetchPromise.then(response => {
              return response.json();
                  }).then(entries => {
              let names = entries.map(elem => elem.name).join("<option />");
              // console.log(names)
              node.innerHTML = "<option />" + names;
              });
      }

    else {
      this.resolutionOptions = "";
      const node = document.getElementById("names-field");
      node.innerHTML = "";
    }
  };


  handleResolutionChange = (event) => {
    this.setState({selectValue: event.target.value});
    if (event.target.value != "resolution" 
      && document.getElementById("field-select").value!="dataset"){
        const storeHicPath = document.getElementById("field-select").value;
        this.featureOptions = this.props.storetable[storeHicPath][event.target.value].map((el) => <option value={el} key={el}>{el}</option>);
        const fetchPromise = fetch(`http://localhost:8080/api/read_limiter?offset=${this.offset}&hic_path=${storeHicPath}&resolution=${event.target.value}`);
        const node = document.getElementById("names-field");

        fetchPromise.then(response => {
                return response.json();
                    }).then(entries => {
                let names = entries.map(elem => elem.name).join("<option />");
                node.innerHTML = "<option />" + names;
              $("#names-field")[0].selectedIndex = 0;
              // const name_query = document.querySelector("#names-field")

              let selection = document.getElementById("names-field");
              var value = selection;
              // console.log(value)
              var name_query = selection.options[selection.selectedIndex].value;
              // console.log(selection.options[selection.selectedIndex])


              const inspectPromise = fetch(`http://localhost:8080/api/getImageSingleton?name=${[...name_query].map((char) => this.fetchMap.get(char) || char).join("")}`);
              inspectPromise.then(response => {
              return response.json();
                  }).then(inspectEntries => {
                    this.storeImage = inspectEntries[0].rgbaRawArray;
                    // this.histogram = Histogram(this.props.histProps);

                    this.props.OnHistChange({width:380, height:280, data: inspectEntries[0].histogram})
                    const names = document.getElementById("fields-payload");
                    const vMax = document.getElementById("filter1");
                    vMax.value = inspectEntries[0].viewing_vmax;
                    names.innerHTML = `${inspectEntries[0].dataset}<br/>${inspectEntries[0].name}<br/>`;
                    const coordsArray = inspectEntries[0].coordinates.split(",");
                    names.innerHTML += coordsArray[0] +": " + coordsArray[1] +":"+ coordsArray[2]+ "<br/>";
                    names.innerHTML += coordsArray[3] +": " + coordsArray[4] +":"+ coordsArray[5];
                    const canvas = document.getElementById("canvas-inspect");
                    canvas.width = 455;
                    canvas.height = 455;
                    const ctx = canvas.getContext("2d");

                    var imageDataArray = fillImageArray(inspectEntries[0].rgbaArray, this.state.colorMap);     
                    const imageData = new ImageData(imageDataArray, 455, 455);
                    ctx.putImageData(imageData, 0, 0);
                  });
                });
      };
    };






  handleFeatureChange = (event) => {
    this.setState({selectValue: event.target.value});
    if (event.target.value != "All" 
      && document.getElementById("feature-field-select").value!="dataset"){
        const storeHicPath = document.getElementById("field-select").value;
        const storeResolution = document.getElementById("resolution-field-select").value;
        const fetchPromise = fetch(`http://localhost:8080/api/read_feature?offset=${this.offset}&hic_path=${storeHicPath}&resolution=${storeResolution}&toolsource=${event.target.value}`);
        const node = document.getElementById("names-field");

        fetchPromise.then(response => {
                return response.json();
                    }).then(entries => {
                let names = entries.map(elem => elem.name).join("<option />");
                node.innerHTML = "<option />" + names;
              $("#names-field")[0].selectedIndex = 0;
              // const name_query = document.querySelector("#names-field")

              let selection = document.getElementById("names-field");
              var value = selection;
              // console.log(value)
              var name_query = selection.options[selection.selectedIndex].value;
              // console.log(selection.options[selection.selectedIndex])


              const inspectPromise = fetch(`http://localhost:8080/api/getImageSingleton?name=${[...name_query].map((char) => this.fetchMap.get(char) || char).join("")}`);
              inspectPromise.then(response => {
              return response.json();
                  }).then(inspectEntries => {
                    this.storeImage = inspectEntries[0].rgbaRawArray;
                    // this.histogram = Histogram(this.props.histProps);

                    this.props.OnHistChange({width:380, height:280, data: inspectEntries[0].histogram})
                    const names = document.getElementById("fields-payload");
                    const vMax = document.getElementById("filter1");
                    vMax.value = inspectEntries[0].viewing_vmax;
                    names.innerHTML = `${inspectEntries[0].dataset}<br/>${inspectEntries[0].name}<br/>`;
                    const coordsArray = inspectEntries[0].coordinates.split(",");
                    names.innerHTML += coordsArray[0] +": " + coordsArray[1] +":"+ coordsArray[2]+ "<br/>";
                    names.innerHTML += coordsArray[3] +": " + coordsArray[4] +":"+ coordsArray[5];
                    const canvas = document.getElementById("canvas-inspect");
                    canvas.width = 455;
                    canvas.height = 455;
                    const ctx = canvas.getContext("2d");

                    var imageDataArray = fillImageArray(inspectEntries[0].rgbaArray, this.state.colorMap);     
                    const imageData = new ImageData(imageDataArray, 455, 455);
                    ctx.putImageData(imageData, 0, 0);
                  });
                });
      };
    };












    handleIncrement = (event) => {
      const storeHicPath = document.getElementById("field-select").value;
      const storeResolution = document.getElementById("resolution-field-select").value;
      const fetchPromise = fetch(`http://localhost:8080/api/read_limiter?offset=${this.offset+200}&hic_path=${storeHicPath}&resolution=${storeResolution}`);
      const node = document.getElementById("names-field");
      fetchPromise.then(response => {
              return response.json();
                  }).then(entries => {
              let names = [...entries.map(elem => elem.name)];
              if (names.length!=0){
                  this.offset += 200;
                  let names = entries.map(elem => elem.name).join("<option />");
                  node.innerHTML = "<option />" + names;
                }
              });
    }


    handleDecrement = (event) => {
      const storeHicPath = document.getElementById("field-select").value;
      const storeResolution = document.getElementById("resolution-field-select").value;
      const fetchPromise = fetch(`http://localhost:8080/api/read_limiter?offset=${this.offset-200}&hic_path=${storeHicPath}&resolution=${storeResolution}`);
      const node = document.getElementById("names-field");

      fetchPromise.then(response => {
              return response.json();
                  }).then(entries => {
              let names = [...entries.map(elem => elem.name)];
              if (names.length!=0){
                  this.offset -= 200;
                  let names = entries.map(elem => elem.name).join("<option />");
                  node.innerHTML = "<option />" + names;
                }
              });
    }

    handleInspect = (event) => {
      const fetchPromise = fetch(`http://localhost:8080/api/getImageSingleton?name=${[...event.target.value].map((char) => this.fetchMap.get(char) || char).join("")}`);
      fetchPromise.then(response => {
        return response.json();
            }).then(entries => {
              console.log(entries[0]);

              this.storeImage = entries[0].rgbaRawArray;
              this.props.OnHistChange({width:380, height:280, data: entries[0].histogram})
              // Histogram(300,200,entries[0].histogram);
              const canvas = document.getElementById("canvas-inspect");
              const names = document.getElementById("fields-payload");

              const vMin = document.getElementById("filter0");
              const vMax = document.getElementById("filter1");
              vMin.value = 0;
              vMax.value = entries[0].viewing_vmax;

              names.innerHTML = `${entries[0].dataset}<br/>${entries[0].name}<br/>`
              const coordsArray = entries[0].coordinates.split(",");
              names.innerHTML += coordsArray[0] +": " + coordsArray[1] +":"+ coordsArray[2]+ "<br/>";
              names.innerHTML += coordsArray[3] +": " + coordsArray[4] +":"+ coordsArray[5];

              canvas.width = 455;
              canvas.height = 455;
              const ctx = canvas.getContext("2d");
              var imageDataArray = fillImageArray(entries[0].rgbaArray, this.state.colorMap);
        
              const imageData = new ImageData(imageDataArray, 455, 455);
              ctx.putImageData(imageData, 0, 0);
              // console.log( entries[0].histogram)

                  //
          });
  
    }


    inputHandleChange = (event) => {
      // console.log(event.target.name);
      var vMin = document.getElementById("filter0").value;
      var vMax = document.getElementById("filter1").value;

      if (event.target.name == "filter0"){
        vMin = event.target.value;
      } else if(event.target.name=="filter1"){
        vMax = event.target.value;
      } 
      //try it here, try ping ponging it through serverside.
      // var imageDataArray = new Uint8ClampedArray(this.storeImage.length);
      var imageDataArray = formImage(this.storeImage, vMin, vMax, this.state.colorMap);
      console.log(imageDataArray)

      // for(var i=0;i<this.storeImage.length;i++){
      //   // console.log(i/4);
      //   if((i+1)%4==0){
      //     imageDataArray[i] = 255;
      //   } else {
      //     const cVal = Math.round((this.storeImage[i] - vMin)/(vMax-vMin) * 255);
      //     imageDataArray[i] = cVal>0 ? cVal : 0;
      //   }
        
      // }    
      // console.log(imageDataArray);
      const canvas = document.getElementById("canvas-inspect");
      canvas.width = 455;
      canvas.height = 455;
      const ctx = canvas.getContext("2d");
      //
      const imageData = new ImageData(imageDataArray, 455, 455);
      ctx.putImageData(imageData, 0, 0);
    }


handleColorSwap = (event) => {
    if(this.state.colorMap==="REDMAP"){
      this.setState({colorMap: "GREYSCALE"})
    } else {
      this.setState({colorMap: "REDMAP"})
    }
};

copyToPasteboard = (event) => {
    var fieldSelect = document.getElementById("names-field");
    const optionsSelect = fieldSelect.selectedOptions;
    let newEntry = optionsSelect[0].value;
    let oldEntry = this.props.pasteBoardProps.contents;
    this.props.pasteBoardPropsUpdate({visibility:"visible", contents: oldEntry+","+newEntry});
    // localStorage.setItem('pasteBoardProps', JSON.stringify({visibility:"visibile", contents: oldEntry+","+newEntry}));

    console.log(this.props.pasteBoardProps.contents)
    // Object.assign(this.props.pasteBoardProps.contents);
};

    render (){
  return <>

    <Rnd
      id={"inspectBody"}
      className="content"
      cancel="BoxTitleCloseBox"
      dragHandleClassName="headerTitle"
      minWidth={860}
      minHeight={640}
      size={{ width: this.state.width,  height: this.state.height }}
      position={{ x: this.state.x, y: this.state.y }}
      onDragStop={(e, d) => { this.setState({ x: d.x, y: d.y }) }}

      onClick={() => {
        const divs = document.querySelectorAll(".content");
        divs.forEach(div => { 
          div.style.zIndex-=2
        })
        document.getElementById(this.props.id).style.zIndex=0
      }}

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
    <div id="BoxTitleHandle" className="callTitle">Inspect</div>
    <div id="BoxTitleCloseBox" className="control-box close-box" onClick={this.closeWindow}>
    <a id="BoxTitleCloseInner" className="control-box-inner" ></a>
    </div>
  </div>







    


      <div className="container">
        <div className="block">

          <div className="row-container">
             <button type="button" id="inspectBtn">Inspect</button>
             <button type="button" id="popViewBtn">PopView</button> 
             <button type="button" id='tail-sql'>Filter</button>
             <button type="button" id="copyToPasteboard" onClick={this.copyToPasteboard}> Copy</button> 
          </div>


          <div className="row-container">
            <div className="column-container" id="datasetLabels">
              <div className="row-container">
               <label for="field-select">Dataset:</label>
              </div>
              <div className="row-container">
                <label for="resolution-field-select">Resolution:</label>
              </div>
              <div className="row-container">
                <label for="feature-field-select">Feature:</label>
              </div>
            </div>


            <div className="column-container">
              <div className="row-container">
               <select name="fields" id="field-select" onChange={this.handleDatasetChange}>
                               {
                Object.keys(this.props.storetable).map((key) => {
                  return  <option value={key}>{key}</option>
                  })        
                } 
                </select>              
              </div>

              <div className="row-container">
                <select id="resolution-field-select" onChange={this.handleResolutionChange}>
                  {this.resolutionOptions}
                </select>
              </div>
              <div className="row-container">
                <select id="feature-field-select" onChange={this.handleFeatureChange}>
                  <option value={"All"} key={"All"}>{"All"}</option>
                  {this.featureOptions}
                </select>
              </div>

             </div>  
          </div>

         <div className="row-container">
            <select id="names-field" size="12" onChange={this.handleInspect}></select>
         </div>  

{/*          <div className="row-container">
            <div className="column-container">
               <div id="sql-query-payload" className="column-container"></div>
           </div>
          </div>*/}

         <div className="row-container offset-navigation" >
          <button type="button" id="offSetLeftButton" onClick={this.handleDecrement}>&#8592; Prev</button>
          <button type="button" id="offSetRightButton" onClick={this.handleIncrement}>Next &#8594;</button>
          </div>
        </div>
      <div className="block">

        <div id="inspect-labels" className="row-container">
          <div className="column-container">
            <p align="right">Dataset<br/>Data Id#<br/>Coordinates</p>
          </div>
          <div  className="column-container">
            <p id = "fields-payload" align="left"></p>
          </div>
        </div>

         <div className="row-container" height="455" width="455">
            <canvas id="canvas-inspect" width="455" height="455"></canvas>
         </div>


         <div id="imageBtnRow" className="row-container">
            {/*<div id="query-left-legend" className="column-container">*/}
               <button type="button" onClick={this.handleColorSwap}>Color</button>
            {/*</div>         */}
            <div id="query-left-legend" className="column-container imageRow">
               <p align="right">pixelMin</p>
            </div>
            <div id="pMin" className="column-container  imageRow">
              <input type="text" id="filter0" defaultValue="0" name="filter0" onChange={this.inputHandleChange} />
            </div>
            <div id="query-right-legend" className="column-container imageRow">
               <p align="right">pixelMax</p>
            </div>
            <div id="pMax" className="column-container imageRow">
              <input type="text" id="filter1" defaultValue="200" name="filter1" onChange={this.inputHandleChange} />
            </div>
            <div className="column-container imageRow">
               <button type="button" id="resetfiltersBtn">Reset Max</button>
            </div>
         </div>

      </div>
  </div>
  {/*// </Draggable>*/}
  </Rnd>
  

  </>
  }
}
