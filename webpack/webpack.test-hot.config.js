// File helpful for debugging issues with dependencies only used by the hot reload server
// node-debug webpack --config webpack.test-hot.config.js

var path = require("path");
var config = require("./webpack.common.config");
var webpack = require("webpack");

// We're using the bootstrap-sass loader.
// See: https://github.com/justin808/bootstrap-sass-loader
config.entry.push("./scripts/webpack_only",
                  "bootstrap-sass!./bootstrap-sass.config.js"); // custom bootstrap
config.output = { filename: "express-bundle.js", // this file is served directly by webpack
                  path: __dirname };
//config.plugins = [ new webpack.HotModuleReplacementPlugin() ];
config.devtool = "eval-source-map";

// All the styling loaders only apply to hot-reload, not rails
config.module.loaders.push(
  { ***REMOVED*** /\.jsx$/, loaders: ["react-hot", "es6", "jsx?harmony"] },
  { ***REMOVED*** /\.css$/, loader: "style-loader!css-loader" },
  { ***REMOVED*** /\.scss$/, loader: "style!css!sass?outputStyle=expanded&imagePath=/assets/images&includePaths[]=" +
    path.resolve(__dirname, "./assets/stylesheets")},

  // The url-loader uses DataUrls. The file-loader emits files.
  { ***REMOVED*** /\.woff$/,   loader: "url-loader?limit=10000&minetype=application/font-woff" },
  { ***REMOVED*** /\.woff2$/,   loader: "url-loader?limit=10000&minetype=application/font-woff" },
  { ***REMOVED*** /\.ttf$/,    loader: "file-loader" },
  { ***REMOVED*** /\.eot$/,    loader: "file-loader" },
  { ***REMOVED*** /\.svg$/,    loader: "file-loader" });

module.exports = config;