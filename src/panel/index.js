import React from 'react';
import { render } from 'react-dom';
import App from './App';
import './index.css';

const onMessageFromPage = event => {
  console.group('Panel: onMessageFromPage');
  console.log('Event', event);
  console.groupEnd();

  render(
    <App
      name={event.payload.name}
      version={event.payload.version}
    />,
    document.getElementById('root'),
  );
};

const onDisconnect = port => {
  port.onMessage.removeListener(onMessageFromPage);
  port.onDisconnect.removeListener(onDisconnect);

  port.disconnect();
};

const createListenerAndApp = () => {
  const port = chrome.runtime.connect({
    name: chrome.devtools.inspectedWindow.tabId.toString(),
  });

  port.onMessage.addListener(onMessageFromPage);
  port.onDisconnect.removeListener(onDisconnect);

  port.postMessage({
    source: 'chrome-devtools-experiments-panel',
    payload: {
      name: 'revert',
    },
  });

  render(
    <App />,
    document.getElementById('root'),
  );
};

chrome.devtools.network.onNavigated.addListener(createListenerAndApp);

createListenerAndApp();
