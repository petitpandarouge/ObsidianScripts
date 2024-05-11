const make = require('./webpack.base.config');

module.exports = make('testView', 'dv/test', {
  output: {
    library: "view",
    libraryTarget: "var"
  }
});