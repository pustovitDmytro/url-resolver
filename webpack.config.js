const path = require('path');
const webpack = require('webpack');
const fs = require('fs-extra');
const CopyPlugin = require('copy-webpack-plugin');

const src = path.join(__dirname, 'src');

const defaultEnv = {
    BROWSER : 'chrome',
    MODE    : 'development'
};

module.exports = async (localEnv = {}) => {
    const env = {
        ...defaultEnv,
        ...process.env,
        ...localEnv
    };
    const browser = env.BROWSER;


    const dist = path.join(__dirname, 'dist', browser);
    const entries = {};

    await Promise.all([ 'background', 'popup', 'content' ]
        .map(async (name) => {
            const entry = path.join(src, `${name}.js`);

            if (await fs.exists(entry)) {
                entries[name] = entry;
            }
        })
    );

    console.log('USING BROWSER:', browser);
    console.log('USING MODE:', env.MODE);

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
        plugins : [
            new webpack.DefinePlugin({
                'process.env' : {
                    NODE_ENV : JSON.stringify(env.MODE),
                    BROWSER  : JSON.stringify(browser),
                    DEBUG    : JSON.stringify('1')
                }

            }),
            new CopyPlugin([
                { from: path.join(src, 'manifest.json'), to: dist },
                { from: path.join(src, 'icons'), to: path.join(dist, 'icons') }
            ])
        ]
    };
};
