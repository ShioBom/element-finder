/* globals chrome browser */

const state = {
  loaded: {},
  injected: {},
};

var platform = typeof browser === "undefined" ? chrome : browser;

const toggleIn = ({ id: tab_id }) => {
  // toggle out: it's currently loaded and injected
  if (state.loaded[tab_id] && state.injected[tab_id]) {
    platform.tabs.executeScript(tab_id, { file: "content/eject.js" });
    state.injected[tab_id] = false;
  }

  // toggle in: it's loaded and needs injected
  else if (state.loaded[tab_id] && !state.injected[tab_id]) {
    platform.tabs.executeScript(tab_id, { file: "content/restore.js" });
    state.injected[tab_id] = true;
    // getColorMode();
  }

  // fresh start in tab
  else {
    // platform.tabs.insertCSS(tab_id, { file: "toolbar/bundle.css" });
    platform.tabs.executeScript(tab_id, { file: "content/inject.js" });

    state.loaded[tab_id] = true;
    state.injected[tab_id] = true;
    // getColorMode();
  }

  platform.tabs.onUpdated.addListener(function (tabId) {
    if (tabId === tab_id) state.loaded[tabId] = false;
  });
};
