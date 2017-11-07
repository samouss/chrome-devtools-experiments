const script = document.createElement('script');
script.src = chrome.extension.getURL('hook.js');
script.onload = () => {
  window.postMessage({ source: 'chrome-devtools-experiments-loader' }, '*');
  script.parentNode.removeChild(script);
};
document.documentElement.appendChild(script);
