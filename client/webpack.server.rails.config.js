// Common webpack configuration for server bundle

const webpack = require('webpack');

module.exports = {

  // the project dir
  context: __dirname,
  entry: ['./app/startup/serverGlobals'],
  output: {
    filename: 'server-bundle.js',
    path: '../app/assets/javascripts/generated',
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', 'config.js'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
  module: {
    loaders: [
      {***REMOVED*** /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/},

      // React is necessary for the client rendering:
      {***REMOVED*** require.resolve('react'), loader: 'expose?React'},
      {***REMOVED*** require.resolve('react-dom/server'), loader: 'expose?ReactDOMServer'},
    ],
  },
};
