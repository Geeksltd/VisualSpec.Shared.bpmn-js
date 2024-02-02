const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        bundle: [ './src/index.js' ]
      },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bpmn.js',
        libraryTarget: "umd"
      },
   mode: 'production',
  plugins: [
    new CopyWebpackPlugin([
      { from: 'assets/**', to: 'vendor/bpmn-js', context: 'src/bpmn-js/dist/' },
      { from: '**/*.{html,css}', context: 'src/' }
    ])
  ],
  optimization: {
    minimize: true
  },
  devServer: {
  },
};