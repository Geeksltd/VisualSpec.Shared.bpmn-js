const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        bundle: [ './sample/app.js' ]
      },
    output: {
        path: __dirname + '/public',
        filename: 'bpmn.development.js',
      },
  module: {
    rules: [{
        test: /\.bpmn$/,
        use: 'raw-loader'
      }]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'assets/**', to: 'vendor/bpmn-js', context: 'node_modules/bpmn-js/dist/' },
      { from: '**/*.{html,css}', context: 'sample/' }
    ])
  ],
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
  },
  
};