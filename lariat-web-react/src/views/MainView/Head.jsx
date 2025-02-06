import { useNavigate } from "react-router";
import {useEffect, useState} from "react";
// import { ipcRenderer } from 'electron';

export default function Head() {

    const navigate = useNavigate();
    const navToMain = () => navigate('/');
    const navToQuery = () => navigate('/query');
    const navToInspect = () => navigate('/inspect');
    const navToPairs = () => navigate('/pairs');

    // const usesDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    // const favicon = document.getElementById('favicon');


    const [favicon, setFavicon] = useState('');

    //   function switchIcon(usesDarkMode) {
    //     if (usesDarkMode) { 
    //       favicon.href = '%PUBLIC_URL%/favicon-dark.ico';
    //       manifest.href='%PUBLIC_URL%/manifest-dark.json' 
    //     } else {
    //     favicon.href = '%PUBLIC_URL%/favicon-light.ico';
    //     manifest.href='%PUBLIC_URL%/manifest-light.json' 
    //     }
    //   }

  useEffect(() => {
    
    const faviconMode = window.matchMedia('(prefers-color-scheme: light)').matches ? "/colloidal.svg" : "/cyclops.svg";
    console.log(faviconMode)
    setFavicon(faviconMode);
},[]);

  return (
<>
      <link id="favicon" rel="icon" type="image/svg+xml" href={favicon} />
			<nav className="row-container">
      <button className="command_button" id="backBtn" onClick={navToMain}> MAIN </button>
      <button className="command_button" id="viewToQueryBtn" onClick={navToQuery}> QUERY </button>
      <button className="command_button" id="viewToInspectBtn" onClick={navToInspect}> INSPECT </button>
      <button className="command_button" id="viewToPairsBtn" onClick={navToPairs}> PAIRS </button>
	    </nav>
</>
  )
}







 
