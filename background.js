function isEncoded(uri='') {
  return uri !== decodeURIComponent(uri);
}

function getUrls(url){
  return [ "https://google.com.ua" ] 
}

chrome.runtime.onInstalled.addListener(function() {
    console.log("BACKGROUND!!!!!!!", chrome);
});

chrome.browserAction.onClicked.addListener(function(tab) {
    console.log('Turning ' + tab.url);
    const [redirect] = getUrls(tab.url);
    chrome.tabs.update({url: redirect});
});

  function onNewTab({url}){
    console.log('URL', url, isEncoded(url));
    if(isEncoded(url)){
      chrome.browserAction.setIcon({path: '/icons/green.png'});
    }
  }

  chrome.tabs.onActivated.addListener(function(info){
    chrome.tabs.get(info.tabId, onNewTab);
  })