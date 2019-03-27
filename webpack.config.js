
const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const { getEntries } = require('./tools/webpackUtils');

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
    const isProduction = env.MODE === 'production';
    const browser = env.BROWSER;
    const dist = path.join(__dirname, 'dist', browser);
    const entries = await getEntries(src);

    console.log('USING BROWSER:', browser);
    console.log('USING MODE:', env.MODE);

    const common = {
        mode   : env.MODE,
        entry  : entries,
        watch  : !isProduction,
        node   : false,
        output : {
            path     : dist,
            filename : '[name].js'
        },
        module : {
            rules : [
                {
                    test    : /\.js$/,
                    exclude : /node_modules/,
                    use     : [ 'babel-loader' ]
                }
            ]
        },
        plugins : [
            new webpack.DefinePlugin({
                'process.env' : {
                    NODE_ENV  : JSON.stringify(env.MODE),
                    BROWSER   : JSON.stringify(browser),
                    LOG_LEVEL : JSON.stringify(isProduction ? 'error' : 'debug')
                }

            }),
            new CopyPlugin([
                { from: path.join(src, 'manifest.json'), to: dist },
                { from: path.join(src, 'icons'), to: path.join(dist, 'icons') }
            ])
        ]
    };

    if (!isProduction) {
        common.devtool = 'cheap-module-source-map';
        common.watchOptions = {
            ignored : /node_modules/
        };
        common.module.rules[0].use.push({
            loader  : 'eslint-loader',
            options : {
                emitWarning : true
            }
        });
    }

    return common;
};
