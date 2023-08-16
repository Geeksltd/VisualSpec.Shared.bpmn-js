const path = require('path');
// const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        bundle: [ './src/bpmn.js' ]
      },
    output: {
        path: __dirname + '/dist',
        filename: 'bpmn.js',
      },
  module: {
    rules: [{
        test: /\.bpmn$/,
        use: 'raw-loader'
      }]
  },
  // plugins: [
  //   new CopyWebpackPlugin([
  //     { from: 'assets/**', to: 'vendor/bpmn-js', context: 'node_modules/bpmn-js/dist/' },
  //     { from: '**/*.{html,css}', context: 'app/' }
  //   ])
  // ],
  mode: 'production',
  devServer: {
  },
};