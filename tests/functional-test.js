const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../app');

chai.use(chaiHttp);

suite('Functional Tests', () => {

  suite('Routing Tests', () => {
    
    suite('GET /api/convert => conversion object', () => {
      
      test('Convert 10L (valid input)', (done) => {
        chai.request(server)
          .get('/api/convert')
          .query({input: '10L'})
          .end( (err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.initNum, 10);
            assert.equal(res.body.initUnit, 'L');
            assert.approximately(res.body.returnNum, 2.64172, 0.1);
            assert.equal(res.body.returnUnit, 'gal');
            done();
          });
      });

      test('Convert 1.6L (valid input)', (done) => {
        chai.request(server)
          .get('/api/convert')
          .query({input: '1.6L'})
          .end( (err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.initNum, 1.6);
            assert.equal(res.body.initUnit, 'L');
            assert.approximately(res.body.returnNum, 0.42272, 0.1);
            assert.equal(res.body.returnUnit, 'gal');
            done();
          });
      });
      
      test('Convert 32g (invalid input unit)', (done) => {
        chai.request(server)
          .get('/api/convert')
          .query({input: '32g'})
          .end( (err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, 'Invalid unit');
            done();
          });
      });
      
      test('Convert 2/3/4Gal (invalid value)', (done) => {
        chai.request(server)
          .get('/api/convert')
          .query({input: '2/3/4Gal'})
          .end( (err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, 'Invalid value');
            done();
          });
      });  
      
      test('Convert 3/7.2/4kilomegagram (invalid value and unit)', (done) => {
        chai.request(server)
          .get('/api/convert')
          .query({input: '3/7.2/4kilomegagram'})
          .end( (err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, 'Invalid value and unit');
            done();
          });
      });
      
      test('Convert kg (no number)', (done) => {
        chai.request(server)
          .get('/api/convert')
          .query({input: 'kg'})
          .end( (err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.initNum, 1);
            assert.equal(res.body.initUnit, 'kg');
            assert.approximately(res.body.returnNum, 2.2045, 0.1);
            assert.equal(res.body.returnUnit, 'lbs');
            done();
          });
      });

      test('Convert 89 (no unit)', (done) => {
        chai.request(server)
          .get('/api/convert')
          .query({input: '89'})
          .end( (err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, 'Invalid unit');
            done();
          });
      })
    
    });

  });

});