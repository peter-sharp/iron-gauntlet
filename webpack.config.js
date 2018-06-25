const path = require('path');

const config = {
  entry: path.resolve(__dirname, "src"),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  resolve:{
    modules: [path.resolve(__dirname, "src"), path.resolve(__dirname, "assets"), "node_modules"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use:[{
          loader: 'babel-loader',
          options: { presets: ['es2015']}
        }]
      }
    ]
  },
  devtool: 'source-map'
}

module.exports = config
