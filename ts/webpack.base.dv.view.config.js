const make = require('./webpack.base.config');

function withDvViewConfiguration() {
  return {
    output: {
      library: "view",
      libraryTarget: "var"
    }
  };
}

module.exports = (viewName) => {
  return make(viewName, 'view', `dv/${viewName}`, 
    withDvViewConfiguration() 
  );
}