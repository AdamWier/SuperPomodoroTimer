let timerMinutes = null;
let timerSeconds = null;

function TimerFunction(){
     if (timerMinutes > 0 || timerSeconds > 0){
      if (timerSeconds <= 0){
        timerMinutes -= 1;
        timerSeconds = 59;
      }
       else{
        timerSeconds -= 1;
       }
      }/*
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
    }*/
    /*sendResponse({message: "timerMinutes", displayMinutes: timerMinutes, displaySeconds: timerSeconds});
    */
   window.localStorage.removeItem("timerOn");
   window.localStorage.setItem("timerOn", true); 
   window.localStorage.removeItem("seconds");
   window.localStorage.setItem("seconds", timerSeconds); 

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
        setInterval(TimerFunction, 1000)
    }});
