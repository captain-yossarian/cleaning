const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var CompressionPlugin = require('compression-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

var APP_DIR = path.resolve(__dirname, './src');
module.exports = merge(common, {
  devtool: 'cheap-module-source-map',
  
  "resolve": {
     "alias": {
       "react": "preact-compat",
       "react-dom": "preact-compat"
     }
   },

  entry: {

    common: ['react', 'react-dom']

  },
  output: {
    filename: '[name].prod.app.js',
    chunkFilename: '[name].bundle.js'
  },
  stats: {
    modules: false
  },
  plugins: [

    new webpack.DefinePlugin({ //<--key to reduce React's size
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),

    new webpack.optimize.UglifyJsPlugin({minimize: true}),
    new CompressionPlugin({asset: "[path].gz[query]", algorithm: "gzip", test: /\.js$|\.css$|\.html$/, threshold: 10240, minRatio: 0.8}),

    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.optimize\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: {
        discardComments: {
          removeAll: true
        }
      },
      canPrint: true
    }),
    new webpack.optimize.CommonsChunkPlugin({name: 'common'}),
    /**
     * turn OFF  BundleAnalyzerPlugin if you use preact
     */
new BundleAnalyzerPlugin()
  ]
})
