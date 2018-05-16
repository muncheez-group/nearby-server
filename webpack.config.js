

// module.exports = {
//   entry: `${SRC_DIR}/app.jsx`,
//   output: {
//     filename: 'bundle.js',
//     path: DIST_DIR
//   },
//   module : {
//     loaders : [
//       {
//         test : /\.jsx?/,
//         include : SRC_DIR,
//         loader : 'babel-loader',      
//         query: {
//           presets: ['react', 'es2015']
//        }
//       },
//       {
//         test: /\.css$/,
//         use: ['style-loader','css-loader']
//       }
//     ]
//   }
// };

// var path = require('path')
// var webpack = require('webpack')
// var nodeExternals = require('webpack-node-externals')



// var browserConfig = {
//   entry: `${SRC_DIR}/app.jsx`,
//   output: {
//     filename: 'bundle.js',
//     path: DIST_DIR
//   },
//   module : {
//     loaders : [
//       {
//         test : /\.jsx?/,
//         include : SRC_DIR,
//         loader : 'babel-loader',      
//         query: {
//           presets: ['react', 'es2015']
//        }
//       },
//       {
//         test: /\.css$/,
//         use: ['style-loader','css-loader']
//       }
//     ]
//   }
// }

// var serverConfig = {
//   entry: __dirname + '/server/index.js',
//   target: 'node',
//   externals: [nodeExternals()],
//   output: {
//     path: __dirname,
//     filename: 'server.js',
//     publicPath: '/'
//   },
//   module: {
//     rules: [
//       { test: /\.(js)$/, use: 'babel-loader' }
//     ]
//   },
//   plugins: [
//     new webpack.DefinePlugin({
//       __isBrowser__: "false"
//     })
//   ]
// }

// module.exports = [browserConfig, serverConfig]

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
      {
        test: /\.css$/,
        use: ['style-loader','css-loader']
      }
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