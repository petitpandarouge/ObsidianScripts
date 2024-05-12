const make = require('./webpack.base.config');

module.exports = make('testQuickAdd', 'testQuickAdd', 'QuickAdd', {
  output: {
    libraryTarget: "commonjs2",
  }
});