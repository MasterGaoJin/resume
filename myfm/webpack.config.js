var webpack = require('webpack');
//webpack.config.js
module.exports = {
  entry: './src/fm.js',//入口文件
  output: {//输出文件
    path:__dirname +'/dist',
    filename: 'main.js'//输出文件名  
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    })
  ]
}