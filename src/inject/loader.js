/* eslint-disable */
const script = document.createElement('script');
script.textContent = require('!raw-loader!../../dist/hook');
document.documentElement.appendChild(script);
script.parentNode.removeChild(script);
