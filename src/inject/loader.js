// eslint-disable-next-line import/no-webpack-loader-syntax
import hook from 'raw-loader!./hook';

// Handle loading the bundle sync
// script.textContent = require('raw-loader!./hook');
const script = document.createElement('script');
script.textContent = hook;
document.documentElement.appendChild(script);
script.parentNode.removeChild(script);
