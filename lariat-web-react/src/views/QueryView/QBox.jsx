// import Draggable from 'react-draggable';
// import { Resizable } from 'react-resizable';
import { Rnd } from "react-rnd";

// import React, {useState} from 'react';
import React, {useEffect,useState} from 'react';
import ollama from 'ollama';
import "./QBox.css"

import { PopOut} from "./PopOut.jsx"


export class CallBox extends React.Component{
	constructor(props){
		super(props);
		this.closeWindow = this.closeWindow.bind(this);
    this.state = {
    	term: "",
    	userMessagePointer: 0,
    	userMessages: [],
    	messages: [],
	    width: 480,
	    height: 360,
	    x: window.innerWidth/2-240,
	    y: window.innerHeight/2-360,
	    popViews: [],
		};
		this.popViewMap = new Map();
    this.fetchMap = new Map([[":", "%3A"], [";", "%3B"], ["<","%3C"], ["=" , "%3D"],[">" , "%3E"],["?" , "%3F"],["@" , "%40"],["!" , "%21"],["\"" , "%22"],["#" , "%23"],["$" , "%24"],["%" , "%25"],["&" , "%26"],["'" , "%27"],["(" , "%28"],[")" , "%29"],["*" , "%2A"],["+" , "%2B"],["," , "%2C"],["-" , "%2D"],["." , "%2E"],["/" , "%2F"]]);
    this.focusCall = React.createRef();
	}

	componentDidUpdate(prevProps,prevState){
		if(this.state.popViews!=prevState.popViews){
			this.setState({popViews: this.state.popViews})
		}
	}


	componentDidMount() {
		document.querySelector("#talk").style.maxHeight = "300px"
		document.querySelector(".textField").style.width = Math.round(.98*480-20).toString()+"px";

		const welcomeMessage = document.createElement('p');
		welcomeMessage.innerHTML = "@>" + `Welcome!\n` + `Here are some commands you can execute:\n    :search?"xyz" search features based on name "xyz"\n    :clear ––clears the terminal\n    :purge ––removes terminal history\n    :reset ––wipes messages from my memory\n    :help ––displays help\n    :quit ––closes this window`;
		document.querySelector("#talk").append(welcomeMessage);

	}


	startUpLlama = async (message) => {
		const response = await ollama.chat({
		  model: 'llama3.2',
		  messages: [{role: 'user', content: `${message}`}],
		})

		const responseWritten = "@>"+ `${response.message.content}` + "\n";
		var holdMessages = this.state.messages;

		holdMessages.push({
				role: 'system', 
				content: `${response.message.content}`
			})

		const node = document.createElement('p');
		node.innerHTML = responseWritten;

		document.querySelector("#talk").append(node);
		this.setState({
				term: "",
				// written: responseWritten,
				messages: holdMessages,
			})

		this.scrollToBottom();
   };


	llamaQuery = async (name) => {

		document.querySelector(".userClass").classList.add("blink");
	  document.querySelector(".textField").classList.add("blink");
	  document.querySelector(".textField").disabled = true;		
		console.log("meow")

		// const name = 

	  const fetchPromise = fetch(`http://localhost:9999/test2?name=${[...name].map((char) => this.fetchMap.get(char) || char).join("")}`);

    fetchPromise.then(response => {
        return response.json();
            }).then(entries => {
            	console.log(entries.message)
							const node = document.createElement('p');
							node.innerHTML = "$>" + `${this.state.term}`;
							document.querySelector("#talk").append(node);



							const responseNode = document.createElement('p');
							responseNode.innerHTML = "@>" + ` found these similar to ${this.state.term.slice(8).trim()}`
							this.setState({
									term: ""
								});

							 entries.message.forEach((x) =>{
								const ahref =  document.createElement('a');
								ahref.value = `http://localhost:8080/api/getImageSingleton?name=${[...x].map((char) => this.fetchMap.get(char) || char).join("")}`
								ahref.href = "#";
								// ahref.onclick = (()=>{ alert('hey'); return false});
								ahref.onclick = (()=>{

									this.state.popViews.push((x));
									this.popViewMap.set(x, ahref.value)
									// console.log(this.popViewMap.get(x))
									this.setState({popViews: this.state.popViews});
									// alert(this.popViewMap.get(x));
									// alert([...this.popViewMap.entries()]);

								});
								ahref.className = "queryResult" + " " + x;
								ahref.innerHTML = x;
								// ahref.setAttribute("onclick", "(()=>{ alert('hey'); return false})");
								responseNode.append(document.createElement("br"));
								responseNode.append(ahref);
								// responseNode.innerHTML += `${entries.message}`;
							})
							document.querySelector("#talk").append(responseNode);

						  document.querySelector(".textField").classList.remove("blink");
							document.querySelector(".userClass").classList.remove("blink");
						  document.querySelector(".textField").disabled = false;

							this.focusCall.current.focus();
							this.scrollToBottom();
        });
	}

	llamaSpeak = async () => {

		document.querySelector(".userClass").classList.add("blink");
	  document.querySelector(".textField").classList.add("blink");
	  document.querySelector(".textField").disabled = true;

		var holdMessages = this.state.messages
		
		holdMessages.push({
				role: 'user', 
				content: `${this.state.term}` 
			});

		this.setState({messages: holdMessages})

		const response = await ollama.chat({
		  model: 'llama3.2',
		  messages: this.state.messages,
		})


		// const responseWritten = this.state.written + "\n" + "$>" + `${this.state.term}` + "\n\n" 
												 // + "@>"+ `${response.message.content}`+"\n";


		holdMessages.push({
				role: 'system', 
				content: `${response.message.content}`
			})

		this.setState({
				term: "",
				// written: responseWritten,
				messages: holdMessages,
			})


		const node = document.createElement('p');
		node.innerHTML = "$>" + `${this.state.term}`;
		document.querySelector("#talk").append(node);

		const responseNode = document.createElement('p');
		responseNode.innerHTML = "@>" + `${response.message.content}`;
		document.querySelector("#talk").append(responseNode);

	  document.querySelector(".textField").classList.remove("blink");
		document.querySelector(".userClass").classList.remove("blink");
	  document.querySelector(".textField").disabled = false;
		// document.getElementById('talk').scrollTop = document.getElementById('talk').scrollHeight;
		// document.getElementById("talk").focus();
		this.focusCall.current.focus();
		this.scrollToBottom();
   }


	onKeyPressHandler = async (e) => {
		if (e.key === 'Enter') {
			const selectNode = document.querySelector("#talk");
			var pushUser = this.state.userMessages;
			pushUser.push(this.state.term);

			this.setState({userMessages: pushUser});
			this.setState({userMessagePointer: pushUser.length})
			switch(this.state.term.trim()){


			// case("clear"): this.setState({term: "", written: ""});
			case(":clear"): 
				this.setState({term: ""});	
				
				while (selectNode.firstChild) {
					selectNode.removeChild(selectNode.lastChild);
				}
				break;

			case(":reset"): 
				this.setState({term: ""});
				this.setState({messages: []})
				while (selectNode.firstChild) {
					selectNode.removeChild(selectNode.lastChild);
				}
				break;

			case(":purge"): 
				this.setState({term: ""});
				this.setState({messages: []})
				this.setState({userMessagePointer: 0, userMessages: [""]});
				break;

			// case(":search"): 
			// 	this.llamaQuery();
			// 	this.setState({term: ""});
			// 	break;

			case(":help"): 
				this.setState({term: ""});
				const responseNode = document.createElement('p');
				responseNode.innerHTML = "@>" + `Here are some commands you can execute:\n    :search?"xyz" search features based on name "xyz"\n    :clear ––clears the terminal\n    :purge ––removes terminal history\n    :reset ––wipes messages from my memory\n    :help ––displays help\n    :quit ––closes this window`;
				selectNode.append(responseNode);
				this.scrollToBottom();
				break;

			case(":quit"): this.closeWindow();
				break;

			default: 
				if (this.state.term.startsWith(":search?")){
					const query = this.state.term.slice(8).trim()
					this.llamaQuery(query);
					return;
				}
				this.llamaSpeak();
			}


		} else if (e.key === 'ArrowUp'){
			if (this.state.userMessagePointer-1>=0 &&  this.state.userMessages.length!=0){
				this.setState({
					term: this.state.userMessages[this.state.userMessagePointer-1]
					})
				this.setState({userMessagePointer: this.state.userMessagePointer-1})
			}

 		} else if (e.key === 'ArrowDown'){
			if (this.state.userMessagePointer+1<=this.state.userMessages.length){
				this.setState({
					term: this.state.userMessages[this.state.userMessagePointer+1]
					})
				this.setState({userMessagePointer: this.state.userMessagePointer+1})
			}

			else{
				// console.log('huh')
				this.setState({term: ""})
			}
 	}

};



// //implement history. 
//  keyDownHandler = async (e) => {
//  	if (e.key === 'ArrowUp'){

//  	}
//  	else if (e.key === 'ArrowDown'){

//  	}
//  }



  scrollToBottom() {
  	let scrollableDiv = document.getElementById('talk');
    scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
  }


  closeWindow(){
  	this.setState({term:"", width: 480, height: 360})
    this.props.handleCallChange("hidden");
  }

    render (){

  return <>



		<Rnd
			id="callBox"
			className="content"
			cancel="callBoxTitleCloseBox"
			dragHandleClassName="headerTitle"
			minWidth={340}
			minHeight={200}
		  size={{ width: this.state.width,  height: this.state.height }}
		  position={{ x: this.state.x, y: this.state.y }}
		  onDragStop={(e, d) => { this.setState({ x: d.x, y: d.y }) }}
		  onResizeStop={(e, direction, ref, delta, position) => {

				document.getElementById("talk").style.maxHeight = 
					(parseInt(ref.style.height.split("px")[0])-26-20).toString()+"px";
				document.querySelector(".textField").style.width = Math.round(.98*ref.style.width.split("px")[0]-20).toString()+"px";


			    this.setState({
		      width: ref.style.width,
		      height: ref.style.height,
		      ...position,
		    });
		  }}
		>

	    <div id="callBoxTitle" className="headerTitle">
	      <div className="topTitleLine"></div>
	      <div className="titleLines"></div>
	      <div className="titleLines"></div>
	      <div className="titleLines"></div>
	      <div className="titleLines"></div>
	      <div className="bottomTitleLines"></div>
	      <div id="callBoxTitleHandle" className="callTitle"> @&gt; </div>
	      <div id="callBoxTitleCloseBox" className="control-box close-box" onClick={this.closeWindow}>
	      <a id="callBoxTitleCloseInner" className="control-box-inner" ></a>
	      </div>
	    </div >
	    {/*<div id="talk" style={{color:"#666"}}>*/}
	    <div id="talk">
	    </div>
	    	{/*<pre id="talk">{this.state.written}</pre>	*/}
	    	{/*<pre id="talk" style={{maxHeight: this.state.height-26-19}}>{this.state.written}</pre>*/}
	    <div>
	    	{/*<p className="blink">~@</p>*/}
	    <section>
	    <p className="command__user"><span className={`userClass`}>$&gt;
	    <input
	    		className={`textField`}
	    		type="text"
	    		value={this.state.term}
	    		ref={this.focusCall}
	    		onChange={e=>this.setState({term: e.target.value})}
          autoComplete="off"
          onKeyDown={this.onKeyPressHandler}
          autoFocus="autofocus"/>
      </span></p>
      </section>
    {/*</div>*/}
	  </div>
    {/*</div>*/}

	  </Rnd>

    <div id="spawnedViews">
    {/*{comments.map(comment => <Comment id={comment.id} text={comment.text} />)}*/}
    	{this.state.popViews.map((view) => 
    		<PopOut id={view} image={this.popViewMap.get(view)}/>
    	)}
    </div>
	  </>
  }
}