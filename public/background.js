// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

var TimerFunction = /*Timer mechanism*/
function TimerFunction(minutes, seconds, type, sendResponse){
  let timerMinutes = minutes;
  let timerSeconds = seconds;
  let timerType = type;
   if (minutes > 0 || seconds > 0){
    if (seconds <= 0){
      timerMinutes -= 1;
      timerSeconds = 59;
      sendResponse({displayMinutes: timerMinutes, displaySeconds: seconds, message: "hello"});
      }
     else{
       timerSeconds -= 1;
       sendResponse({displayMinutes: timerMinutes, displaySeconds: timerSeconds, message: "hello"});
    }
    }
  /*else{
    clearInterval(timerInterval);
    switch (type){
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
        /*var timerInterval = setInterval(TimerFunction(request.minutes, request.seconds, request.type, sendResponse), 1000);*/
        sendResponse({message: "hi to you"});
      }
    });
