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
      <button className="command_button" id="backBtn" onClick={navToMain}> MAIN </button>
      <button className="command_button" id="viewToQueryBtn" onClick={navToQuery}> QUERY </button>
      <button className="command_button" id="viewToInspectBtn" onClick={navToInspect}> INSPECT </button>
      <button className="command_button" id="viewToPairsBtn" onClick={navToPairs}> PAIRS </button>
	    </nav>
    </>
  )
}







 
