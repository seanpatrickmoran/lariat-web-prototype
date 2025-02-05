import Draggable from 'react-draggable';
import ollama from 'ollama';
import React, {useEffect,useState,useRef} from 'react';
import "./CallBox.css"


export class CallBox extends React.Component{
         constructor(props){
            super(props);
			this.closeWindow = this.closeWindow.bind(this);
            this.state = {
            	term: "$>",
            	written: "",
            	};
           }

  componentDidMount() {

  }


  onKeyPressHandler = async (e) => {
     // e.preventDefault();
     if (e.key === 'Enter') {
				const newWritten = this.state.written + `${this.state.term}` + "\n";

				const response = await ollama.chat({
				  model: 'llama3.2',
				  messages: [{ role: 'user', content: this.state.term }],
				})

				console.log(response.message.content)

				// this.setState({written: newWritten});

				const responseWritten = this.state.written + `${this.state.term}` + "\n" + "\n" + `${response.message.content}` +"\n" + "\n";
				this.setState({written: responseWritten})
				this.setState({term: "$>"})
				this.scrollToBottom();
     }
 };

  scrollToBottom() {
  	let scrollableDiv = document.getElementById('talk');
    scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
  }

  speakToLlama(){

  }



  closeWindow(){
  	this.setState({term:"$>"});
    this.props.handleCallChange("hidden");
  }

    render (){

  return <>

				<Draggable
				handle="#callBoxTitle"
				position={null}
				scale={1}
				onStart={this.handleStart}
				onDrag={this.handleDrag}
				onStop={this.handleStop}>

			  <div id="callBox" className="content" style={{visibility: this.props.isCalling}}>
			    <div id="callBoxTitle" className="headerTitle">
			      <div className="titleLines"></div>
			      <div className="titleLines"></div>
			      <div className="titleLines"></div>
			      <div className="titleLines"></div>
			      <div className="titleLines"></div>
			      <div className="titleLines"></div>
			      <div id="callBoxTitleHandle" className="callTitle">CALL</div>
			      <div id="callBoxTitleCloseBox" className="control-box close-box" onClick={this.closeWindow} >
			      <a id="callBoxTitleCloseInner" className="control-box-inner"></a>
			      </div>
			    </div>
	    <div id="talk" style={{color:"#666"}}>
	    	<pre>{this.state.written}</pre>
	    </div>
	    <div>
	    	{/*<p className="blink">~@</p>*/}
	    	<input
	    		type="text"
	    		value={this.state.term}
	    		onChange={e=>this.setState({term: e.target.value})}
          autoComplete="off"
          onKeyPress={this.onKeyPressHandler}
          autoFocus="autofocus"

	    	/>
	    </div>

	    <div className="row-container">
	      <button type="button" id="intersectBtn">SEND</button>
	      <button type="button" id="aNotbBtn">RECV</button>
	      <button type="button" id="bNotaBtn">CLEAR</button>
	    </div>
	  </div>

	  </Draggable>
	  </>
  }
}