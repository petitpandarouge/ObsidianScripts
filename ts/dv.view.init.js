const fs = require('fs');

try {
  const entryPoint = '\nview.create(dv, input);';
  const encoding = 'utf-8';
  fs.appendFileSync('./bundles/dv/test/testView.js', entryPoint, encoding);
} catch(err) {
  console.log('Error appending data to file in sync mode', err);
}