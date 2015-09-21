// Run like this:
// cd client && node server.js

const path = require('path');
const config = require('./webpack.common.config');
const webpack = require('webpack');

// We're using the bootstrap-sass loader.
// See: https://github.com/shakacode/bootstrap-sass-loader
config.entry.push('webpack-dev-server/client?http://localhost:3000',
  'webpack/hot/dev-server',
  './scripts/webpack_only',
  'jquery',
  'jquery-ujs',
  './assets/javascripts/clientGlobals',

  // custom bootstrap
  'bootstrap-sass!./bootstrap-sass.config.js');
config.output = {

  // this file is served directly by webpack
  filename: 'express-bundle.js',
  path: __dirname,
};
config.plugins = [new webpack.HotModuleReplacementPlugin()];
config.devtool = 'eval-source-map';

// Add the styles
config.resolve.root.push(path.join(__dirname, 'assets/stylesheets'));

// All the styling loaders only apply to hot-reload, not rails
config.module.loaders.push(
  {***REMOVED*** /\.jsx?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/},

  {***REMOVED*** require.resolve('jquery'), loader: 'expose?jQuery'},
  {***REMOVED*** require.resolve('jquery'), loader: 'expose?$'},

  {***REMOVED*** /\.css$/, loader: 'style-loader!css-loader'},
  {
    ***REMOVED*** /\.scss$/,
    loader: 'style!css!sass?outputStyle=expanded&imagePath=/assets/images&includePaths[]=' +
    path.resolve(__dirname, './assets/stylesheets'),
  },

  // The url-loader uses DataUrls. The file-loader emits files.
  {***REMOVED*** /\.woff$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff'},
  {***REMOVED*** /\.woff2$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff'},
  {***REMOVED*** /\.ttf$/, loader: 'file-loader'},
  {***REMOVED*** /\.eot$/, loader: 'file-loader'},
  {***REMOVED*** /\.svg$/, loader: 'file-loader'});

module.exports = config;
