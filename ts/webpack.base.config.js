const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { mergician } = require('mergician');

module.exports = (entryName, bundleName, bundlePath, extraConfig = {}) => {
  let base = {
    mode: 'development',
    devtool: 'eval-source-map',
    entry: `${path.resolve(__dirname, 'src')}/${entryName}.ts`,
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
      path: path.resolve(__dirname, `bundles/${bundlePath}`)
    },
  };
  return mergician({})(base, extraConfig);
}