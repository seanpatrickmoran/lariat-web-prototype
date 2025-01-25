import { useState, useEffect } from 'react'
import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
} from  "react-router";

import MainPage from './MainView/MainPage.jsx'
import QueryPage from './QueryView/QueryView.jsx'
import InspectPage from './InspectView/InspectView.jsx'
import useLocalStorage from './CustomHooks/UseLocalStorage.js'


export function App() {
    // callTableMemory();
  // const [_tMEM,set_tMEM] = useState(null);
  // callTableMemory();


  // useEffect(() => {
  //       fetch(`http://localhost:8080/api/readTableMemory`, {
  //         method: "GET"
  //       })
  //         .then((response) => response.json())
  //         .then((data) => {
  //           set_tMEM(data);
  //         })
  //         .catch((error) => console.log(error));;
  //     }, []);
  // const [tableMemory, setTableMemory] = useLocalStorage("tableMemory",_tMEM);



  // const [data, setData] = useState();
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch(`http://localhost:8080/api/readTableMemory`, {
  //         method: "GET"
  //       });
  //     setData(JSON.stringify(response));
  //     console.log(JSON.stringify(response))
  //   };

  //   fetchData();
  // }, [setData]);
  // console.log(data)





  // const [tableMemory, setTableMemory] = useLocalStorage("tableMemory",callTableMemory());
  // });


  // const [data, setData] = useState();




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
                    <Route
                        exact
                        path="/inspect"
                        element={<InspectPage />}
                    />                
                </Routes>
            </BrowserRouter>
            {/*<button onClick={sendData}>Get data</button>*/}
        </>
    );
}

// export async 


// export function callTableMemory(){
//   const [test, setTest] = useState(null);
//   useEffect(() => {
//     fetch(`http://localhost:8080/api/readTableMemory`, {
//       method: "GET"
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setTest(test);
//         console.log(data);
//       })
//       .catch((error) => console.log(error));;
//   }, []);
// }



