import h from '../handler';
import browser from './index';

browser.onNewTab(({ url }) => h.handleNewTab(url));
browser.onActionClick(({ url }) => h.handleAction(url));
