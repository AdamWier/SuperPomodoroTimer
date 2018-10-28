let timerMinutes = null;
let timerSeconds = null;
var timerInterval = null;
var timerType = "session";
var endPauseSound = new Audio("./pomodoro-end-break.wav");
var endSessionSound = new Audio("./pomodoro-end-session.wav");
var counter = 0;

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
      if (timerType == "session"){counter += 1}
      window.localStorage.removeItem("counter");
      window.localStorage.setItem("counter", counter);
      if (timerType == "session")
      {timerType = "pause";}
      else {timerType = "session";}
      window.localStorage.removeItem("timerType");
      window.localStorage.setItem("timerType", timerType);
      window.localStorage.removeItem("timerOn");
      window.localStorage.setItem("timerOn", false);
      chrome.runtime.sendMessage({message: "done"}, (response) => { 
      });
    }
   window.localStorage.removeItem("seconds");
   window.localStorage.setItem("seconds", timerSeconds); 
   window.localStorage.removeItem("minutes");
   window.localStorage.setItem("minutes", timerMinutes); 
      }

  chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
      if (request.message === "start"){
        timerMinutes = request.minutes;
        timerSeconds = request.seconds;
        timerInterval = setInterval(TimerFunction, 1000);
        timerType = request.type;
    }
  if (request.message === "stop"){
    clearInterval(timerInterval);
    window.localStorage.getItem("timerOn")
  }
if (request.message === "reset counter"){
  console.log("count reset")
  counter = 0
}});
