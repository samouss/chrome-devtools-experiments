const port = chrome.runtime.connect({
  name: 'contentScript',
});

const onMessageFromDevTools = (event, sender) => {
  console.group('onMessageFromDevTools');
  console.log(event);
  console.log(sender);
  console.groupEnd();
};

const onMessageFromPage = ({ source, data: message }) => {
  const isSameSource = source === window;
  const isFromExtension = message && message.source === 'chrome-devtools-experiments-hook';

  if (isSameSource && isFromExtension) {
    port.postMessage(message);
  }
};

const onDisconnect = port => {
  port.onMessage.removeListener(onMessageFromDevTools);
  port.onDisconnect.removeListener(onDisconnect);
  window.removeEventListener('message', onMessageFromPage);
  port.disconnect();
};

port.onMessage.addListener(onMessageFromDevTools);
port.onDisconnect.addListener(onDisconnect);

window.addEventListener('message', onMessageFromPage);
