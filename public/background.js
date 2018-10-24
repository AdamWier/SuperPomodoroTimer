let timerMinutes = null;
let timerSeconds = null;
var timerInterval = null;
var timerType = "session";
var endPauseSound = new Audio("./pomodoro-end-break.wav");
var endSessionSound = new Audio("./pomodoro-end-session.wav");

function TimerFunction(){
     if (timerMinutes > 0 || timerSeconds > 0){
      if (timerSeconds <= 0){
        timerMinutes -= 1;
        timerSeconds = 59;
      }
       else{
        timerSeconds -= 1;
       }
      }
    else{
      clearInterval(timerInterval);
      switch (timerType){
        case "pause":
          endPauseSound.play();
          break;
        case "session":
          endSessionSound.play();
          break;
      }
      /*this.props.counterUp(this.props.type);
      this.props.timerSwitch(this.props.type);
      this.setState({
        timerOn: false,
        minutes: this.props.minutes,
        seconds: 0,
      })*/
      window.localStorage.removeItem("timerOn");
      window.localStorage.setItem("timerOn", false);
      chrome.runtime.sendMessage({message: "done"}, (response) => { 
        console.log("message sent")
      });
    }
    /*sendResponse({message: "timerMinutes", displayMinutes: timerMinutes, displaySeconds: timerSeconds});
    */
   window.localStorage.removeItem("seconds");
   window.localStorage.setItem("seconds", timerSeconds); 
   window.localStorage.removeItem("minutes");
   window.localStorage.setItem("minutes", timerMinutes); 
console.log(timerSeconds);
      }

chrome.runtime.onInstalled.addListener(function() {
    console.log("The color is green.");
  });


  chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
      if (request.message === "start"){
        /*TimerFunction(request.minutes, request.seconds, request.type, sendResponse)*/
        timerMinutes = request.minutes;
        timerSeconds = request.seconds;
        timerInterval = setInterval(TimerFunction, 1000);
        timerType = request.type;
    }
  if (request.message === "stop"){
    clearInterval(timerInterval);
    console.log("message received");
    window.localStorage.getItem("timerOn")
  }});
