import React, {useState} from 'react';
import Draggable from 'react-draggable';
import JSZip from 'jszip'
// import { CallBox } from "./CallBox.jsx";
import "./Downloading.css"
import streamSaver from 'streamsaver'
import { Jimp } from 'jimp';


export default class Downloading extends React.Component{
           constructor(props){
              super(props);
              this.Ref = React.createRef();
              this.closeWindow = this.closeWindow.bind(this);
              this.dumpWithOptions = this.dumpWithOptions.bind(this);
              this.fetchMap = new Map([
                [":", "%3A"], [";", "%3B"], ["<","%3C"], ["=" , "%3D"],
                [">" , "%3E"],["?" , "%3F"],["@" , "%40"],["!" , "%21"],
                ["\"" , "%22"],["#" , "%23"],["$" , "%24"],["%" , "%25"],
                ["&" , "%26"],["'" , "%27"],["(" , "%28"],[")" , "%29"],
                ["*" , "%2A"],["+" , "%2B"],["," , "%2C"],["-" , "%2D"],
                ["." , "%2E"],["/" , "%2F"]]);
           }

  componentDidMount() {
  }

  closeWindow(){
    console.log('closing')
    this.props.handleIsDownloadingChange("hidden");
  }

// const fetchImage = async url => {
//   const response = await fetch(url)
//   const blob = await response.blob()
  
//   return blob
// }
  // processDownloadWrite(){

  //       let writetoFile = createWriteStream(result.filePath) 
  //       // const selectWindow = BrowserWindow.getFocusedWindow()

  //       data.forEach((elem) => {   

  //           console.log(elem.name)
  //           writetoFile.write(`${elem.name},${elem.coordinates},${elem.dataset},${elem.condition},${elem.hic_path},${elem.PUB_ID},${elem.resolution},${elem.dimensions},${elem.viewing_vmax},${elem.numpyarr},${elem.meta}\n`);
  //       })


  //   }

  async makeRequests(promiseSixArray) {
    try{
      const responses = await Promise.allSettled(promiseSixArray);
      const successArray = [];

      responses.map(response => { 
        if (response.status === "fulfilled") {
          successArray.push(response);
        }
      });

      const data = await Promise.allSettled(successArray.map(response => 
        response.value.json()
      ));

      const reply = [];
      data.forEach(obj => reply.push(obj.value))
      return reply;

    } catch {
      console.error("Multiple fetch failed");
    }
  }

  dumpWithOptions(){
    console.log('here')
    var answer = [];
      // let setArray = [...this.props.contentSet];
      const handleZipDownload = async () => {
        const zip = new JSZip()

        let setArray = [...this.props.contentSet];
        for(var i = 0; i<setArray.length/6;i++){

          // array limit error here ^^^



          //do this for as much as it fits.
          var fetchArr = [];
          var j = 0;
          while((j+i*6<setArray.length)&&(j<6)){
            console.log(i*6+j)
            // console.log(setArray[i+j])
            console.log(`http://localhost:8080/api/getImageSingleton?name=${[...setArray[i*6+j]].map((char) => 
              this.fetchMap.get(char) || char).join("")}`);
            fetchArr.push(            
              fetch(
              `http://localhost:8080/api/getImageSingleton?name=${[...setArray[i*6+j]].map((char) => 
              this.fetchMap.get(char) || char).join("")}`
              )
            )
            j++;
          }
          console.log("i, " + i)


          const storeVal = this.makeRequests(fetchArr);
          storeVal.then((response) => {
            answer.push(...response);
          })
          console.log(answer)

          // console.log(storeVal)
          // answer.push(storeVal);
        }
          console.log(answer)


//         this.props.contentSet.forEach(name_query => {


//           const fetchPromise = 
//           fetch(
//             `http://localhost:8080/api/getImageSingleton?name=${[...name_query].map((char) => 
//             this.fetchMap.get(char) || char).join("")}`
//             );

//           fetchPromise.then(response => {
//             return response.json();
//                 }).then(entries => {
//                   console.log(entries[0].name)
//                   console.log(entries[0].rgbaArray) //for now, just do the CSV
//                 });

//         // fetch -> handler
// /*
//       const image = handler.rgbaArray;
//       const pixelSize = 455
//       var image = new Jimp(pixelSize, pixelSize, function (err, image) {
//         let buffer = image.bitmap.data
//         for (var x = 0; x < pixelSize; x++) {
//           for (var y = 0; y < pixelSize; y++) {
//             const offset = (y * pixelSize + x) * 4 // RGBA = 4 bytes
//             buffer[offset    ] = x    // R
//             buffer[offset + 1] = y    // G
//             buffer[offset + 2] = 0    // B
//             buffer[offset + 3] = 255  // Alpha
//           }
//         }
//         image.write('image.png')
//       })
// */

//         // zip.file(img.name, imgData, { base64: true });



//       })
    //   const zipped = await zip.generateAsync(
    //   {
    //     type: 'blob',
    //     comment: 'Optional comment for example your website URL',
    //   })
    //   saveAs(zipped, 'archive file name')
    }
    handleZipDownload();
    console.log("DONE")
  }



  render (){

    return  <>

        <div id="isDownloading" className="content" style={{
          height: ' 42%',
          width: '42%',
          top: '0%',
          left: '28%',
          // backgroundColor: "#ccc",
          visibility: this.props.isDownloading,
        }}>

          <h1 className="title">Download</h1>
          <div className="control-box close-box" onClick={this.closeWindow} ><a className="control-box-inner"></a></div>
          <div className="control-box zoom-box"><div className="control-box-inner"><div className="zoom-box-inner"></div></div></div>
          <div className="control-box windowshade-box"><div className="control-box-inner"><div className="windowshade-box-inner"></div></div></div>


          <div className="row-container">
            <div className="column-container">
                <div id="downloadRow" className="row-container">
                  <label for="vehicle1"> CSV </label>
                  <input type="checkbox" id="CSV" value="CSV"/>
                </div>
                <div id="downloadRow" className="row-container">
                  <label for="vehicle1"> CSV </label>
                  <input type="checkbox" id="CSV" value="CSV"/>
                </div>
                <div id="downloadRow" className="row-container">
                  <label for="vehicle1"> CSV </label>
                  <input type="checkbox" id="CSV" value="CSV"/>
                </div>
                <div id="downloadRow" className="row-container">
                  <label for="vehicle1"> CSV </label>
                  <input type="checkbox" id="CSV" value="CSV"/>
                </div>

            </div>

          <div className="column-container">
            <div id="downloadRow" className="row-container">
              <p>1) Set a filename</p>
            </div>
            <div id="downloadRow" className="row-container">
              <input type="text" id="$filename" value="sample.txt"/>
            </div>

            <div id="downloadRow" className="row-container">
              <button className="command-button" value="Download" onClick={this.dumpWithOptions}>Download</button>
            </div>
            </div>

        </div>
        </div>

        </>
  }
}