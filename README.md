# `docx-list-style`
> Lists the styles in a Word (.docx) file.

## Installation
```sh
$ yarn add docx-list-style
```

Or, if using `npm`:
```sh
$ npm install --save docx-list-style
```

## Usage
With `Buffer`-s:
```javascript
const listDocxStyles = require('docx-list-style');
const getStream = require('get-stream');

const MY_WORD_FILE = '<... path to Word file ...>';

listDocxStyles
  .fromBuffer(getStream.buffer(fs.createReadStream(MY_WORD_FILE), { encoding: 'binary' })) // NOTE: make sure to open file in binary mode.
  .then(console.log)
  .catch(console.error);
```

With `Stream`-s:
```javascript
const listDocxStyles = require('docx-list-style');

const MY_WORD_FILE = '<... path to Word file ...>';

listDocxStyles
  .fromStream(fs.createReadStream(MY_WORD_FILE))
  .then(console.log)
  .catch(console.error);
```

With a file path:
```javascript
const listDocxStyles = require('docx-list-style');

const MY_WORD_FILE = '<... path to Word file ...>';

listDocxStyles
  .fromFilePath(MY_WORD_FILE)
  .then(console.log)
  .catch(console.error);
```

## API
TODO
