
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


### 参考资料
+ Webpack英文官网
+ Webpack中文官网
+ Webpack4 不深不浅的实践教程
+ [webpack之loader加载顺序为啥从右往左](https://blog.csdn.net/qq_37109325/article/details/80169289)