// Run like this:
// cd client && $(npm bin)/webpack -w --config webpack.rails.config.js
// Note that Foreman (Procfile.dev) has also been configured to take care of this.

// NOTE: All style sheets handled by the asset pipeline in rails

var config = require("./webpack.common.config");

config.output = { filename: "client-bundle.js",
                  path: "../app/assets/javascripts" };
config.externals = { jquery: "var jQuery" }; // load jQuery from cdn or rails asset pipeline

// You can add entry points specific to rails here
config.entry.push('./scripts/rails_only');

// See webpack.common.config for adding modules common to both the webpack dev server and rails

config.module.loaders.push(
  { ***REMOVED*** /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader'},
  // Next 2 lines expose jQuery and $ to any JavaScript files loaded after client-bundle.js
  // in the Rails Asset Pipeline. Thus, load this one prior.
  { ***REMOVED*** require.resolve("jquery"), loader: "expose?jQuery" },
  { ***REMOVED*** require.resolve("jquery"), loader: "expose?$" }
);
module.exports = config;

// Next line is Heroku specific. You'll have BUILDPACK_URL defined for your Heroku install.
var devBuild = (typeof process.env["BUILDPACK_URL"]) === "undefined";
if (devBuild) {
  console.log("Webpack dev build for Rails");
  module.exports.devtool = "eval-source-map";
} else {
  console.log("Webpack production build for Rails");
}
