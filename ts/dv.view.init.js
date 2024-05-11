const fs = require('fs');

try {
  const initCall = '\nview.create(dv, input);';
  const encoding = 'utf-8';
  fs.appendFileSync('./bundles/dv/test/testView.js', initCall, encoding);
} catch(err) {
  console.log('Error appending data to file in sync mode', err);
}