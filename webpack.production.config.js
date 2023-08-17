const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        bundle: [ './src/bpmn.js' ]
      },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bpmn.js',
        libraryTarget: "umd"
      },
   mode: 'production',
  plugins: [
    new CopyWebpackPlugin([
      { from: 'assets/**', to: 'vendor/bpmn-js', context: 'node_modules/bpmn-js/dist/' },
      { from: '**/*.{html,css}', context: 'src/' }
    ])
  ],
  optimization: {
    minimize: true
  },
  devServer: {
  },
};