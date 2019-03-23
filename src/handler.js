import { isEncoded, getUrls } from './utils/decode';
import { log } from './utils/decorators';
import store from './store';
import browser from './browser';
import { ACTIVATE, DEACTIVATE, REDIRECT_STARTED, REDIRECT_FINISHED } from './store/actions';

const { dispatch } = store;

@log('Handler', { level: 'info' })
class Handler {
    async handleNewTab(url) {
        const encoded = await isEncoded(url);
        const { active } = store.state;

        if (!active && encoded) dispatch(ACTIVATE);
        if (active && !encoded) dispatch(DEACTIVATE);
    }

    async handleAction(url) {
        const { active } = store.state;

        if (active) {
            const [ newUrl ] = await getUrls(url);

            dispatch({ type: REDIRECT_STARTED, payload: newUrl });
        }
    }

    async handleRedirect(url) {
        browser.redirect(url);
        dispatch(REDIRECT_FINISHED);
        await this.handleNewTab(url);
    }
    async handleActivate() {
        browser.changeIcon('/icons/green.png');
    }
    async handleDeactivate() {
        browser.changeIcon('/icons/blue.png');
    }
}

export default new Handler();
