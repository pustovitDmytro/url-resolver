const path = require('path');
const fs = require('fs-extra');

exports.getEntries = async function (src) {
    const entries = {};

    await Promise.all([ 'background', 'popup', 'content' ]
        .map(async (name) => {
            const entry = path.join(src, `${name}.js`);

            if (await fs.exists(entry)) {
                entries[name] = entry;
            }
        })
    );

    return entries;
};

