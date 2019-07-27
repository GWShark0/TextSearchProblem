const { resolve } = require('path');
const { readFileSync } = require('fs');

const FILES_DIR = resolve(__dirname, '../../files');

function readFile(filename) {
  const filepath = resolve(FILES_DIR, filename);
  return readFileSync(filepath, 'utf8');
}

module.exports = readFile;
