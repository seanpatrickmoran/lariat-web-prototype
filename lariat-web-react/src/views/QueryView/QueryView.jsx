import Head from '../MainView/Head.jsx';
import QueryBody from './QueryBody.jsx'
import { useState, useEffect } from 'react';
import axios from 'axios';
import './query.css';
import '../style.css';

export default function QueryView() {

  fetchTest();

  return (
    <>
      <Head />
      <QueryBody />
    </>
  )
    // <>
        //  <nav className="row-container">
    //   <button id="backBtn">Main Menu</button>
    //   <button id="viewToQueryBtn"> Query </button>
    //   <button id="viewToInspectBtn"> Inspect </button>
    //   <button id="viewToPairsBtn"> Pairs </button>
      //   </nav>
    // </>
}


// export function fetchTest(){
//       const fetchData = async () => {
//           const response = await fetch(`http://localhost:8080/api/test`)
//           const newData = await response.json()
//           console.log(newData)
//       };  

//       return fetchData();
// };




export function fetchTest(){
  const [test, setTest] = useState(null);
  useEffect(() => {
    fetch(`http://localhost:8080/api/test`, {
      method: "GET"
    })
      .then((response) => response.json())
      .then((data) => {
        setTest(test);
        console.log(data);
      })
      .catch((error) => console.log(error));;
  }, []);
}




// export function fetchTest(){
//   try{
//   // const [test, setTest] = useState(null);
//   // useEffect(() => {
//   //   fetch(`http://localhost:8080/api/test`, {
//   //     method: "GET"
//   //   })
//   //     .then((response) => response.json())
//   //     .then((data) => {
//   //       setTest(test);
//   //       console.log(data);
//   //     })
//   //     .catch((error) => {
//   //       console.log(error);
//   //       console.log(response);
//   //     });
//   // }, []);

//   fetch('/api/test',{method:"GET"})
//   .then((response) => response.json())
//   .catch((error) => console.log(error));

//   // let data =  await response.json();
//   // console.log(data);
//   // // console.log(response);
//   //   } catch (error) {
//   //     console.error(error);
//   //   }
// };










// function Joke() {
//   const [joke, setJoke] = useState(null);
//   useEffect(() => {
//     fetch("https://jokes-by-api-ninjas.p.rapidapi.com/v1/jokes", {
//       method: "GET",
//       headers: {
//         "X-RapidAPI-Key": "your-api-key",
//         "X-RapidAPI-Host": "jokes-by-api-ninjas.p.rapidapi.com",
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setJoke(data[0].joke);
//         console.log(data);
//       })
//       .catch((error) => console.log(error));
//   }, []);
// }

 
