module.exports = {
  entry: './app/app.jsx',

  output: {
    path: __dirname,
    filename: 'bundle.js'
  },

  resolve: {
    root: __dirname,
    modulesDirectories: [
      'node_modules',
      'app/actions',
      'app/components',
      'app/reducers',
      'app/store'
    ],
    alias: {
      applicationStyles: 'app/app.scss'
    },
    extensions: ['', '.js', '.jsx']
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass',
        exclude: /node_modules/
      }
    ]
  },

  devtool: '#cheap-module-source-map'
}
