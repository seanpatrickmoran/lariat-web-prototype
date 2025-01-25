import Head from './Head.jsx'
import MainContent from './MainContent.jsx'
import PasteBoard from '../PasteboardView/PasteboardView.jsx'
import '../PasteboardView/popBoard.css';

import "../style.css";
import "./index.css";
import "../../../src/img/lariattmp.png"
import useLocalStorage from './../CustomHooks/UseLocalStorage.js';
import { useState, useEffect } from 'react';

// import { ipcRenderer } from 'electron';
// import * from "./mainfunc.js" as func;
// import $ from 'jquery'
// import 'jquery-ui'; 
// import { useEffect } from "react";



export default function MainPage() {

  const [tableMemory, setTableMemory] = useLocalStorage("tableMemory");
  useEffect(() => {
    fetch(`http://localhost:8080/api/readTableMemory`, {
      method: "GET"
    })
      .then((response) => response.json())
      .then((data) => {
        setTableMemory(data);
        // const [tableMemory, setTableMemory] = useLocalStorage("tableMemory", data);
        localStorage.setItem('tableMemory', JSON.stringify(data));
      })
      .catch((error) => console.log(error));;
  }, []);

  console.log(tableMemory);



  return (
    <>
      <Head />
      <MainContent />
      <PasteBoard />
    </>
  )
}







 
