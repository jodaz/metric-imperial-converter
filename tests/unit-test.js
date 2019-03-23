const chai = require('chai');
const assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler');

const convertHandler = new ConvertHandler();

suite('Unit Tests', () => {
  
  suite('Function convertHandler.getNum(input)', () => {
    
    test('Whole number input', (done) => {
      let input = '32L';
      assert.equal(convertHandler.getNum(input),32);
      done();
    });
    
    test('Decimal Input', (done) => {
      let input = '5.4L';
      assert.equal(convertHandler.getNum(input),5.4);
      done();
    });
    
    test('Fractional Input', (done) => {
      let input = '3/4L'
      assert.equal(convertHandler.getNum(input), 0.75);
      done();
    });
    
    test('Fractional Input w/ Decimal', (done) => {
      let input = '2.5/5lbs';
      assert.equal(convertHandler.getNum(input), 0.5);
      done();
    });
    
    test('Invalid Input (double fraction)', (done) => {
      let input = '2/3/4Gal';
      assert.equal(convertHandler.getNum(input), 'Invalid value');
      done();
    });
    
    test('No Numerical Input', (done) => {
      let input = '5';
      assert.equal(convertHandler.getNum(input), 5);
      done();
    }); 
    
  });
  
  suite('Function convertHandler.getUnit(input)', () => {
    
    test('For Each Valid Unit Inputs', (done) => {
      let input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      input.forEach((ele) => {
        assert.equal(convertHandler.getUnit(ele), ele);
      });
      done();
    });
    
    test('Unknown Unit Input', (done) => {
      let input = 'xls';
      assert.equal(convertHandler.getUnit(input), 'Invalid unit');
      done();
    });  
    
  });
  
  suite('Function convertHandler.getReturnUnit(initUnit)', () => {
    
    test('For Each Valid Unit Inputs', (done) => {
      let input = ['gal','l','mi','km','lbs','kg'];
      let expect = ['l','gal','km','mi','kg','lbs'];
      input.forEach((ele, i) => {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
    
  });  
  
  suite('Function convertHandler.spellOutUnit(unit)', () => {
    
    test('For Each Valid Unit Inputs', (done) => {
      let input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
      let expect = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms'];
      input.forEach((ele, i) => {
        assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
      });
      done();
    });
    
  });
  
  suite('Function convertHandler.convert(num, unit)', () => {
    
    test('Gal to L', (done) => {
      let input = [5, 'gal'];
      let expected = 18.927;
      assert.approximately(convertHandler.convert(input[0],input[1]), expected, 0.1); 
      done();
    });
    
    test('L to Gal', (done) => {
      let input = [6, 'l'];
      let expected = 1.585;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });
    
    test('Mi to Km', (done) => {
      let input = [6, 'mi'];
      let expected = 9.6560;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });
    
    test('Km to Mi', (done) => {
      let input = [9, 'km'];
      let expected = 5.5923;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });
    
    test('Lbs to Kg', (done) => {
      let input = [45, 'lbs'];
      let expected = 20.4116;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });
    
    test('Kg to Lbs', (done) => {
      let input = [10, 'kg'];
      let expected = 22.0462;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });

  });

});