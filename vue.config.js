const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 用于放置生成的静态资源
  assetsDir: "static",
  //打包配置
  publicPath: process.env.NODE_ENV ==='production' ? './' : '/',
  devServer: {
    //修改启动端口
    port: 3002,
    //跨域代理服务
    proxy: {
      '/': {
        target: 'http://localhost:1266/',
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          '^/': ''
        }
      },
    }
  },
  chainWebpack: config => {
    config
        .plugin("html")
        .tap(args => {
          args[0].title = "minio";
          return args;
        })
  }
})
