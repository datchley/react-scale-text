'use strict';
const path  = require('path');

var webpack = require('webpack');

var plugins = [
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  })
];

let fileName = 'react-scale-text.js';
let exportName = 'ScaleText';
let devTool = 'cheap-module-source-map';

if (process.env.NODE_ENV === 'production') {
  fileName = 'react-scale-text.min.js';
  devTool = 'source-map';
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      }
    })
  );
}

module.exports = {
  entry: __dirname + '/src/index.js',
  devtool: devTool,
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/
    }]
  },
  output: {
    path: __dirname + '/lib',
    filename: fileName,
    library: exportName,
    libraryTarget: 'umd'
  },
  plugins: plugins,
  resolve: {
    modules: [ path.resolve(__dirname, './src'), "node_modules" ],
    extensions: ['.js']
  },
  externals: {
    'react': {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
      umd: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
      umd: 'react-dom'
    }
  }
};
