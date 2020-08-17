const {merge} = require('webpack-merge')
const baseConfig = require('./webpack.base.config.js')
const devConfig = require('./webpack.dev.config.js')
const proConfig = require('./webpack.pro.config.js')

module.exports = (env, argv) => {
    let config = argv.mode === 'development' ? devConfig : proConfig;
    return merge(baseConfig, config);
};