// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App


import { useState, useEffect } from 'react'
import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
} from  "react-router";
// import MainContent from './MainView/MainContent.jsx'
// import Head from './MainView/Head.jsx'
import MainPage from './MainView/MainPage.jsx'
import QueryPage from './QueryView/QueryView.jsx'
// const { ipcRenderer } = window

// import channels from '../shared/constants.js';
// const { ipcRenderer } = window.require('electron');




function App() {
    // window.api("talk-to-main", "stinky");
  // const getData = () => {
    // function sendData(){
    //     console.log('sending ~stinky~')
    //     const resolve = window.api.invoke("talk-to-main", "stinky")
    //     resolve.then((value)=>console.log(value)).catch((err) => console.log("oh no...."));
    // }
  // };
  // const [isOverlay, setIsOverlay] = useState(false)
//   let tableMemory = {
//             "datasetFields": Array(),
//             // "resolutionFields": Array(),
//             "resolutionFields": {},
//             "NamesFields": "",
//             "databaseName" : "",
//             }

//   useEffect(()=>{
//     const reply = window.api.invoke('load-table-memory','get table mem');
//     reply.then((result)=> {tableMemory = {...result}});
// });


  return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={<MainPage />}
                    />
                    <Route
                        exact
                        path="/query"
                        element={<QueryPage />}
                    />
                </Routes>
            </BrowserRouter>
            {/*<button onClick={sendData}>Get data</button>*/}
        </>
    );
}

export default App
