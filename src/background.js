const connections = new Map();

const isInteger = x => !Number.isNaN(parseInt(x, 10));
const extractTabIdFromPort = port =>
  (isInteger(port.name) ? parseInt(port.name, 10) : port.sender.tab.id);

const installContentScript = tabId => {
  chrome.tabs.executeScript(tabId, {
    file: './contentScript.js',
  });
};

// Setup the connection between:
//  - contentScript -> background -> DevTools
//  - DevTools -> background -> contentScript
const createChannel = (connections, devtools, contentScript) => {
  const devtoolsOnMessage = event => contentScript.postMessage(event);
  const contentScriptOnMessage = event => devtools.postMessage(event);
  const onDisconnect = port => {
    devtools.onMessage.removeListener(devtoolsOnMessage);
    contentScript.onMessage.removeListener(contentScriptOnMessage);

    devtools.onDisconnect.removeListener(onDisconnect);
    contentScript.onDisconnect.removeListener(onDisconnect);

    devtools.disconnect();
    contentScript.disconnect();

    connections.delete(extractTabIdFromPort(port));
  };

  devtools.onMessage.addListener(devtoolsOnMessage);
  contentScript.onMessage.addListener(contentScriptOnMessage);

  devtools.onDisconnect.addListener(onDisconnect);
  contentScript.onDisconnect.addListener(onDisconnect);
};

chrome.runtime.onConnect.addListener(port => {
  const isDevtoolsPort = isInteger(port.name);
  const tabId = extractTabIdFromPort(port);
  const tabName = isDevtoolsPort ? 'devtools' : 'contentScript';

  if (isDevtoolsPort) {
    installContentScript(tabId);
  }

  connections.set(tabId, {
    ...connections.get(tabId),
    [tabName]: port,
  });

  const devtoolsConnection = connections.get(tabId).devtools;
  const contentScriptConnection = connections.get(tabId).contentScript;

  if (devtoolsConnection && contentScriptConnection) {
    createChannel(connections, devtoolsConnection, contentScriptConnection);

    // Inform contentScript that the connections are ready
    contentScriptConnection.postMessage({ type: 'CONNECTION_READY' });
  }
});
