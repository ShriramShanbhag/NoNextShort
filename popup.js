// popup.js
document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("globalEnableDisable");
  const setButtonTextAndClass = (enabled) => {
    if(enabled) {
      button.textContent = "Disable NoNextShort";
      button.classList.remove('disabled');
    }
    else {
      button.textContent = "Enable NoNextShort";
      button.classList.add('disabled');
    }
  }
  let enabled;

  // Load saved setting
  chrome.storage.sync.get(["nns-enabled"], (result) => {
    enabled = result["nns-enabled"] ?? true
    setButtonTextAndClass(enabled);
  });

  button.addEventListener("click", () => {
    enabled = !enabled;
    chrome.storage.sync.set({ 'nns-enabled': enabled }, () => setButtonTextAndClass(enabled));
  });
});
