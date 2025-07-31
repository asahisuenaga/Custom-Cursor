chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.create({ url: "https://docs.google.com/document/" });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    const isGoogleDocsTab = changeInfo.url.includes("docs.google.com/document") && /tab=t\.[a-zA-Z0-9]+/.test(changeInfo.url);

    if (isGoogleDocsTab) {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: () => {
          window.dispatchEvent(new CustomEvent('googleDocsTabSwitch', {
            detail: { url: window.location.href }
          }));
        }
      }).catch(err => {
        console.error('Failed to execute script:', err);
      });
    }
  }
});