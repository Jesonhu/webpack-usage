# webpack 使用记录.

## 命令说明

```cmd
webpack-dev-server --open
```
使用 `webpack-dev-server` 开启一个带有热更新的服务。执行这个命令将不会在目录结构生成 output 文件，但是会在内存中生成这个文件。`--open` 每次命令执行都会打开一个新窗口

如果 `webpack.config.js` 中没有配置 `devServer` 属性。生成的文件将位于根目录也就是 `webpack.config.js` 的同级目录.

```cmd
webpack -p
```

根据 webpack.config.js 生成对应的文件.默认在 `./dist` 目录中生成。命令更多说明请点击[这里](https://www.jianshu.com/p/ce4b9d7b9da4)

修改了 `webpack.config.js` 配置文件，需要重启服务才能看到效果

## Demo-01: 基本入口文件

> 案例对应的 webpack 版本为 `v4.44.2`

`webpack.config.js` 中是最基础的设置，只设置了 `entry` 与 `output.filename`

## Demo-02: 修改目录结构

> 案例对应的 webpack 版本为 `v4.44.2`

将相关代码移动至 `./src` 目录下。对应的 `webpack.config.js` 中的 `entry` 也需要同步修改。

```js
// webpac.config.js
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
}
```

## Demo-03: 修改 devServer

> 案例对应的 webpack 版本为 `v4.44.2`

```js
// webpac.config.js
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    hot: true,
    host: '192.168.1.15',
    before: function(app, server, compiler) {
      app.get('/some/path1', function(req, res) {
        res.json({ custom: 'response from before' });
      });
    },
    after: function(app, server, compiler) {
      app.get('/some/path2', function(req, res) {
        res.json({ custom: 'response from after' });
      });
    }
  }
}
```

默认 devServer 打开的服务使用的是根目录下面的 `index.html` 在开发中，有时需要自定义 `index.html` 和资源的位置。如上图所示为 `./public/index.html` 文件


```js
//webpack.config.js
devServer: {
  before: function(app, server, compiler) {
    app.get('/some/path1', function(req, res) {
      res.json({ custom: 'response from before' });
    });
  },
  after: function(app, server, compiler) {
    app.get('/some/path2', function(req, res) {
      res.json({ custom: 'response from after' });
    });
  }
}
```
devServer 提供了几个添加中间件的地方。如上面的配置, 在开启服务后地址栏输入 `/some/path1` `/some/path2` 将分别返回对应的设置内容。

```js
devServer: {
  host: '192.168.1.15',
}
```

默认是 `devServer` 打开的host在 `localhost`。这样局域网中的其他设备就无法访问。改成上面的配置，只要在一个局域网中的设备都能访问。


## Demo-04: 多入口文件.

```js
// webpack.config.js
const path = require('path')

module.exports = {
  entry: {
    main: './src/index.js',
    vendor: './src/vendor.js'
  },
  output: {
    // filename: 'main.js',
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    hot: true,
    host: '192.168.1.15'
  }
}
```
当前配置是多个入口文件的配置. 对应的资源引入方式如下所示:

```html
<script type="text/javascript" src="./main.bundle.js"></script>
<script type="text/javascript" src="./vendor.bundle.js"></script>
```

## Demo-05: Babel-loader 使用

Babel-loader 基本使用可以查看[文档](github.com/babel/babel-loader)。例如有如下配置

```js
// webpack/config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      }
    ]
  }
}
```
这种配置需要怎样的依赖呢? `babal-loader` `@babel/core` 是必须要引入的。配置中使用了 `es2015`
因此还需要添加 `babel-preset-es2015`。上面的配置需要的完整依赖命令为：

```cmd
npm install -D babel-loader @babel/core babel-preset-es2015
```

如果是 `presets: ['es2015', 'react']` 还需要引入 `babel-preset-react`

```cmd
npm WARN deprecated babel-preset-es2015@6.24.1: ????  Thanks for using Babel: we recommend using babel-preset-env now: please read https://babeljs.io/env to update!
```
解决方案是将 `babel-preset-es2015` 替换为 `@babel/preset-env`。对应的 webpack 也需要修改 `presets: [@babel/preset-env]`。

由于 `es2015` 废弃的关系。最新使用 `babel-loader` 的依赖命令为

```cmd
npm install -D babel-loader @babel/core @babel/preset-env
```

> 由于 Babel 只转换语法(如箭头函数)， 你可以使用 babel-polyfill 支持新的全局变量，例如 Promise 、新的原生方法如 String.padStart (left-pad) 等。

安装：

```cmd
npm install --save-dev babel-polyfill
在入口文件引入就可以了：
```

```js
// ./src/index.js
import 'babel-polyfill'
```

**参考文档**

+ [webpack4系列教程（七）：使用 babel-loader](https://www.jianshu.com/p/d971bffff546): 介绍 webpack 如何使用  
`babel-loader`。懒加载 `.babelrc` 设置.



## 参考文档

+ [ruanyf/webpack-demos](https://github.com/ruanyf/webpack-demos): 有很多案例可以查看.
