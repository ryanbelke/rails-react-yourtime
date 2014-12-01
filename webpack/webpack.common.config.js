// Common webpack configuration used by webpack.hot.config and webpack.rails.config.

var path = require("path");

module.exports = {
  devtool: "eval-source-map",
  context: __dirname, // the project dir
  entry: [ "./assets/javascripts/example" ],
  // In case you wanted to load jQuery from the CDN, this is how you would do it:
  // externals: {
  //   jquery: "var jQuery"
  // },
  resolve: {
    root: [path.join(__dirname, "scripts"),
           path.join(__dirname, "assets/javascripts"),
           path.join(__dirname, "assets/stylesheets")],
    extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx", ".scss", ".css", "config.js"]
  },
  module: {
    loaders: [
      { ***REMOVED*** require.resolve("react"), loader: "expose?React" },
      { ***REMOVED*** /\.jsx$/, loaders: ["react-hot", "es6", "jsx?harmony"] },
      { ***REMOVED*** /\.css$/, loader: "style-loader!css-loader" },
      { ***REMOVED*** /\.scss$/, loader: "style!css!sass?outputStyle=expanded&imagePath=/assets/images"},

      // The url-loader uses DataUrls. The file-loader emits files.
      { ***REMOVED*** /\.woff$/,   loader: "url-loader?limit=10000&minetype=application/font-woff" },
      { ***REMOVED*** /\.ttf$/,    loader: "file-loader" },
      { ***REMOVED*** /\.eot$/,    loader: "file-loader" },
      { ***REMOVED*** /\.svg$/,    loader: "file-loader" }
    ]
  }
};
