module.exports = {
  configureWebpack: {
    devServer: {
      proxy: 'http://boilerplate-es6-webapp.local'
    }
  }
}
