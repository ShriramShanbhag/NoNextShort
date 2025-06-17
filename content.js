// content.js

function stopAutoplayInShorts() {
    const isShortsPage = () => window.location.pathname.startsWith("/shorts");
    let enabled;
    chrome.storage.sync.get(["nns-enabled"], (result) => {
        enabled = result["nns-enabled"] ?? true;
      });

    const removeNextShorts = () => {
        const elements = document.querySelectorAll('.reel-video-in-sequence-new');

        elements.forEach(el => {
            if (el.id !== '0') {
                // el.remove();
                el.style.display = 'none';
            }
        });
    }

    const removeNavigation = () => {
        const nav = document.querySelector('.navigation-container');
        if(nav) 
            // nav.remove();
            nav.style.visibility = 'hidden';
    }
  
    const observeShorts = () => {
      const observer = new MutationObserver(() => {
        if (isShortsPage() && enabled) {
            removeNextShorts();
            removeNavigation();
        }
      });
  
      observer.observe(document.body, { childList: true, subtree: true });
  
      // Initial run in case we’re already on a Shorts page
      if (isShortsPage() && enabled) {
        removeNextShorts();
        removeNavigation();
      }
    };
  
    observeShorts();
  }

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "STORAGE_CHANGE") {
        enabled = message.newValue;
        window.location.reload();

    }
});

  
  stopAutoplayInShorts();
  