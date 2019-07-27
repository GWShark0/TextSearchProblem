const TextSearcher = require('../src/TextSearcher');
const readFile = require('./util/readFile');

const file = readFile('long_excerpt.txt');
let searcher;
let results;

const hrstart = process.hrtime();

for (let i = 0; i < 100; i++) {
  searcher = new TextSearcher(file);
  results = searcher.search('the', 10);
}

const hrend = process.hrtime(hrstart);

console.info('Execution time: %dms', hrend[0] * 1000 + hrend[1] / 1000000);
