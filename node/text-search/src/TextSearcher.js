const Token = require('./Token');
const isWhiteSpace = require('./util/isWhiteSpace');
const neighbors = require('./util/neighbors');
const trimEnd = require('./util/trimEnd');

class TextSearcher {
  constructor(string) {
    this.tokens = [];
    this.string = string;
    this.tokenize(string);
  }

  tokenize(string = '') {
    let buffer = '';
    let head = 0;
    let isTokenComplete = false;

    for (let i = 0; i < string.length; i++) {
      const char = string[i];

      if (isTokenComplete && !isWhiteSpace(char)) {
        buffer = '';
        head = i;
        isTokenComplete = false;
      }

      if (!isTokenComplete && !isWhiteSpace(char)) {
        buffer += char;
      }

      if (!isTokenComplete && isWhiteSpace(char)) {
        isTokenComplete = true;
        this.tokens.push(new Token(buffer, head));
      }
    }

    this.tokens.push(new Token(buffer, head));
  }

  search(queryWord = '', contextWords = 0) {
    queryWord = queryWord.toLowerCase();
    const result = [];
    this.tokens.forEach((token, index) => {
      if (token.string.toLowerCase().includes(queryWord)) {
        const [before, after] = neighbors(this.tokens, index, contextWords);
        result.push(this.stringifyTokens([...before, token, ...after]));
      }
    });
    return result;
  }

  stringifyTokens(tokens) {
    const head = tokens[0].head;
    const tail = tokens[tokens.length - 1].tail;
    return trimEnd(this.string.substring(head, tail + 1));
  }
}

module.exports = TextSearcher;
