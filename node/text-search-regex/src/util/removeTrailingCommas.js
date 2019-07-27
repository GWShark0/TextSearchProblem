// removes commas at the end of a string if they exist
function removeTrailingCommas(string) {
  return string.replace(/[,+]$/, '');
}

module.exports = removeTrailingCommas;
