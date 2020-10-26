module.exports = {
  configureWebpack: {
    devServer: {
      proxy: 'http://boilerplate-es6-webapp.local'
    },
    performance: {
      maxEntrypointSize: 1000000,
      maxAssetSize: 1000000,
      assetFilter: function assetFilter(assetFilename) {
        return !(/\.map$/.test(assetFilename));
      }
    }
  }
}
