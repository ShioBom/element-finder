/* globals chrome */
let tabs = {};
const inspectFile = "static/js/content.js";
const activeIcon = "active-64.png";
const defaultIcon = "default-64.png";

const inspect = {
  toggleActivate: (id, type, icon) => {
    chrome.tabs.executeScript(id, { file: inspectFile }, () => {
      chrome.tabs.sendMessage(id, { action: type });
    });
    chrome.browserAction.setIcon({
      tabId: id,
      path: { 19: "icons/" + icon },
    });
  },
};

function isSupportedProtocolAndFileType(urlString) {
  if (!urlString) {
    return false;
  }
  const supportedProtocols = ["https:", "http:", "file:"];
  const notSupportedFiles = ["xml", "pdf", "rss"];
  const extension = urlString.split(".").pop().split(/\#|\?/)[0];
  const url = document.createElement("a");
  url.href = urlString;
  return (
    supportedProtocols.indexOf(url.protocol) !== -1 &&
    notSupportedFiles.indexOf(extension) === -1
  );
}

function toggle(tab) {
  if (isSupportedProtocolAndFileType(tab.url)) {
    if (!tabs[tab.id]) {
      tabs[tab.id] = Object.create(inspect);
      inspect.toggleActivate(tab.id, "activate", activeIcon);
    } else {
      inspect.toggleActivate(tab.id, "deactivate", defaultIcon);
      for (const tabId in tabs) {
        if (tabId === tab.id) delete tabs[tabId];
      }
    }
  }
}

function close(tab) {
  if (isSupportedProtocolAndFileType(tab.url)) {
    inspect.toggleActivate(tab.id, "deactivate", defaultIcon);
    tabs = {};
    if (tabs[tab.id]) {
      for (const tabId in tabs) {
        if (tabId === tab.id) delete tabs[tabId];
      }
    } else {
    }
  }
}

function deactivateItem(tab) {
  if (tab) {
    if (isSupportedProtocolAndFileType(tab.url)) {
      for (const tabId in tabs) {
        if (tabId === tab.id) {
          delete tabs[tabId];
        }
        inspect.toggleActivate(tab.id, "deactivate", defaultIcon);
      }
    }
  }
}

function getActiveTab() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
    deactivateItem(tab);
  });
}

export { getActiveTab, deactivateItem, toggle, close, inspect };
