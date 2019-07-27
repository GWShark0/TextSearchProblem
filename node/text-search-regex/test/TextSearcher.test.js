const TextSearcher = require('../src/TextSearcher');
const readFile = require('./util/readFile');

describe('Text Searcher', () => {

  // Simplest possible case, no context and the word occurs exactly once.
  it('one hit no context', () => {
    const file = readFile('short_excerpt.txt');
    const searcher = new TextSearcher(file);
    const results = searcher.search('sketch', 0);

    expect(results).toEqual(['sketch']);
  });

  // Next simplest case, no context and multiple hits.
  it('multiple hits no context', () => {
    const file = readFile('short_excerpt.txt');
    const searcher = new TextSearcher(file);
    const results = searcher.search('naturalists', 0);

    expect(results).toEqual(['naturalists', 'naturalists']);
  });

  // This is the example from the document.
  it('basic search', () => {
    const file = readFile('short_excerpt.txt');
    const searcher = new TextSearcher(file);
    const results = searcher.search('naturalists', 3);

    expect(results).toEqual([
      'great majority of naturalists believed that species',
      'authors.  Some few naturalists, on the other',
    ]);
  });

  // Same as basic search but a little more context.
  it('basic more context', () => {
    const file = readFile('short_excerpt.txt');
    const searcher = new TextSearcher(file);
    const results = searcher.search('naturalists', 6);

    expect(results).toEqual([
      'Until recently the great majority of naturalists believed that species were immutable productions',
      'maintained by many authors.  Some few naturalists, on the other hand, have believed',
    ]);
  });

  // Tests query word with apostrophe.
  it('apostrophe query', () => {
    const file = readFile('long_excerpt.txt');
    const searcher = new TextSearcher(file);
    const results = searcher.search('animal\'s', 4);

    expect(results).toEqual([
      'not indeed to the animal\'s or plant\'s own good',
      'habitually speak of an animal\'s organisation as\r\nsomething plastic',
    ]);
  });

  // Tests numeric query word.'
  it('numeric query', () => {
    const file = readFile('long_excerpt.txt');
    const searcher = new TextSearcher(file);
    const results = searcher.search('1844', 2);

    // NOTE: can we assume that "1844--honoured" is one word?
    // expected: [..., 'sketch of 1844--honoured me by']
    expect(results).toEqual([
      'enlarged in 1844 into a',
      'sketch of 1844--honoured me',
    ]);
  });

  // Tests mixed alphanumeric query word.
  it('mixed query', () => {
    const file = readFile('long_excerpt.txt');
    const searcher = new TextSearcher(file);
    const results = searcher.search('xxxxx10x', 3);

    // NOTE: can we assume that "[xxxxx10x.xxx]" is one word?
    // expected: ['date first edition [xxxxx10x.xxx] please check file']
    expect(results).toEqual(['date first edition [xxxxx10x.xxx] please check']);
  });

  // Should get same results regardless of case.
  it('case insensitive search', () => {
    const file = readFile('short_excerpt.txt');
    const searcher = new TextSearcher(file);
    let results;

    const expected = [
      'on the Origin of Species.  Until recently the great',
      'of naturalists believed that species were immutable productions, and',
      'hand, have believed that species undergo modification, and that',
    ];

    results = searcher.search('species', 4);
    expect(results).toEqual(expected);

    results = searcher.search('SPECIES', 4);
    expect(results).toEqual(expected);

    results = searcher.search('SpEcIeS', 4);
    expect(results).toEqual(expected);
  });

  // Hit that overlaps file start should still work.
  it('near beginning', () => {
    const file = readFile('short_excerpt.txt');
    const searcher = new TextSearcher(file);
    const results = searcher.search('here', 4);

    expect(results).toEqual(['I will here give a brief sketch']);
  });

  // Hit that overlaps file end should still work.
  it('near end', () => {
    const file = readFile('short_excerpt.txt');
    const searcher = new TextSearcher(file);
    const results = searcher.search('existing', 3);

    expect(results).toEqual([
      'and that the existing forms of life',
      'generation of pre existing forms.',
    ]);
  });

  // // Searcher can execute multiple searches after initialization.
  it('multiple searches', () => {
    const file = readFile('short_excerpt.txt');
    const searcher = new TextSearcher(file);
    let results;

    results = searcher.search('species', 4);
    expect(results).toEqual([
      'on the Origin of Species.  Until recently the great',
      'of naturalists believed that species were immutable productions, and',
      'hand, have believed that species undergo modification, and that',
    ]);

    results = searcher.search('here', 4);
    expect(results).toEqual(['I will here give a brief sketch']);

    results = searcher.search('existing', 3);
    expect(results).toEqual([
      'and that the existing forms of life',
      'generation of pre existing forms.',
    ]);
  });

  // // Overlapping hits should just come back as separate hits.
  it('overlapping hits', () => {
    const file = readFile('short_excerpt.txt');
    const searcher = new TextSearcher(file);
    const results = searcher.search('that', 3);

    expect(results).toEqual([
      'of naturalists believed that species were immutable',
      'hand, have believed that species undergo modification',
      'undergo modification, and that the existing forms',
    ]);
  });

  // If no hits, get back an empty array.
  it('no hits', () => {
    const file = readFile('long_excerpt.txt');
    const searcher = new TextSearcher(file);
    const results = searcher.search('slejrlskejrlkajlsklejrlksjekl', 3);

    expect(results).toHaveLength(0);
  });
});
