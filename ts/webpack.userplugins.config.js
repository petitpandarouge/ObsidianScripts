const make = require('./webpack.base.config');

function withUserPluginsConfiguration() {
  return {
    output: {
      libraryTarget: "commonjs2",
    }
  };
}

module.exports = make(`user-plugins/main`, `main`, 'UserPlugins', 
  withUserPluginsConfiguration()
  );