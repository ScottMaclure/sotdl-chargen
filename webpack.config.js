let path = require('path')

module.exports = {
  resolve: {
    root: [
      path.resolve('./src')
    ]
  },
  entry: {
    bundle: 'js/index'
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
}
