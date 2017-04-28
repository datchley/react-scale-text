var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    root: [ './', './node_modules' ],
    extensions: ['', '.js']
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      exclude: /node_modules/,
      include: __dirname
    }, {
      test: /\.js$/,
      loader: 'babel',
      query: {
        babelrc: false,
        presets: ['es2015', 'react'],
        plugins: [
          "transform-object-rest-spread"
        ]
      },
      include: path.join(__dirname, '..', '..', 'src')
    }]
  }
};
