const webpack = require('webpack');
const path = require('path');

/*
 * We've enabled MiniCssExtractPlugin for you. This allows your app to
 * use css modules that will be moved into a separate CSS file instead of inside
 * one of your module entries!
 *
 * https://github.com/webpack-contrib/mini-css-extract-plugin
 *
 */
// 把less css scss文件分离：要使用mini-css-extract-plugin插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const OptimizeCss = require('optimize-css-assets-webpack-plugin');

module.exports = {
  mode: 'development',

  entry: './src/index.js',

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')

    // 关键在此项配置，需要配置为 "this", 默认为 "window"--至少在这里并没有什么用
    // globalObject: "this"        
  },

  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new OptimizeCss({
      cssProcessor: require('cssnano')
    }),
    new MiniCssExtractPlugin({
      path: path.resolve(__dirname, 'dist'),
      // filename: "[name].[chunkhash:8].css",
      filename: "main.css",
      chunkFilename: "[id].css"
    })
  ],

  module: {
    rules: [{
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
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: 'dist'
            }
          },
          // 如果使用 `MiniCssExtractPlugin.loader` 这里就不要使用了
          // 使用后会报错 `webpack ReferenceError: window is not defined`
          // {
          //   loader: 'style-loader',
          //   options: {
          //     sourceMap: true
          //   }
          // },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                // Notice: 这里要添加`{browsers:['last 2 versions']}`
                // 不添加不会添加前缀
                require('autoprefixer')({browsers:['last 2 versions']})
              ]
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: 'dist'
            }
          },
          // "style-loader",
          {loader: 'css-loader',options: {importLoaders: 2}},  //2代表css-loader后还需要几个loader
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('autoprefixer')({browsers:['last 2 versions']})
              ]
            }
          },
          'sass-loader'
        ]
      }
    ]
  },


}