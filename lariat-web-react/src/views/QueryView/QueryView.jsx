import Head from '../MainView/Head.jsx';
import QueryBody from './QueryBody.jsx'
import { useState, useEffect } from 'react';
import axios from 'axios';
import './query.css';
import '../style.css';
import useLocalStorage from './../CustomHooks/UseLocalStorage.js';

export default function QueryView() {

    const [tableMemory, setTableMemory] = useLocalStorage("tableMemory");
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
      <QueryBody storetable={tableMemory}/>
    </>
  )
}

