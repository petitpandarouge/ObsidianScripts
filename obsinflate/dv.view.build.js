const fs = require('fs');

try {
  const viewName = process.argv[2];
  const entryPoint = `
    let view = new obsinflate_dv_view_${viewName.toLowerCase()}.${viewName}();
    view.build(dv, input);`;
  const encoding = 'utf-8';
  fs.appendFileSync(`./bundles/dv/${viewName.toLowerCase()}/view.js`, entryPoint, encoding);
} catch(err) {
  console.log('Error appending data to file in sync mode', err);
}