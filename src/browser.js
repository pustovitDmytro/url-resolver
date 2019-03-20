import { log } from './utils/decorators';

@log('Browser')
class Browser {
    constructor(client) {
        this.client = client;
    }
    redirect(url) {
        this.client.tabs.update({ url });
    }
    onNewTab(func) {
        this.client.tabs.onActivated.addListener(function (info) {
            this.client.tabs.get(info.tabId, func);
        });
    }
    onActionClick(func) {
        this.client.browserAction.onClicked.addListener(func);
    }
    changeIcon(path) {
        this.client.browserAction.setIcon({ path });
    }
}

export default new Browser(BROWSER === 'firefox' ? browser : chrome); // eslint-disable-line no-undef

