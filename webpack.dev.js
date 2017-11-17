const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const webpack = require('webpack');


console.log('development mode')
module.exports = merge(common, {
  //devtool: 'eval',
  devServer: {
    historyApiFallback: true,
    stats: {
      modules: false
    },
    host: process.env.HOST, // Defaults to `localhost`
    port: process.env.PORT, // Defaults to 8080
    contentBase: path.join(__dirname, './dist'),
    hot: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()
   ]
});
