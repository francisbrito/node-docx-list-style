const fs = require('fs');

const Promise = require('promise');
const getStream = require('get-stream');
const xmlParser = require('xml2js');
const zip = require('yauzl');
const { pipe, pathOr, map } = require('ramda');

const STYLES_FILE_RE = /styles\.xml$/;

exports.fromBuffer = fromBuffer;
exports.fromStream = fromStream;
exports.fromFilePath = fromFilePath;

const getStyleInfo = style => ({
  styleId: pathOr('', [ '$', 'w:styleId' ], style),
  name: pathOr('', [ 'w:name', 0, '$', 'w:val' ], style),
});

const parseStyles = pipe(pathOr([], [ 'w:styles', 'w:style' ]), map(getStyleInfo));

function fromBuffer(buffer) {
  return new Promise((resolve, reject) => {
    zip.fromBuffer(buffer, (err, zipArchive) => {
      if (err) return reject(err);

      zipArchive.on('entry', (entry) => {
        // If entry name does not match that of our styles file, then skip on to next entry.
        if (!STYLES_FILE_RE.test(entry.fileName)) return;

        zipArchive.openReadStream(entry, (err, fileStream) => {
          if (err) return reject(err);

          return getStream(fileStream)
            .then(parseXml)
            .then(parseStyles)
            .then(resolve)
            .catch(reject)
            .then(() => zipArchive.close());
        });
      });
    });
  });
}

function fromStream(stream) {
  return getStream
    .buffer(stream, { encoding: 'binary' })
    .then(fromBuffer);
}

function fromFilePath(filePath) {
  return fromStream(fs.createReadStream(filePath));
}

function parseXml(str) {
  return new Promise((resolve, reject) => {
    xmlParser.parseString(str, (err, parsed) => {
      if (err) return reject(err);

      return resolve(parsed);
    });
  });
}
