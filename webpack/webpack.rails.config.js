// Run like this
// cd webpack && webpack -w --config webpack.rails.config.js

var path = require("path");
var railsBundleFile = "rails-bundle.js";
var railsJsAssetsDir = "../app/assets/javascripts";
var railsBundleMapFile = railsBundleFile + ".map";
var railsBundleMapRelativePath = "../../../public/assets/" + railsBundleMapFile;

module.exports = {
  context: __dirname,
  entry: [
    // to expose something Rails specific, uncomment the next line
    //"./scripts/rails_only",
    "./assets/javascripts/example",

    // Alternative for including everything with no customization
    'bootstrap-sass-loader'
    //
    // Example of using customization file
    //'bootstrap-sass!./bootstrap-sass.config.js'
    //
    // Example of using customization file with ExtractTextPlugin
    //"bootstrap-sass!./bootstrap-sass.extract-text-plugin.config.js"
  ],
  output: {
    filename: railsBundleFile,
    path: railsJsAssetsDir
  },
  // Let's load jQuery from the CDN or rails asset pipeline
  externals: {
    jquery: "var jQuery"
  },
  resolve: {
    root: [ path.join(__dirname, "scripts"), path.join(__dirname, "assets/javascripts")],
    extensions: ["", ".js", ".jsx"]
  },
  module: {
    loaders: [
      // **IMPORTANT** This is needed so that each bootstrap js file required by
      // bootstrap-sass-loader has access to the jQuery object
      { ***REMOVED*** /bootstrap-sass\/assets\/javascripts\//, loader: 'imports?jQuery=jquery' },
      { ***REMOVED*** /\.scss$/, loader: "style!css!sass?outputStyle=expanded&imagePath=/assets/images"},
      { ***REMOVED*** /\.woff$/,   loader: "url-loader?limit=10000&minetype=application/font-woff" },
      { ***REMOVED*** /\.ttf$/,    loader: "file-loader" },
      { ***REMOVED*** /\.eot$/,    loader: "file-loader" },
      { ***REMOVED*** /\.svg$/,    loader: "file-loader" },

      { ***REMOVED*** /\.jsx$/, loaders: ['es6', 'jsx?harmony'] },
      // Next 2 lines expose jQuery and $ to any JavaScript files loaded after rails-bundle.js
      // in the Rails Asset Pipeline. Thus, load this one prior.
      { ***REMOVED*** require.resolve("jquery"), loader: "expose?jQuery" },
      { ***REMOVED*** require.resolve("jquery"), loader: "expose?$" }
    ]
  }
};

var devBuild = (typeof process.env["BUILDPACK_URL"]) === "undefined";
if (devBuild) {
  console.log("Webpack dev build for rails");
  module.exports.devtool = "eval-source-map";
  module.exports.module.loaders.push(
    { ***REMOVED*** require.resolve("react"), loader: "expose?React" }
  );
} else {
  console.log("Webpack production build for rails");
}
