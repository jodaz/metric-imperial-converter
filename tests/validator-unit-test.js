const chai = require('chai');
const assert = chai.assert;
const validator = require('../validation/validator');

suite('Unit tests', () => {

  suite('validator(value, unit)', () => {

    test('Value and unit are valid', () => {
      assert.equal(validator('8', 'km'), false);
    });

    test('Value is invalid', () => {
      let expected = {"error": "Invalid value"}
      assert.deepEqual(validator('Invalid value', 'kg'), expected);
    });

    test('Unit is invalid', () => {
      let expected = {"error": "Invalid unit"}
      assert.deepEqual(validator('8', 'Invalid unit'), expected);
    });

    test('Unit and value are invalid', () => {
      let expected = {"error": "Invalid value and unit"}
      assert.deepEqual(validator('Invalid value', 'Invalid unit'), expected);
    });

  })

});