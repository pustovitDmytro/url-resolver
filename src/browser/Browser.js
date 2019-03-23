import { log } from '../utils/decorators';

@log()
class Browser {
    constructor(client) {
        this.client = client;
    }
    redirect(url) {
        this.client.tabs.update({ url });
    }
    onNewTab(func) {
        this.client.tabs.onActivated.addListener(info => {
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

export default Browser;

