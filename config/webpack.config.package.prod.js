var path = require('path');
var autoprefixer = require('autoprefixer');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');
var InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
var url = require('url');
var paths = require('./paths');
var getClientEnvironment = require('./env');

var entry = paths.component;
var buildLocation = paths.appBuild;
var srcLocation = paths.appSrc;

var publicUrl = '/';
// Get environment variables to inject into our app.
var env = getClientEnvironment(publicUrl);

// Assert this just to be safe.
// Development builds of React are slow and not intended for production.
if (env['process.env'].NODE_ENV !== '"production"') {
  throw new Error('Production builds must have NODE_ENV=production.');
}


var loaders = [
  // Babel enables the use of ES6 today by transpiling your ES6 JavaScript into equivalent ES5
  // source that is actually delivered to the end user browser.
  {
    test: /\.jsx?$/,
    loaders: [ 'babel' ],
    include: srcLocation
  },
];

// This is the production configuration.
// It compiles slowly and is focused on producing a fast and minimal bundle.
// The development configuration is different and lives in a separate file.
module.exports = {
  // Don't attempt to continue if there are any errors.
  bail: true,
  // We do not generate sourcemaps in production.
  // devtool: 'source-map',
  // In production, we only want to load the polyfills and the app code.
  entry: [
    entry
  ],
  // If you pass an array - the modules are loaded on startup. The last one is exported.
  output: {
    path: buildLocation,
    filename: 'react-horizontal-timeline.js',
    libraryTarget: 'commonjs2'
  },
  // Array of file extensions used to resolve modules.
  resolve: {
    // These are the reasonable defaults supported by the Node ecosystem.
    // We also include JSX as a common component filename extension to support
    // some tools, although we do not recommend using it, see:
    // https://github.com/facebookincubator/create-react-app/issues/290
    extensions: [ '', '.js', '.jsx' ]
  },

  // External dependencies don't need to be in our own dist
  externals: {
    'color': 'color',
    'radium': 'radium',
    'react': 'react',
    'react-icons': 'react-icons',
    'react-icon-base': 'react-icon-base',
    'react-motion': 'react-motion',
    'react-dimensions': 'react-dimensions',
  },
  plugins: [
    // Makes some environment variables available to the JS code, for example:
    // if (process.env.NODE_ENV === 'production') { ... }. See `./env.js`.
    // It is absolutely essential that NODE_ENV was set to production here.
    // Otherwise React will be compiled in the very slow development mode.
    new webpack.DefinePlugin(env),
    // This helps ensure the builds are consistent if source hasn't changed:
    new webpack.optimize.OccurrenceOrderPlugin(),
    // Try to dedupe duplicated modules, if any:
    new webpack.optimize.DedupePlugin(),
    // Minify the code.
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true, // React doesn't support IE8
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    })
  ],
  module: {
    loaders: loaders
  }
};
