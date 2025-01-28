import Head from '../MainView/Head.jsx';
import InspectBody from './InspectBody.jsx'
import PasteBoard from '../PasteboardView/PasteboardView.jsx'
import { useState, useEffect } from 'react';
import axios from 'axios';
import './inspect.css';
import '../style.css';
import '../PasteboardView/popBoard.css';
import useLocalStorage from './../CustomHooks/UseLocalStorage.js';
import { Histogram } from './histogram.jsx';


export default function InspectView() {

    const [tableMemory, setTableMemory] = useLocalStorage("tableMemory");
    const [histogramProperties, sethistogramProperties] = useState({width: 1, height: 1, data: []});
    // console.log("component did mount");
    // console.log(tableMemory);

    // for (var key in tableMemory) {
    //   console.log(key);
    //   console.log(tableMemory[key]);
    // }
    // tableMemory.keys().forEach((element) => console.log(tableMemory.get(element)));

  return (
    <>
      <Head />
      <InspectBody OnHistChange={sethistogramProperties} storetable={tableMemory}/>
      <PasteBoard />
      <Histogram histProps={histogramProperties}/>
    </>
  )
}



//when change from inspectBody -> bubbleup to parent -> bubble down to Histogram.