import Head from '../MainView/Head.jsx';
import PairsBody from './PairsBody.jsx'
import PasteBoard from '../PasteboardView/PasteboardView.jsx'
import { useState, useEffect } from 'react';
import './pairs.css';
import '../style.css';
import '../PasteboardView/popBoard.css';
import useLocalStorage from './../CustomHooks/UseLocalStorage.js';

export default function PairsView({pasteBoardProps,pasteBoardPropsUpdate}) {

    const [tableMemory, setTableMemory] = useLocalStorage("tableMemory");
    // const [pasteBoardPropsChild, setPasteBoardPropsChild] = useState(pasteBoardProps);
    // console.log(tableMemory);

    // for (var key in tableMemory) {
    //   console.log(key);
    //   console.log(tableMemory[key]);
    // }
    // tableMemory.keys().forEach((element) => console.log(tableMemory.get(element)));

  return (
    <>
      <PairsBody    storetable={tableMemory} 
                    pasteBoardProps={pasteBoardProps} 
                    pasteBoardPropsUpdate={pasteBoardPropsUpdate}/>
    </>
  )
}

