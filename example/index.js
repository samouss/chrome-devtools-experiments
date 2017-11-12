import React from 'react';
import { render } from 'react-dom';
import App from './App';
import './index.css';

const run = () => {
  // eslint-disable-next-line
  window.__DEVTOOLS_EXPERIMENTS_HOOK__ && window.__DEVTOOLS_EXPERIMENTS_HOOK__({
    name: 'react-sandox',
    version: '1.3.0',
  });

  render(
    <App />,
    document.getElementById('root'),
  );
};

if (process.env.EXTENSION_ENV !== 'production') {
  // eslint-disable-next-line
  const isHookAlreadyLoaded = !!window.__DEVTOOLS_EXPERIMENTS_HOOK__;

  if (!isHookAlreadyLoaded) {
    // The hook could be laad before the page but it could be load after only
    // in development mode so we need to plug a listener on the loader message
    // in order to run the App after the hook load
    window.addEventListener('message', ({ source, data: message }) => {
      const isSameSource = source === window;
      const isFromExtensionLoader = message && message.source === 'chrome-devtools-experiments-loader';

      if (isSameSource && isFromExtensionLoader) {
        run();
      }
    });
  } else {
    run();
  }
} else {
  run();
}
