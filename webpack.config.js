const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        bundle: [ './app/app.js' ]
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
  plugins: [
    new CopyWebpackPlugin([
      { from: 'assets/**', to: 'vendor/bpmn-js', context: 'node_modules/bpmn-js/dist/' },
      { from: '**/*.{html,css}', context: 'app/' }
    ])
  ],
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    // static: [
    //   {
    //     directory: path.join(__dirname, "dist"),
    //     publicPath: "/dist",
    //     watch: true,
    //   },
    // ],
    // devMiddleware: {
    //   writeToDisk: true,
    // },
    // liveReload: true,
  //server: "http",
  // host: "localhost",
  port: "8080",
  hot: true,
  contentBase:path.join(__dirname,"dist")
  // open: true,
  // historyApiFallback: true,
  // inline: true,
  // publicPath: '/',
    },
  
};