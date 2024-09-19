const make = require('./webpack.base.config');

function withQuickAddConfiguration() {
  return {
    output: {
      libraryTarget: "commonjs2",
    }
  };
}

module.exports = (scriptName) => {
  return make(scriptName, scriptName, 'QuickAdd', 
    withQuickAddConfiguration() 
  );
}