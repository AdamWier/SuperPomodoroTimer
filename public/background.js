function TimerFunction(minutes, seconds, type){
  let timerMinutes = minutes + 10;
  let timerSeconds = seconds;
  let timerType = type;
  return timerMinutes
     /*if (this.state.minutes > 0 || this.state.seconds > 0){
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
      }

chrome.runtime.onInstalled.addListener(function() {
    console.log("The color is green.");
  });


  chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
      if (request.message === "start"){
        /*var timerInterval = setInterval(TimerFunction(request.minutes, request.seconds, request.type), 1000)*/
        sendResponse({message: "hi to you", minutes: TimerFunction(request.minutes), seconds: 25});
    }});
