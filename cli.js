const path = require('path');

const listDocxStyle = require('.');

const usage = '$ docx-list-style <file-path>';
const helpText = 'Prints a list of the styles being used by a Word (.docx) file.';
const man = `
${usage}
${helpText}
`;
const input = process.argv[ 2 ];

if (!input) {
  console.log(man);
  process.exit(0);
}

const filePath = path.isAbsolute(input) ? input : path.resolve(process.cwd(), input);

listDocxStyle
  .fromFilePath(filePath)
  .then(entries => entries.map(({ styleId }) => styleId).sort())
  .then(styles => styles.forEach(s => console.log(s)))
  .catch(e => {
    console.error(e.message);
    process.exit(1);
  });
