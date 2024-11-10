/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */
const make = require('./webpack.base.config');

function withDvViewConfiguration(viewName) {
    return {
        output: {
            library: `obsinflate_dv_view_${viewName.toLowerCase()}`,
            libraryTarget: 'var'
        }
    };
}

module.exports = (viewName) => {
    let entryName = `inflates/dataview/${viewName.toLowerCase()}`;
    if (viewName.toLowerCase() === 'helloworld') {
        entryName = `hello-world/dataview/main`;
    }
    return make(
        entryName,
        'view',
        `dataview/${viewName.toLowerCase()}`,
        withDvViewConfiguration(viewName)
    );
};
