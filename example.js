const listDocxStyle = require('.');

const path = require('path');
const fs = require('fs');

const testFilePath = path.join(path.resolve(path.dirname(__filename)), 'test.docx');

listDocxStyle
  .fromStream(fs.createReadStream(testFilePath))
  .then(styles => console.log(styles))
  .catch(err => console.error(err));
