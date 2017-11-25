const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
var APP_DIR = path.resolve(__dirname, './src');
var BUILD_DIR = path.resolve(__dirname, './dist');

var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

module.exports = {
  entry: {
    main: [
      "babel-polyfill", APP_DIR + '/index.jsx'
    ]
  },
   devtool: 'inline-source-map',
  output: {
    path: BUILD_DIR,
    filename: '[name].app.js',
    chunkFilename: '[name].bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        include: APP_DIR,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: "css-loader",
              options: {
                modules: true,
                importLoaders: 3,
                localIdentName: '[local]___[hash:base64:5]',
                //  sourceMap: true,
                minimize: true
              }
            }, {
              loader: "postcss-loader",
              options: {
                //  sourceMap: true
              }
            }, {
              loader: "sass-loader",
              options: {
                //  sourceMap: true
              }
            }, {
              /*you don't need to import mixins inside each sass file
               * if there will be more then 1 path, create array of strings, resources:['path1','path2']*/
              loader: 'sass-resources-loader',
              options: {
                resources: APP_DIR + '/style/mixin.scss',
                sourceMap: true
              }
            }
          ]
        })
      }, {
        test: /\.bundle\.js$/,
        loader: 'bundle-loader',
        options: {
          name: 'my-chunk'
        }
      }, {
        test: /\worker\.js$/,
        include: APP_DIR,
        use: {
          loader: 'worker-loader',
          options: {
            name: '[id].worker'
          }
        }
      }, {
        test: /\.(js|jsx)$/,
        include: APP_DIR,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              'env', 'react'
            ],
            plugins: ["syntax-dynamic-import", "lodash"]
          }
        }
      }, {
        test: /\.ts$/,
        use: 'ts-loader',
        include:APP_DIR,
        exclude: /node_modules/
      }, {
        test: /\.(jpg|png|svg)$/,
        include: APP_DIR,
        loader: 'file-loader'
      }, {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        include: APP_DIR,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      }, {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        include: APP_DIR,
        loader: 'file-loader'
      }
    ]
  },
  resolve:{
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  /*Lodash plugin does not work korectly, bug with _.filter, new LodashModuleReplacementPlugin()
   *github issue=> https://github.com/gajus/react-css-modules/issues/131*/
  plugins: [new ExtractTextPlugin({filename: "style.css", allChunks: true})]
}
