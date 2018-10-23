function TimerFunction(minutes, seconds, type, sendResponse){
  let timerMinutes = minutes;
  let timerSeconds = seconds;
  let timerType = type;
     if (timerMinutes > 0 || timerSeconds > 0){
      if (timerSeconds <= 0){
        timerMinutes -= 1;
        timerSeconds = 59;
      }
       else{
        seconds -= 1;
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
    sendResponse({message: "hi to you", displayMinutes: timerMinutes, timerSeconds: 25});
      }

chrome.runtime.onInstalled.addListener(function() {
    console.log("The color is green.");
  });


  chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
      if (request.message === "start"){
        TimerFunction(request.minutes, request.seconds, request.type, sendResponse)
        
    }});
