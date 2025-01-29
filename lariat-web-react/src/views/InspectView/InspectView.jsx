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


export default function InspectView({pasteBoardProps,pasteBoardPropsUpdate}) {

    const [tableMemory, setTableMemory] = useLocalStorage("tableMemory");
    const [histogramProperties, sethistogramProperties] = useState({width: 1, height: 1, data: []});
    const [pasteBoardPropsChild, setPasteBoardPropsChild] = useLocalStorage("pasteBoardProps");
    // console.log(pasteBoardProps);

  return (
    <>
      {/*<Head />*/}
      <InspectBody histProps={histogramProperties} OnHistChange={sethistogramProperties} storetable={tableMemory} pasteBoardProps={pasteBoardPropsChild} pasteBoardPropsUpdate={setPasteBoardPropsChild}/>
      {/*<PasteBoard copiedToPasteBoard={pasteBoardProps}/>*/}
      <Histogram histProps={histogramProperties}/>
    </>
  )
}



//when change from inspectBody -> bubbleup to parent -> bubble down to Histogram.