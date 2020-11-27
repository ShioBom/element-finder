/* globals chrome */
import { toggle } from "@/common";

chrome.commands.onCommand.addListener((command) => {
  if (command === "toggle-xpath") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
      toggle(tab[0]);
    });
  }
});

// chrome.tabs.onUpdated.addListener(getActiveTab);
// chrome.browserAction.onClicked.addListener(toggle);
