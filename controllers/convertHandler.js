const regexNum = /\d+(?:\.\d+)?(\/\d+)?/g;
const regexUnit = /[a-zA-Z]+/g;

/*  Units table conversion:
    'unit': [
      spelled unit,
      alternate unit,
      converter formula
    ]
*/

const units = {
  'gal': ['gallons', 'l', (v) => { return v * 3.785; }],
  'l': ['liters', 'gal', (v) => { return v / 3.785; }],
  'mi': ['miles', 'km', (v) => { return v * 1.609; }],
  'km': ['kilometers', 'mi', (v) => { return v / 1.609; }],
  'lbs': ['pounds', 'kg', (v) => { return v / 2.2045; }],
  'kg': ['kilograms', 'lbs', (v) => { return v * 2.2045; }]
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
    }

    unit = unit[0];

    let validUnits = Object.keys(units);
    let validUnit = validUnits.includes(unit.toLowerCase());

    return validUnit ? unit : 'Invalid unit';
  }

  this.getReturnUnit = (input) => {
    // Return new unit only
    let originalUnit = this.getUnit(input).toLowerCase();
    let convertUnit = units[originalUnit][1];

    return convertUnit;
  }

  this.spellOutUnit = (input) => {
    // Returns spelled original unit only without conversion
    let unit = this.getUnit(input).toLowerCase();

    return units[unit][0];
  }

  this.convert = (value, unit) => {
    // Return numeric conversion of initial value
    let newUnit = this.getUnit(unit).toLowerCase();
    let newValue = units[newUnit][2](value);

    return newValue;
  }
};