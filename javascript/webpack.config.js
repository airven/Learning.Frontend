var webpack = require("webpack")
var path = require('path')
module.exports = {
    devtool:'eval-source-map',
    entry: __dirname + '/ES6/c.js',
    output: {
        path: __dirname + '/ES6',
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query:
                {
                    presets: ['es2015'],
                    plugins: ['transform-runtime']
                }
            }
        ]
    },
    devServer:{
        contentBase:"./public",
        colors:true,
        historyapiFallback:true,
        inline:true
    }
}