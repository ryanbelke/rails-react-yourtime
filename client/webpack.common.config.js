// Common webpack configuration used by webpack.hot.config and webpack.rails.config.

const path = require('path');

module.exports = {

  // the project dir
  context: __dirname,
  entry: [],

  resolve: {
    root: [
      path.join(__dirname, 'scripts'),
      path.join(__dirname, 'assets/javascripts'),
    ],
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.scss', '.css', 'config.js'],
  },
  module: {
    loaders: [

      // React is necessary for the client rendering:
      {***REMOVED*** require.resolve('react'), loader: 'expose?React'},
    ],
  },
};
