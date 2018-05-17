const webpack = require('webpack');
const path = require('path');
var nodeExternals = require('webpack-node-externals')
var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/dist');
// See: https://stackoverflow.com/questions/37788142/webpack-for-back-end

const common = {
  context: __dirname + '/client',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'env']
        },
      },
    ],
  }
};

const client = {
  entry: './client.js',
  output: {
    path: DIST_DIR,
    filename: 'app.js'
  }
};

const server = {
  entry: './server.js',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: DIST_DIR,
    filename: 'app-server.js',
    libraryTarget: 'commonjs-module'
  }
};

module.exports = [
  Object.assign({}, common, client),
  Object.assign({}, common, server)
];