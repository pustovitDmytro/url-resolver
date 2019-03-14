import { isEncoded, getUrls } from './decode';
import state, { setState } from './state';

chrome.browserAction.onClicked.addListener(function (tab) {
    if (state.active) {
        const [ url ] = getUrls(tab.url);

        redirect(url);
    }
});

export function redirect(url) {
    chrome.tabs.update({ url });
}

function onNewTab({ url }) {
    if (!state.active && isEncoded(url)) {
        setState({ active: true });
        chrome.browserAction.setIcon({ path: '/icons/green.png' });
    }

    if (state.active && !isEncoded(url)) {
        chrome.browserAction.setIcon({ path: '/icons/blue.png' });
    }
}

chrome.tabs.onActivated.addListener(function (info) {
    chrome.tabs.get(info.tabId, onNewTab);
});
