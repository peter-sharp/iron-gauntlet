var path = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './build')
  },
  resolve:{
    modules: [path.resolve(__dirname, "src"), "node_modules", path.resolve(__dirname, "assets")]
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
  }
}
