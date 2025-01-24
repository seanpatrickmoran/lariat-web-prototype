import { useNavigate } from "react-router";
// import { ipcRenderer } from 'electron';

export default function Head() {

    const navigate = useNavigate();
    const navToMain = () => navigate('/');
    const navToQuery = () => navigate('/query');
    const navToInspect = () => navigate('/inspect');
    const navToPairs = () => navigate('/pairs');


  return (
    <>
			<nav className="row-container">
      <button id="backBtn" onClick={navToMain}>Main Menu</button>
      <button id="viewToQueryBtn" onClick={navToQuery}> Query </button>
      <button id="viewToInspectBtn" onClick={navToInspect}> Inspect </button>
      <button id="viewToPairsBtn" onClick={navToPairs}> Pairs </button>
	    </nav>
    </>
  )
}







 
