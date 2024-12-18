/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */
const make = require('./webpack.base.config');

function withUserPluginsConfiguration() {
    return {
        output: {
            libraryTarget: 'commonjs2'
        }
    };
}

module.exports = (scriptName) => {
    let entryName = `inflates/user-plugins/${scriptName}`;
    let bundleName = 'commands';
    if (scriptName.toLowerCase() === 'helloworld') {
        entryName = `hello-world/user-plugins/main`;
        bundleName = 'helloworld';
    }
    return make(
        entryName,
        bundleName,
        'user-plugins',
        withUserPluginsConfiguration()
    );
};
