/* eslint-disable import/no-unresolved */

const script = document.createElement('script');
// eslint-disable-next-line
script.textContent = require('!raw-loader!../../dist/hook.js');
document.documentElement.appendChild(script);
script.parentNode.removeChild(script);
