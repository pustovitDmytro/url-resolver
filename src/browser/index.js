import Browser from './Browser';

const { BROWSER } = process.env;
const client = BROWSER === 'firefox' ? browser : chrome; // eslint-disable-line no-undef

export default new Browser(client);

