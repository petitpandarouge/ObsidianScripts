const make = require('./webpack.base.config');

module.exports = make('testView', 'testView', 'dv/test', {
  output: {
    library: "view",
    libraryTarget: "var"
  }
});