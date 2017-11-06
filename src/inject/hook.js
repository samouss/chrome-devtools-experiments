import dependency from './dependency';

const hook = configuration => {
  const state = {
    isConnectionReady: false,
    queue: [],
  };

  const postMessageFromHook = payload =>
    window.postMessage({
      source: 'chrome-devtools-experiments-hook',
      payload,
    }, '*');

  const postMessageIfConnectionIsReady = event => {
    if (!state.isConnectionReady) {
      state.queue.push(event);
    } else {
      postMessageFromHook(event);
    }
  };

  const onMessageFromDevTools = event => {
    const isSameSource = event.source === window;
    const isFromExtension = event.data && event.data.source === 'chrome-devtools-experiments-content-script';

    if (isSameSource && isFromExtension) {
      const { type, payload } = event.data;

      console.group('hook: onMessageFromDevTools');
      console.log('Type', type);
      console.log('Payload', payload);
      console.groupEnd();

      if (type === 'CONNECTION_READY') {
        state.queue.forEach(postMessageFromHook);

        state.isConnectionReady = true;
      }
    }
  };

  window.addEventListener('message', onMessageFromDevTools);

  postMessageIfConnectionIsReady({
    ...configuration,
    ...dependency,
  });
};

// eslint-disable-next-line no-underscore-dangle
window.__DEVTOOLS_EXPERIMENTS_HOOK__ = hook;
