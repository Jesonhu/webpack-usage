const path = require('path')

const outFilePublicPath = typeof process.env.NODE_ENV !== 'undefined' && process.env.NODE_ENV === "production" 
  ? './dist'
  : ''
  
module.exports = {
  entry: {
    main: './src/index.js',
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    hot: true,
    host: '192.168.1.15',
  },
  module: {
    rules:[
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'assets/imgs/[name].[hash:7].[ext]',
              publicPath: outFilePublicPath
            }
          },
        ],
      }
    ]
  }
}