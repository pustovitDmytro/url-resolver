import { log } from './decorators';

const urlRegex = require('url-regex');

async function fullyDecodeURI(uri) {
    while (await isEncoded(uri)) {
        uri = decodeURIComponent(uri);// eslint-disable-line no-param-reassign
    }

    return uri;
}
export const isEncoded = log()(
    function isEncoded(uri = '') {
        return uri !== decodeURIComponent(uri);
    }
);

export const getUrls = log({ level: 'info' })(
    async function getUrls(url) {
        const decoded = await fullyDecodeURI(url);

        return decoded.match(urlRegex());
    }
);

