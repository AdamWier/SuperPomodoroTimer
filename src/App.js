import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
/* global chrome*/

/* Ideas for future features: 1) tool tips 2) block websites */
class Capitalizer extends React.Component{
  constructor(props){
    super(props);
  }
  capitalizer(string){
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
  render(){
    return(
    <span>{this.capitalizer(this.props.word)}</span>)
  }
}

class Logger extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      input: "",
      log: JSON.parse(window.localStorage.getItem('log')) ? JSON.parse(window.localStorage.getItem('log')) : [],
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleExport = this.handleExport.bind(this);
}
  handleChange(event){
    this.setState({
      input: event.target.value,
    })
  }
  
  handleSubmit(event){
    event.preventDefault();
    if (this.state.input != ""){
    let TimeStamp = new Date();
    let date = TimeStamp.toDateString();
    let hour = TimeStamp.getHours()
    let minute = TimeStamp.getMinutes()
    this.setState(({log}) => ({
      input: "",
      log: [...log, [this.state.input, date, hour, minute, TimeStamp]],
    }))
      this.props.activate();
      }
  }
  
  handleDelete(event){
    window.localStorage.removeItem('log')
    this.setState({
      log: []
    })
  }
  
  handleExport(event){
    let logToExport = JSON.parse(window.localStorage.getItem('log'))
    let palatableLog = logToExport.map(i => ("[" + i[1] + "," + i[2] + ":" + i[3] + "," + i[0] + "]" + "\n")).join("\r\n")
    let textExport = document.createElement('a')
    textExport.href = 'data:attachment/text,' + encodeURI(palatableLog)
    textExport.target = '_blank';
    textExport.download = 'log.txt';
    textExport.click();
  }
  
  componentDidUpdate(){
      window.localStorage.removeItem('log');
      window.localStorage.setItem('log', JSON.stringify(this.state.log)); 
  }
  
render(){
  const log = this.state.log.map(i => (<li class="log-items" key={i[4]}>{i[1]}, <Display minutes={i[2]} seconds={i[3]} />: <strong>{i[0]}</strong></li>))
    return(
      <div><h3>Logger</h3>{(!this.props.timerOn && this.props.type=="session") && <form onSubmit={this.handleSubmit}><input value={this.state.input} onChange={this.handleChange} /><button type="submit"><i class="fas fa-hourglass-start"></i></button></form>}<br />
        <ul>{log}</ul>
        <button onClick={this.handleExport}><i class="fas fa-file-download"></i></button>
        <button onClick={this.handleDelete}><i class="fas fa-trash-alt"></i></button>
      </div>)
  }
}

class PauseList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      list: JSON.parse(window.localStorage.getItem(this.props.type)) ? JSON.parse(window.localStorage.getItem(this.props.type)) : [],
      input: "",
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  
  handleChange(event){
    this.setState({
      input: event.target.value,
    })
  }
  
  handleSubmit(event){
    event.preventDefault();
    if (this.state.input != ""){
    this.setState(({list}) => ({
      input: "",
      list: [...list, this.state.input],
    }))
      }
  }
  
  handleDelete(i){
    let tempArray = this.state.list;
    let index = tempArray.indexOf(i);
    tempArray.splice(index, 1);
    this.setState({
      list: tempArray,
    })}
  
    componentDidUpdate(){
      window.localStorage.removeItem(this.props.type);
      window.localStorage.setItem(this.props.type, JSON.stringify(this.state.list)); 
  }
  
  
  render(){
    const items = this.state.list.map((i, index) => <li key={this.props.type + index}>{i}<button onClick={() => this.handleDelete(i)}  class="pause-buttons"><i class="fas fa-eraser"></i></button></li>);
    return(
    <div class="box pause">
    <h3><Capitalizer word={this.props.type} /> Pause List</h3>
    <form onSubmit={this.handleSubmit}>
        <input value={this.state.input} onChange={this.handleChange} />
          <button type="submit" class="pause-buttons"><i class="fas fa-plus-circle"></i></button></form>
        <ul class="pause-list">{items}</ul>
    </div>)
  }
}

class Display extends React.Component{
  /* Timer display filter */
  constructor(props){
    super(props);
    this.addZero = this.addZero.bind(this)
  }
  
  addZero(num){
    if (num < 10){
      return ("0" + num)
    }
    else{
      return num
    }
  }
  
  render(){
    return(
    <span>{this.addZero(this.props.minutes)}:{this.addZero(this.props.seconds)}</span>
  );
  }
}

class Timer extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      minutes: this.props.minutes,
      seconds: 0,
      timerOn: this.props.timerOn,
      endPauseSound: new Audio("http://www.mycabinetofcuriosities.com/codepen-files/pomodoro-end-break.wav"),
      endSessionSound: new Audio("http://www.mycabinetofcuriosities.com/codepen-files/pomodoro-end-session.wav"),
      sessionStoppedMessage: "Timer stopped. Type this pomodoro's purpose and start!",
      pauseStoppedMessage: "Timer stopped. Click go to take a well-deserved break!"
    }
    this.TimerFunction = this.TimerFunction.bind(this);
    this.activateTimer = this.activateTimer.bind(this);
    this.reset = this.reset.bind(this);
  }
  
  /*Timer mechanism*/
  TimerFunction(){
     if (this.state.minutes > 0 || this.state.seconds > 0){
      if (this.state.seconds <= 0){
        this.setState(({minutes}) => ({
          minutes: minutes - 1,
          seconds: 59,
        }))
      }
       else{
         this.setState(({seconds}) => ({
        seconds: seconds - 1,
      }))
       }
      }
    else{
      clearInterval(this.timerInterval);
      switch (this.props.type){
        case "pause":
          this.state.endPauseSound.play();
          break;
        case "session":
          this.state.endSessionSound.play();
          break;
      }
      this.props.counterUp(this.props.type);
      this.props.timerSwitch(this.props.type);
      this.setState({
        timerOn: false,
        minutes: this.props.minutes,
        seconds: 0,
      })
    }
      }
  
    /*Start/pause button */
    activateTimer(){
    if (this.state.timerOn == false){
    this.setState({
      timerOn: true,
      minutes: this.props.minutes
    })
    chrome.runtime.sendMessage({message: "hi"}, (response) => {
      this.setState({
        test: response.message
      })
      console.log(response.message);
    });
     this.timerInterval = setInterval(this.TimerFunction, 1000)
      }
    if (this.state.timerOn == true){
      this.setState({
        timerOn: false,
      })
      clearInterval(this.timerInterval)
    }
  }
  
   /*Reset button*/
  reset(){
    clearInterval(this.timerInterval)
    this.setState({
      minutes: this.props.minutes,
      seconds: 0,
      timerOn: false,
    })
    this.props.reset()
  }
  
  render(){
    return(      <div id="pomodoro">
        <div id="timer" class="box">
        {this.state.test}
        <h3>Timer</h3>
        {this.state.timerOn ? <div id="timer-numbers"><Display minutes={this.state.minutes} seconds={this.state.seconds} /></div> : this.props.type == "session" ? <p>{this.state.sessionStoppedMessage}</p> : <p>{this.state.pauseStoppedMessage}</p>}
          <h2 id="timer-label">{this.props.type} phase</h2>
                  {(this.props.type == "pause") && <button id="start_stop" onClick={this.activateTimer}><i class="fas fa-grin-beam"></i></button>}
          {(this.state.timerOn && this.props.type=="session") && <button onClick={this.reset}><i class="fas fa-ban"></i></button>}
          </div>
                                <div id="logger" class="list box"><Logger activate={this.activateTimer} timerOn={this.state.timerOn} type={this.props.type}/></div>
      </div>
  )
  }
}

class TimerControls extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      html: {
        length: this.props.type +"-length",
        label: this.props.type +"-label",
        decrement: this.props.type +"-decrement",
        increment: this.props.type +"-increment",
        controller: this.props.type +"-controller",
      },
    }
  }


  render(){
    return(
        <div class="box" id={this.state.html.controller}>
          <h3><Capitalizer word={this.props.type} /> Length: </h3>
        <div id={this.state.html.length} class="numbers">
          {this.props.minutes}</div>
        <button onClick={() => this.props.increaseMinutes(this.props.type)} id={this.state.html.increment}><i class="fas fa-arrow-alt-circle-up"></i></button>
        <button onClick={() => this.props.decreaseMinutes(this.props.type)} id={this.state.html.decrement}><i class="fas fa-arrow-alt-circle-down"></i></button>
      </div>
    )
  }
         }

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      currentTimer: "session",
      session: 25,
      pause: 5,
      counter: 0,
      timerOn: false, /* fix in timer class */
    }
    this.changeTimer = this.changeTimer.bind(this);
    this.reset = this.reset.bind(this);
    this.counterUp = this.counterUp.bind(this);
    this.increaseMinutes = this.increaseMinutes.bind(this);
    this.decreaseMinutes = this.decreaseMinutes.bind(this);
  }
  
  changeTimer(finishedTimer){
    if (finishedTimer == "session"){
        this.setState({
          currentTimer: "pause",
        }
       )
  }
    if (finishedTimer == "pause"){
      this.setState({
        currentTimer: "session",
      })
    }
  }
  
  reset(){
    this.setState({
      currentTimer: "session",
    })
    
  }
  
  counterUp(type){
    if (type == "session"){
    this.setState(({ counter }) => ({
      counter: counter + 1,
    }))};
    ((this.state.counter % 4) == 0 && (this.state.counter > 0)) ?
      this.setState(({pause}) => ({
        pause: 30,
      })) :
      this.setState(({pause}) => ({
        pause: 5,
      }))
    
  }
  
  increaseMinutes(type){
      switch(type){
        case "session":
                  if (this.state.timerOn == false && this.state.session < 60){
    this.setState(({session}) => ({
      session: session + 1,
    }))
        }
          break;
              case "pause":
                  if (this.state.timerOn == false && this.state.pause < 60){
    this.setState(({pause}) => ({
      pause: pause + 1,
    }))
        }
          break;
      }
            }
  
  decreaseMinutes(type){
      switch(type){
        case "session":
                  if (this.state.timerOn == false && this.state.session > 0){
    this.setState(({session}) => ({
      session: session - 1,
    }))
        }
          break;
              case "pause":
                  if (this.state.timerOn == false && this.state.pause > 0){
    this.setState(({pause}) => ({
      pause: pause - 1,
    }))
        }
          break;
      }
            }
  
  render(){
    return(
      <div id="container">
        <div id="header" class="box"><h1>Pomodoros completed: <br/> {(this.state.counter)}</h1>
          </div>
        <div id="controller"><TimerControls type="session" minutes={this.state.session} increaseMinutes={this.increaseMinutes} decreaseMinutes={this.decreaseMinutes}/>
            <TimerControls type="pause" minutes={this.state.pause} increaseMinutes={this.increaseMinutes} decreaseMinutes={this.decreaseMinutes}/></div>
          <Timer minutes={this.state.currentTimer == "session" ? this.state.session : this.state.pause} reset={this.reset} counterUp={this.counterUp} timerSwitch={this.changeTimer} type={this.state.currentTimer} timerOn={this.state.timerOn}/>
        <div id="pause-lists"><div id="short" class="list"><PauseList type="short" /></div>
        <div id="long" class="list"><PauseList type="long" />
        </div></div></div>
  )}
};

export default App;
