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
    let entryName = `dataview/${viewName.toLowerCase()}`;
    if (viewName === 'HelloWorld') {
        entryName = `dataview/hello-world/main`;
    }
    return make(
        entryName,
        'view',
        `dv/${viewName.toLowerCase()}`,
        withDvViewConfiguration(viewName)
    );
};
