const make = require('./webpack.base.config');

function withQuickAddConfiguration() {
    return {
        output: {
            libraryTarget: 'commonjs2'
        }
    };
}

module.exports = (scriptName) => {
    let entryName = `inflates/quick-add/${scriptName}`;
    let bundleName = scriptName;
    if (scriptName === 'HelloWorld') {
        entryName = `quick-add/hello-world/main`;
        bundleName = 'HelloWorld';
    }
    return make(entryName, bundleName, 'QuickAdd', withQuickAddConfiguration());
};
