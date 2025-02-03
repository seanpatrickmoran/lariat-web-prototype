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
			<nav className="row-container" style={{
      backgroundColor: "#f0f0f0",
      borderBottom: "1px solid black"
      }}>
      <button className="command_button" id="backBtn" onClick={navToMain}>Main Menu</button>
      <button className="command_button" id="viewToQueryBtn" onClick={navToQuery}> Query </button>
      <button className="command_button" id="viewToInspectBtn" onClick={navToInspect}> Inspect </button>
      <button className="command_button" id="viewToPairsBtn" onClick={navToPairs}> Pairs </button>
	    </nav>
    </>
  )
}







 
