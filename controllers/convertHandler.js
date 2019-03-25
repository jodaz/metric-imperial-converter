const regexNum = /\d+(?:\.\d+)?(\/\d+)?/g;
const regexUnit = /[a-zA-Z]+/g;

// REFACTORING IDEA:
// 'GAL': ['GALLONS', 'L']

const units = {
  'gal': 'gallons',
  'l': 'liters',
  'mi': 'miles',
  'km': 'kilometers',
  'lbs': 'pounds',
  'kg': 'kilograms'
};

const conversionMap = {
  'gal': 'l',
  'mi': 'km',
  'lbs': 'kg',
  'kg': 'lbs',
  'km': 'mi',
  'l': 'gal'
}

const convertFuncs = {
  'l':    (v) => { return v / 3.785; },
  'gal':  (v) => { return v * 3.785; },
  'km':   (v) => { return v / 1.609; },
  'mi':   (v) => { return v * 1.609; },
  'kg':   (v) => { return v * 2.2045; },
  'lbs':  (v) => { return v / 2.2045; }
};

module.exports = function convertHandler() {
  this.getNum = (input) => {
    // Return numerical value only if the match
    // Is a single-element array.
    let value = input.match(regexNum);

    // Return 1 if no value is matched
    if (value === null) { return 1; }

    return value.length == 1 ? eval(value[0]) : 'Invalid value';
  }

  this.getUnit = (input) => {
    // Return units only
    let unit = input.match(regexUnit);
    
    if (unit === null) { 
      return 'Invalid unit';
    } else {
      unit = unit[0];
    }

    let validUnits = Object.keys(units);
    let validUnit = validUnits.includes(unit.toLowerCase());

    return validUnit ? unit : 'Invalid unit';
  }

  this.getReturnUnit = (input) => {
    // Return new unit only
    let originalUnit = this.getUnit(input).toLowerCase();
    let convertUnit = conversionMap[originalUnit];

    return convertUnit;
  }

  this.spellOutUnit = (input) => {
    // Returns spelled original unit only without conversion
    let unit = this.getUnit(input).toLowerCase();
    return units[unit];
  }

  this.convert = (value, unit) => {
    // Return numeric conversion of initial value
    let newUnit = this.getUnit(unit).toLowerCase();
    let newValue = convertFuncs[newUnit](value);

    return newValue;
  }
};