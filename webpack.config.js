var path = require('path');
var minify = process.env.MINIFY || false;

module.exports = {
  entry: {
    'react-stamp': ['./src/index'],
  },

  output: {
    path: path.resolve('./dist'),
    filename: minify ? '[name].min.js' : '[name].js',
    library: 'reactStamp',
    libraryTarget: 'umd',
  },

  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader' },
    ],
  },
};
