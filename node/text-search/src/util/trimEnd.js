function trimEnd(str = '') {
  return str.replace(/[^a-zA-Z0-9.']*$/, '');
}

module.exports = trimEnd;
