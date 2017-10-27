const hook = configuration => {
  const createMessage = payload => ({
    source: 'chrome-devtools-experiments-hook',
    payload,
  });

  setTimeout(() => {
    window.postMessage(createMessage(configuration), '*');
  }, 2500);
};

const code = `
  window.__DEVTOOLS_EXPERIMENTS_HOOK__ = ${hook.toString()};
`;

const script = document.createElement('script');
script.textContent = code;
document.documentElement.appendChild(script);
script.parentNode.removeChild(script);
