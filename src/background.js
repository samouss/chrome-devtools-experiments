// Enable the connection with the DevTools
// Trigger when the DevTools create a connection
chrome.runtime.onConnect.addListener(port => {
  console.log('Back:port - onConnect');

  // Trigger when the DevTools post a message
  port.onMessage.addListener(event => {
    console.log('Back:port - onMessage', event);
  });
});

// Enable the connection with the contentScript
// Trigger when the contentScript post a message
chrome.runtime.onMessage.addListener(() => {
  console.log('Back:runtime - onMessage');
});
