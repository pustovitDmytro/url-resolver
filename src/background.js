import { isEncoded, getUrls } from './decode';
import state, { setState } from './state';
import browser from './browser';

function onNewTab({ url }) {
    if (!state.active && isEncoded(url)) {
        setState({ active: true });
        browser.changeIcon('/icons/green.png');
    }

    if (state.active && !isEncoded(url)) {
        browser.changeIcon('/icons/blue.png');
    }
}

function onActionClick({ url }) {
    if (state.active) {
        const [ newUrl ] = getUrls(url);

        browser.redirect(newUrl);
    }
}

browser.onNewTab(onNewTab);
browser.onActionClick(onActionClick);
