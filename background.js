// background.js

// Default state on install
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ enabled: true }, () => {
      console.log("Extension enabled by default");
    });
  });

  chrome.storage.onChanged.addListener((changes, area) => {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            if (tabs.length > 0) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    type: "STORAGE_CHANGE",
                    newValue: changes["nns-enabled"].newValue
                });
            }
        });
    
});

  