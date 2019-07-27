// returns the last item in an array or an empty string if no items exist
function last(array = []) {
  return array[array.length - 1] || '';
}

module.exports = last;
