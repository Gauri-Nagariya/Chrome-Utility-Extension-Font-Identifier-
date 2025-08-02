// Add context menu when extension is installed
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "identify-font",
      title: "Identify Font",
      contexts: ["selection"]
    });
  });
  
  // When user clicks on the right-click menu
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "identify-font") {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: getFontInfo
      });
    }
  });
  
  // Function that runs inside the webpage to get font details
  function getFontInfo() {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;
  
    const range = selection.getRangeAt(0);
    const element = range.startContainer.parentElement;
    const styles = window.getComputedStyle(element);
  
    const fontDetails = {
      family: styles.fontFamily,
      size: styles.fontSize,
      weight: styles.fontWeight,
      style: styles.fontStyle
    };
  
    alert(
      `Font Family: ${fontDetails.family}\nFont Size: ${fontDetails.size}\nFont Weight: ${fontDetails.weight}\nFont Style: ${fontDetails.style}`
    );
  }
  