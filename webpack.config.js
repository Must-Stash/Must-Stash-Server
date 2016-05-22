module.exports = {
  entry: './src/main.js',
  output: {
    filename: './public/js/mainApp-bundle.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          compact: false,
          presets: ['es2015', 'react']
        }
      },
    ]
  }
};
