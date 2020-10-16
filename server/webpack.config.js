//
const path = require('path');

//
const nodeExternals = require('webpack-node-externals');

module.exports = {
  // エントリーポイント
  entry: './src/app.js',

  // 出力設定
  output: {
    // 出力するファイル名
    filename: 'app.js',

    // 出力先のパス（絶対パスを指定する必要がある）
    path: path.join(__dirname, 'dist/public')
  },

  target: 'node',

  node: {
    // Need this when working with express, otherwise the build fails
    __dirname: false,   // if you don't put this is, __dirname
    __filename: false,  // and __filename return blank or /
  },

  // Need this to avoid error when working with Express
  externals: [nodeExternals()],

  // ローダーの設定
  module: {
    rules: [
      {
        // ローダーの処理対象ファイル
        test: /\.js$/,
        // ローダーの処理対象から外すディレクトリ
        exclude: /node_modules/,
        use: [
          {
            // 利用するローダー
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env', { modules: false }]]
            }
          }
        ]
      }
    ]
  },

};
