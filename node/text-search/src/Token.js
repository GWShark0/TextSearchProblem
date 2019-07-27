class Token {
  constructor(string, head) {
    this.string = string;
    this.head = head;
    this.tail = head + string.length - 1;
  }
}

module.exports = Token;
