chrome.runtime.onInstalled.addListener(function() {
    console.log("The color is green.");
  });


  chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
      if (request.message === "hi")
        sendResponse({message: "hi to you", minutes: 30, seconds: 25});
    });
