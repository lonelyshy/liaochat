module.exports = {
  devServer: {
    disableHostCheck: true //webpack4.0 开启热更新
  },
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "聊聊chat"
      return args
    })
  }
}
