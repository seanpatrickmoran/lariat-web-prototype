import { useState, useEffect } from 'react';

import Head from '../MainView/Head.jsx';
import InspectBody from './InspectBody.jsx'
import PasteBoard from '../PasteboardView/PasteboardView.jsx'

import '../style.css';
import './inspect.css';

import useLocalStorage from './../CustomHooks/UseLocalStorage.js';
import { Histogram } from './Histogram.jsx';


export default function InspectView({pasteBoardProps,pasteBoardPropsUpdate}) {
    const [tableMemory, setTableMemory] = useLocalStorage("tableMemory");
    const [histogramProperties, sethistogramProperties] = useState({width: 1, height: 1, data: []});


  return (
    <>
      <InspectBody  id={"inspectBody"}
                    histProps={histogramProperties} 
                    OnHistChange={sethistogramProperties} 
                    storetable={tableMemory} 
                    pasteBoardProps={pasteBoardProps} 
                    pasteBoardPropsUpdate={pasteBoardPropsUpdate}/>

      <Histogram    id={"histogramView"}
                    histProps={histogramProperties}/>
    </>
  )
}



//when change from inspectBody -> bubbleup to parent -> bubble down to Histogram.