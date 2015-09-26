// Run like this:
// cd client && npm run build:dev
// Note that Foreman (Procfile.dev) has also been configured to take care of this.

// NOTE: All style sheets handled by the asset pipeline in rails

const webpack = require('webpack');
const config = require('./webpack.common.config');

const devBuild = process.env.NODE_ENV !== 'production';

config.output = {
  filename: '[name].js',
  path: '../app/assets/javascripts/generated',
};

// You can add entry points specific to rails here
config.entry.vendor.push(
  './scripts/rails_only',
  'jquery',
  'jquery-ujs'
);
config.entry.app.push('./assets/javascripts/clientGlobals');

// See webpack.common.config for adding modules common to both the webpack dev server and rails

config.module.loaders.push(
  {***REMOVED*** /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader'},
  {***REMOVED*** require.resolve('jquery'), loader: 'expose?jQuery'},
  {***REMOVED*** require.resolve('jquery'), loader: 'expose?$'}
);

module.exports = config;

if (devBuild) {
  console.log('Webpack dev build for Rails'); // eslint-disable-line no-console
  module.exports.devtool = 'eval-source-map';
} else {
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.DedupePlugin()
  );
  console.log('Webpack production build for Rails'); // eslint-disable-line no-console
}
