import Head from '../MainView/Head.jsx';
import QueryBody from './QueryBody.jsx'
import IsQuerying from "./IsQuerying.jsx";
import PasteBoard from '../PasteboardView/PasteboardView.jsx'
import { useState, useEffect } from 'react';
import axios from 'axios';
import './query.css';
import '../style.css';
import '../PasteboardView/popBoard.css';
import useLocalStorage from './../CustomHooks/UseLocalStorage.js';

export default function QueryView({pasteBoardProps,pasteBoardPropsUpdate,callBoxProps,setCallBoxProps}) {

    const [tableMemory, setTableMemory] = useLocalStorage("tableMemory");
    const [searchVisible, setSearchVisible] = useState("hidden");

  return (
    <>

      <QueryBody    id={"QueryBody"}
                    storetable={tableMemory} 
                    pasteBoardProps={pasteBoardProps} 
                    pasteBoardPropsUpdate={pasteBoardPropsUpdate}
                    callBoxProps={callBoxProps} 
                    setCallBoxProps={setCallBoxProps}
                    setSearchVisible={setSearchVisible}/>
      <IsQuerying   id={"IsQuerying"}
                    storetable={tableMemory}
                    searchVisible={searchVisible}
                    setSearchVisible={setSearchVisible}
                    />
    </>
  )
}

