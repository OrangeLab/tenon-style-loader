# Tenon Style Loader
## 简介
Tenon 专用的 Webpack 样式解析 Loader，用于处理进行样式转换。

### 安装
`yarn add tenon-style-loader`

### 插件：TenonStylePlugin
自动注入 Tenon Style Loader，使用方配置`less``stylus`等高阶语言时，无需关注 `css-loader`。

插件使用如下：
```javascript
import {TenonStylePlugin} from '@hummer/tenon-style-loader';
new TenonStylePlugin({
  include: []
})
```

| 参数      | 类型 |    说明 | 默认值  |
| :-------- | ---- | --------:| ---- |
| include  | `Array<string>` |  支持的 Css 高阶语言   | `['less', 'stylus', 'sass', 'scss']` |

### 示例
```javascript
// 部分 Webpack 配置
  module: {
    rules: [{
      test: /\.vue$/,
      use: {
        loader: require.resolve('@hummer/tenon-loader')
      }
    }, {
      test: /\.less$/,
      use: [require.resolve('less-loader')]
    },{
      test: /\.css$/,
      use: {
        loader: path.join(require.resolve('@hummer/tenon-style-loader'))
      }
    },]
  },
  plugins: [new TenonStylePlugin(),new VueLoaderPlugin()]
```