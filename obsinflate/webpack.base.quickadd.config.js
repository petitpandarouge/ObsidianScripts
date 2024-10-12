const make = require('./webpack.base.config');

function withQuickAddConfiguration() {
    return {
        output: {
            libraryTarget: 'commonjs2'
        }
    };
}

module.exports = (scriptName) => {
    let entryName = `inflates/quick-add/${scriptName}.main`;
    let bundleName = scriptName;
    if (scriptName.toLowerCase() === 'helloworld') {
        entryName = `hello-world/quick-add/main`;
    }
    return make(
        entryName,
        bundleName,
        'quick-add',
        withQuickAddConfiguration()
    );
};
