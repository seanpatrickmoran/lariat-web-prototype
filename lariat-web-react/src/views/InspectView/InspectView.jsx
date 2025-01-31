import { useState, useEffect } from 'react';

import Head from '../MainView/Head.jsx';
import InspectBody from './InspectBody.jsx'
import PasteBoard from '../PasteboardView/PasteboardView.jsx'

import '../style.css';
import './inspect.css';

import useLocalStorage from './../CustomHooks/UseLocalStorage.js';
import { Histogram } from './histogram.jsx';


export default function InspectView({pasteBoardProps,pasteBoardPropsUpdate}) {

    const [tableMemory, setTableMemory] = useLocalStorage("tableMemory");
    const [histogramProperties, sethistogramProperties] = useState({width: 1, height: 1, data: []});
    // const [pasteBoardPropsChild, setPasteBoardPropsChild] = useLocalStorage("pasteBoardProps");
    // const [pasteBoardPropsChild, setPasteBoardPropsChild] = useState(pasteBoardProps);

    // pasteBoardPropsUpdate(pasteBoardPropsChild); //how to do... easiest would be to make tese the same level maybe. don't nest them deeply.
    // console.log(pasteBoardProps);

  return (
    <>
      <InspectBody  histProps={histogramProperties} 
                    OnHistChange={sethistogramProperties} 
                    storetable={tableMemory} 
                    pasteBoardProps={pasteBoardProps} 
                    pasteBoardPropsUpdate={pasteBoardPropsUpdate}/>

      <Histogram    histProps={histogramProperties}/>
    </>
  )
}



//when change from inspectBody -> bubbleup to parent -> bubble down to Histogram.