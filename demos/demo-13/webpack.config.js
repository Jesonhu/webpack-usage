const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const pkgConfig = require('./package.json')

const isDevMode = process.env.NODE_ENV !== 'production'

// 绝对路径
// const outFilePublicPath = !isDevMode ? '/assets/imgs/' : ''

// 相对路径
const outFilePublicPath = !isDevMode ? '/assets/img/' : ''

// 开发环境 style-loader 与生产环境 MiniCssExtractPlugin 配置
const cssUseConfig = () => {
  if (isDevMode) {
    return {
      loader: 'style-loader'
    }
  } else {
    return {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: '../imgs/',
        outputPath: 'assets/css/'
      }
    }
  }
}

module.exports = {
  entry: {
    main: './src/index.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    hot: true,
    host: '192.168.1.15',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: pkgConfig.name,
      template: './index.html', // 模板文件位置
      filename: 'index.html',   // 打包后生成的文件
      hash: true,               // 添加 hash 值解决缓存问题
      minify: {
        removeAttributeQuotes: true,  // 删除属性双引号
        collapseWhitespace: true      // 折叠空行变成一行
      }
    }),
    new HtmlWebpackPlugin({     // 生成 debug.html
      title: `Debug Page - ` + pkgConfig.name,
      template: './index.html', // 模板文件位置
      filename: 'debug.html',   // 打包后生成的文件
      hash: false,              // 添加 hash 值解决缓存问题
      minify: {
        removeAttributeQuotes: false,  // 删除属性双引号
        collapseWhitespace: false      // 折叠空行变成一行
      }
    }),
    new MiniCssExtractPlugin({
      filename: isDevMode ? 'assets/css/[name].css' : 'assets/css/[name].[hash:7].css',
      chunkFilename: isDevMode ? 'assets/css/[id].css' : 'assets/css/[id].[hash:7].css',
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'common',    //提取出来的文件命名
          chunks: 'initial',  //initial表示提取入口文件的公共部分
          minChunks: 2,       //表示提取公共部分最少的文件数
          minSize: 0          //表示提取公共部分最小的大小
        }
      }
    },
  },
  module: {
    rules:[
      {
        test: /\.css$/,
        use: [
          cssUseConfig(),
          { loader: 'css-loader' }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[name].[hash:7].[ext]',
              publicPath: outFilePublicPath,
              outputPath: 'assets/img/',
              // The `mimetype` and `encoding` arguments will be obtained from your options
              // The `resourcePath` argument is path to file.
              generator: (content, mimetype, encoding, resourcePath) => {
                console.log('===== generator =====', mimetype, resourcePath)
                if (/\.html$/i.test(resourcePath)) {
                  return `data:${mimetype},${content.toString()}`;
                }

                return `data:${mimetype}${
                  encoding ? `;${encoding}` : ''
                },${content.toString(encoding)}`;
              }
            }
          },
        ],
      }
    ]
  }
}