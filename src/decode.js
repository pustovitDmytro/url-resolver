const urlRegex = require('url-regex');

function fullyDecodeURI(uri) {
    while (isEncoded(uri)) {
        uri = decodeURIComponent(uri);
    }

    return uri;
}

export function isEncoded(uri = '') {
    return uri !== decodeURIComponent(uri);
}

export function getUrls(url) {
    const decoded = fullyDecodeURI(url);


    return decoded.match(urlRegex());
}
