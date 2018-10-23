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