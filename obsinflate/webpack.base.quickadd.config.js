const make = require('./webpack.base.config');

function withQuickAddConfiguration() {
    return {
        output: {
            libraryTarget: 'commonjs2'
        }
    };
}

module.exports = (scriptName) => {
    let entryName = `inflates/quick-add/${scriptName}/main`;
    let bundleName = scriptName;
    if (scriptName.toLowerCase() === 'helloworld-script') {
        entryName = `hello-world/quick-add/script`;
    } else if (scriptName.toLowerCase() === 'helloworld-settingablescript') {
        entryName = `hello-world/quick-add/settingableScript`;
    }
    return make(
        entryName,
        bundleName,
        'quick-add',
        withQuickAddConfiguration()
    );
};
