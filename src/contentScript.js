import hook from './inject/hook';
import createProxy from './inject/proxy';

console.log('Hello from the contentScript!');

createProxy();

const code = `
  window.__DEVTOOLS_EXPERIMENTS_HOOK__ = ${hook.toString()};
`;

const script = document.createElement('script');
script.textContent = code;
document.documentElement.appendChild(script);
script.parentNode.removeChild(script);
