import Head from '../MainView/Head.jsx';
import QueryBody from './QueryBody.jsx'
import PasteBoard from '../PasteboardView/PasteboardView.jsx'
import { useState, useEffect } from 'react';
import axios from 'axios';
import './query.css';
import '../style.css';
import '../PasteboardView/popBoard.css';
import useLocalStorage from './../CustomHooks/UseLocalStorage.js';

export default function QueryView({pasteBoardProps,pasteBoardPropsUpdate,callBoxProps,setCallBoxProps}) {

    const [tableMemory, setTableMemory] = useLocalStorage("tableMemory");
    // const [tableMemory, setTableMemory] = useLocalStorage("tableMemory");

  return (
    <>

      <QueryBody    id={"QueryBody"}
                    storetable={tableMemory} 
                    pasteBoardProps={pasteBoardProps} 
                    pasteBoardPropsUpdate={pasteBoardPropsUpdate}
                    callBoxProps={callBoxProps} 
                    setCallBoxProps={setCallBoxProps}/>
    </>
  )
}

