const path = require('path');

module.exports = {
  entry: './src/tasks.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'tasks.js',
    path: path.resolve(__dirname, 'bundles/dv'),
  },
};