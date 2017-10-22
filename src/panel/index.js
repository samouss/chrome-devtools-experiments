import React from 'react';
import { render } from 'react-dom';
import App from './App';
import './index.css';

console.log('Hello from panel');

const port = chrome.runtime.connect({
  name: 'my-panel',
});

port.onMessage.addListener(() => {
  console.log('Panel - onMessage');
});

port.postMessage({
  tabId: chrome.devtools.inspectedWindow.tabId,
});

render(
  <App />,
  document.getElementById('root'),
);
