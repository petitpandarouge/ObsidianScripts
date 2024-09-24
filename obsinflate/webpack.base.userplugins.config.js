const make = require('./webpack.base.config');

function withUserPluginsConfiguration() {
    return {
        output: {
            libraryTarget: 'commonjs2'
        }
    };
}

module.exports = (scriptName) => {
    let entryName = `user-plugins/${scriptName}`;
    let bundleName = scriptName;
    if (scriptName === 'HelloWorld') {
        entryName = `user-plugins/hello-world/main`;
        bundleName = 'HelloWorld';
    }
    return make(
        entryName,
        bundleName,
        'UserPlugins',
        withUserPluginsConfiguration()
    );
};
