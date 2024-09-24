const fs = require('fs');

const viewName = process.argv[2];
const entryPoint = `
let view = new obsinflate_dv_view_${viewName.toLowerCase()}.${viewName}();
view.build(dv, input);`;
const encoding = 'utf-8';
fs.appendFileSync(
    `./bundles/dv/${viewName.toLowerCase()}/view.js`,
    entryPoint,
    encoding
);
