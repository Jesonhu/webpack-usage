const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'development',

  entry: './src/index.js',

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: { sourceMap: true }
          },
          { loader: 'css-loader' }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          // MiniCssExtractPlugin.loader,
          "style-loader",
          "css-loader",
          'sass-loader'
        ]
      }
    ]
  }
}