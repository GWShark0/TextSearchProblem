function neighbors(array = [], index = 0, n = 1) {
  let before = [];
  for (let i = index - n; i < index; i++) {
    const element = array[i];
    element && before.push(element);
  }
  let after = [];
  for (let i = index + 1; i <= index + n; i++) {
    const element = array[i];
    element && after.push(element);
  }
  return [before, after];
}

module.exports = neighbors;
