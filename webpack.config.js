const path = require('path');
const webpack = require('webpack');

const src = path.join(__dirname, 'src');
const fs = require('fs-extra');
const CopyPlugin = require('copy-webpack-plugin');

const defaultEnv = {
    BROWSER : 'chrome',
    MODE    : 'development'
};

module.exports = (localEnv = {}) => {
    const env = {
        ...defaultEnv,
        ...process.env,
        ...localEnv
    };
    const browser = env.BROWSER;

    console.log('USING BROWSER:', browser);
    console.log('USING MODE:', env.MODE);

    const dist = path.join(__dirname, 'dist', browser);
    const entries = {};

    [ 'background', 'popup', 'content' ]
        .forEach(name => {
            const entry = path.join(src, `${name}.js`);

            if (fs.existsSync(entry)) {
                entries[name] = entry;
            }
        });

    return {
        mode    : env.MODE,
        entry   : entries,
        devtool : 'cheap-module-source-map',
        watch   : true,
        node    : {
            fs : 'empty'
        },
        watchOptions : {
            ignored : /node_modules/
        },
        output : {
            path     : dist,
            filename : '[name].js'
        },
        module : {
            rules : [
                {
                    test    : /\.js$/,
                    exclude : /node_modules/,
                    use     : [
                        'babel-loader',
                        {
                            loader  : 'eslint-loader',
                            options : {
                                emitWarning : true
                            }
                        }
                    ]
                }
            ]
        },
        // externals : {
        //     'fs'       : 'require("fs")',
        // },
        plugins : [
            new webpack.DefinePlugin({
                BROWSER       : JSON.stringify(browser),
                DEBUG         : JSON.stringify(true),
                'process.env' : {
                    NODE_ENV : JSON.stringify(env.MODE || 'development')
                }

            }),
            new CopyPlugin([
                { from: path.join(src, 'manifest.json'), to: dist },
                { from: path.join(src, 'icons'), to: path.join(dist, 'icons') }
            ])
        ]
    };
};
