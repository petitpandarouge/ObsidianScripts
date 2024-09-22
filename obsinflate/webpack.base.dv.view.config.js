const make = require('./webpack.base.config');

function withDvViewConfiguration() {
  return {
    output: {
      library: "View",
      libraryTarget: "var"
    }
  };
}

module.exports = (viewName) => {
  let entryName = `dataview/${viewName.toLowerCase()}`;
  if (viewName === 'HelloWorld') {
    entryName = `dataview/hello-world/main`;
  }
  return make(entryName, 'view', `dv/${viewName.toLowerCase()}`, 
    withDvViewConfiguration() 
  );
}