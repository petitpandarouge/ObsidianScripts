const make = require('./webpack.base.config');

module.exports = make('testQuickAdd', 'QuickAdd', {
  output: {
    libraryTarget: "commonjs2",
  }
});