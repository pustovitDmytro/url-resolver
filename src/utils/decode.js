import { log } from './decorators';

const urlRegex = require('url-regex');

async function fullyDecodeURI(uri) {
    while (await isEncoded(uri)) {
        uri = decodeURIComponent(uri);// eslint-disable-line no-param-reassign
    }

    return uri;
}
export const isEncoded = log({ level: 'debug' })(
    function isEncoded(uri = '') {
        return uri !== decodeURIComponent(uri);
    }
);

export const getUrls = log({ level: 'info' })(
    function getUrls(url) {
        const decoded = fullyDecodeURI(url);

        return decoded.match(urlRegex());
    }
);

