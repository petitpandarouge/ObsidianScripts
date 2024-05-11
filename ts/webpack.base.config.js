const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = (bundleName, bundlePath) => {
  return  {
    mode: 'development',
    entry: `${path.resolve(__dirname, 'src')}/${bundleName}.ts`,
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
      plugins: [new TsconfigPathsPlugin({})]
    },
    output: {
      filename: `${bundleName}.js`,
      path: path.resolve(__dirname, `bundles/${bundlePath}`),
    },
  }
}