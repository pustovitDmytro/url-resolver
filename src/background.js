import { isEncoded, getUrls } from './decode';
import state, { setState } from './state';
import browser from './browser';
import { log } from './utils/decorators';
import logger from './logger';

const onNewTab = log()(
    async function onNewTab({ url }) {
        const encoded = await isEncoded(url);

        logger.info({ action: 'NEW_URL', active: state.active, encoded, url });
        if (!state.active && encoded) {
            await setState({ active: true });
            browser.changeIcon('/icons/green.png');
        }

        if (state.active && !encoded) {
            browser.changeIcon('/icons/blue.png');
        }
    }
);

const onActionClick = log()(
    async function onActionClick({ url }) {
        logger.info({ action: 'CLICKED_URL', active: state.active, url });

        if (state.active) {
            const [ newUrl ] = await getUrls(url);

            browser.redirect(newUrl);
        }
    }
);

browser.onNewTab(onNewTab);
browser.onActionClick(onActionClick);
