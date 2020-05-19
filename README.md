
+ `npm init -y` 快速生成 `package.json`
+ 本地安装 `webpack webpack-cli`: `npm i webpack webpack-cli -D`
+ 本地安装 `babel-core` `babel-loader`: `babel-loader` 需要安装 `babel-core`
  > babel-loader@8 requires Babel 7.x (the package '@babel/core'). If you'd like to use Babel 6.x ('babel-core'), you should install 'babel-loader@7'.
+ 本地安装 `css-loader` `style-loader`
+ 处理scss: `node-sass sass-loader scss`

### 编译
```bash
# webpck --mode=development
npm run dev
```

## 案例目录规划

+ 单入口文件
+ 多入口文件
+ Babel-loader 使用
+ CSS-loader 使用
+ Image loader 使用
+ CSS Module
+ less loader
+ scss loader
+ less scss loader
+ typescript 支持
+ UglifyJs 插件
+ Html 插件
+ Html 插件与浏览器打开插件
+ 环境变量
+ 代码分割
+ 代码分割与 bundle-loader
+ 公共 chunk
+ 第三方库分割
+ 导出全局变量



### 参考资料

+ [Webpack英文官网](https://webpack.js.org/concepts/)
  + [mini-css-extract-plugin](https://webpack.js.org/plugins/mini-css-extract-plugin/)
  + [postcss-loader--autoprefixing](https://webpack.js.org/loaders/postcss-loader/#autoprefixing)
+ [Webpack中文网](https://www.webpackjs.com/concepts/)
+ Webpack4 不深不浅的实践教程
+ [webpack之loader加载顺序为啥从右往左](https://blog.csdn.net/qq_37109325/article/details/80169289)
+ [webpack4使用optimize-css-assets-webpack-plugin压缩单独的css文件](https://blog.csdn.net/weixin_36185028/article/details/82182352)
+ [webpack进阶之插件篇](https://www.cnblogs.com/grimm/p/5772444.html)
+ [PostCSS及其常用插件介绍--cssnano](http://www.css88.com/archives/7317)
+ [webpack-demos by ruanyf](https://github.com/ruanyf/webpack-demos)