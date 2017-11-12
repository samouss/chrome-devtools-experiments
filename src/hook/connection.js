const state = {
  isConnectionReady: false,
  queue: [],
};

const postMessageFromHook = payload =>
  window.postMessage({
    source: 'chrome-devtools-experiments-hook',
    payload,
  }, '*');

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

const postMessageIfConnectionIsReady = event => {
  if (!state.isConnectionReady) {
    state.queue.push(event);
  } else {
    postMessageFromHook(event);
  }
};

export const setup = () => {
  window.addEventListener('message', onMessageFromDevTools);
};

export { postMessageIfConnectionIsReady as postMessage };
