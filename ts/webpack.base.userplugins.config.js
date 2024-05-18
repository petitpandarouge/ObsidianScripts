const make = require('./webpack.base.config');

function withUserPluginsConfiguration() {
  return {
    output: {
      libraryTarget: "commonjs2",
    }
  };
}

module.exports = (scriptName) => {
  return make(`user-plugins/${scriptName}`, `${scriptName}-V2`, 'UserPlugins', 
    withUserPluginsConfiguration() 
  );
}