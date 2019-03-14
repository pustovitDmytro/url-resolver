const path = require('path');
const webpack = require('webpack');

const src = path.join(__dirname, 'src');
const fs = require('fs-extra');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env = {}, argv) => {
    const browser = env.BROWSER || 'chrome';
    const dist = path.join(__dirname, 'dist', browser);
    const mode = 'development';
    const entries = {};

    [ 'background', 'popup', 'content' ]
        .forEach(name => {
            const entry = path.join(src, `${name}.js`);

            if (fs.existsSync(entry)) {
                entries[name] = entry;
            }
        });

    return {
        mode,
        entry        : entries,
        watch        : true,
        devtool      : 'cheap-module-source-map',
        watchOptions : {
            ignored : /node_modules/
        },
        output : {
            path     : dist,
            filename : '[name].js'
        },
        plugins : [
            new webpack.DefinePlugin({
                BROWSER    : JSON.stringify(browser),
                PRODUCTION : mode === 'production'
            }),
            new CopyPlugin([
                { from: path.join(src, 'manifest.json'), to: dist },
                { from: path.join(src, 'icons'), to: path.join(dist, 'icons') }
            ])
        ]
    };
};
