const fs = require('fs');

const viewName = process.argv[2];
const entryPoint = `
const viewBuilder = new obsinflate_dv_view_${viewName.toLowerCase()}.${viewName}Builder();
const view = viewBuilder.build();
view.render(dv, input);`;
const encoding = 'utf-8';
fs.appendFileSync(
    `./bundles/dataview/${viewName.toLowerCase()}/view.js`,
    entryPoint,
    encoding
);
