const regexNum = /\d+(?:\.\d+)?(\/\d+)?/g;
const regexUnit = //;

module.exports = function convertHandler() {
  this.getNum = (input) => {
    // Return numerical value only if the match
    // Is a single-element array.
    let value = input.match(regexNum);
    return value.length == 1 ? eval(value[0]) : 'Invalid value';
  }

  this.getUnit = (input) => {

  }

  this.getReturnUnit = (a, b) => {

  }

  this.convert = (value, unit) => {

  }
};