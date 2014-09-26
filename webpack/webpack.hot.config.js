var webpack = require("webpack");
var path = require("path");
module.exports = {
  devtool: "eval-source-map",

  context: __dirname, //  + "/../app/assets/javascripts",
  entry: [
    "webpack-dev-server/client?http://localhost:3000",
    "webpack/hot/dev-server",
    "./scripts/webpack_only",
    "./assets/javascripts/example"
  ],
  // Note, this file is not actually saved, but used by the express server
  output: {
    filename: "express-bundle.js",
    path: __dirname
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  // In case you wanted to load jQuery from the CDN, this is how you would do it:
  // externals: {
  //   jquery: "var jQuery"
  // },
  resolve: {
    root: [ path.join(__dirname, "scripts"), path.join(__dirname, "assets/javascripts"),
            path.join(__dirname, "assets/stylesheets") ],
    extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx", ".scss", ".css", "config.js"]
  },
  module: {
    loaders: [
      { ***REMOVED*** require.resolve("react"), loader: "expose?React" },
      { ***REMOVED*** /\.jsx$/, loaders: ["react-hot", "es6", "jsx?harmony"] },
      { ***REMOVED*** /\.css$/, loader: "style-loader!css-loader" },
      { ***REMOVED*** /\.scss$/, loader: "style!css!sass?outputStyle=expanded&imagePath=/assets/images"},

      // the url-loader uses DataUrls.
      // the file-loader emits files.
      { ***REMOVED*** /\.woff$/,   loader: "url-loader?limit=10000&minetype=application/font-woff" },
      { ***REMOVED*** /\.ttf$/,    loader: "file-loader" },
      { ***REMOVED*** /\.eot$/,    loader: "file-loader" },
      { ***REMOVED*** /\.svg$/,    loader: "file-loader" }
    ]
  }
};
