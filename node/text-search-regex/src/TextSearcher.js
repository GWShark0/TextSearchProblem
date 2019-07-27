const last = require('./util/last');
const removeTrailingCommas = require('./util/removeTrailingCommas');

class TextSearcher {
  constructor(string) {
    this.string = string;
  }

  search(query = '', n = 0) {
    let regex = RegExp(''
      + '('
      + `(\\S+\\W+){0,${n}}` // 0-n available words before query
      + query
      + '([\\S]+)?' // any non-whitespace characters attached to query
      + `(\\W+\\S+){0,${n}}` // 0-n available words after query
      + ')'
    , 'gi');

    let result = [];
    let match;
    while (match = regex.exec(this.string)) {
      if (!last(result).includes(match[0])) {
        result.push(match[0]);
      }
      regex.lastIndex = match.index + 1;
    }
    return result.map(removeTrailingCommas);
  }
}

module.exports = TextSearcher;
