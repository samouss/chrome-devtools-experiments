import dependency from './dependency';
import { setup, postMessage } from './connection';

const hook = configuration => {
  setup();

  postMessage({
    ...configuration,
    ...dependency,
  });
};

// eslint-disable-next-line no-underscore-dangle
window.__DEVTOOLS_EXPERIMENTS_HOOK__ = hook;
