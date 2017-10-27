const hook = configuration => {
  const createMessage = payload => ({
    source: 'chrome-devtools-experiments-hook',
    payload,
  });

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
        console.log('flush queue');
      }
    }
  };

  setTimeout(() => {
    window.postMessage(createMessage(configuration), '*');
  }, 2500);

  window.addEventListener('message', onMessageFromDevTools);
};

const code = `
  window.__DEVTOOLS_EXPERIMENTS_HOOK__ = ${hook.toString()};
`;

const script = document.createElement('script');
script.textContent = code;
document.documentElement.appendChild(script);
script.parentNode.removeChild(script);
