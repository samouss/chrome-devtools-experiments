import React from 'react';
import { render } from 'react-dom';
import './index.css';

const run = () => {
  // eslint-disable-next-line
  window.__DEVTOOLS_EXPERIMENTS_HOOK__ && window.__DEVTOOLS_EXPERIMENTS_HOOK__({
    name: 'react-sandox',
    version: '1.3.0',
  });

  const App = () => (
    <div>
      Hello from the example...
    </div>
  );

  render(
    <App />,
    document.getElementById('root'),
  );
};

window.addEventListener('message', ({ source, data: message }) => {
  const isSameSource = source === window;
  const isFromExtensionLoader = message && message.source === 'chrome-devtools-experiments-loader';

  if (isSameSource && isFromExtensionLoader) {
    run();
  }
});
