// Common webpack configuration used by webpack.hot.config and webpack.rails.config.

const webpack = require('webpack');
const path = require('path');

module.exports = {

  // the project dir
  context: __dirname,
  entry: {
    vendor: [],
    app: [],
  },
  resolve: {
    root: [
      path.join(__dirname, 'scripts'),
      path.join(__dirname, 'assets/javascripts'),
    ],
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.scss', '.css', 'config.js'],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      chunks: ['app'],
      filename: 'vendor.js',
      minChunks: Infinity,
    }),
  ],
  module: {
    loaders: [

      // React is necessary for the client rendering:
      {***REMOVED*** require.resolve('react'), loader: 'expose?React'},
    ],
  },
};
