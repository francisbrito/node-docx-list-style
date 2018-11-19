#!/usr/bin/env node
const path = require('path');
const yargs = require('yargs');
const { prop } = require('ramda');

const listDocxStyle = require('.');

const usage = '$0 <file-path> [options]';
const helpText = 'Prints a list of the styles being used by a Word (.docx) file.';
const argv = yargs
  .usage(usage, helpText)
  .scriptName('docx-list-style')
  .demandCommand(1)
  .help('h')
  .alias('h', 'help')
  .boolean('n')
  .alias('n', 'names')
  .describe('n', 'Lists style names instead of IDs')
  .argv;
const input = argv['file-path'];
const shouldListNames = argv.n;
const filePath = path.isAbsolute(input) ? input : path.resolve(process.cwd(), input);
const convertStyleToString = shouldListNames ? prop('name') : prop('styleId');

listDocxStyle
  .fromFilePath(filePath)
  .then(entries => entries.map(convertStyleToString).sort())
  .then(styles => styles.forEach(s => console.log(s)))
  .catch(e => {
    console.error(e.message);
    process.exit(1);
  });
