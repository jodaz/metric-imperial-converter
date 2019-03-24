const express = require('express');
const router = express.Router();
const convertHandler = require('../controllers/convertHandler');

const ch = new convertHandler();

router.get('/api/convert', (req, res) => {
  let input = req.query.input;

  let initValue = ch.getNum(input);
  let initUnit = ch.getUnit(input);
  let returnValue = ch.convert(initValue, initUnit);
  let returnUnit = ch.getReturnUnit(input);
  let initSpell = ch.spellOutUnit(initUnit);
  let returnSpell = ch.spellOutUnit(returnUnit);
  let string = `${initValue} ${initSpell} converts to ${returnValue} ${returnSpell}`;

  const objResponse = {
    initNum: initValue,
    initUnit: initUnit,
    returnNum: returnValue,
    returnUnit: returnUnit,
    string: string
  };

  res.json(objResponse);
});

module.exports = router;