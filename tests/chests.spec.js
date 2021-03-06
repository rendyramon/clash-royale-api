require('should');

const request = require('supertest');
const app = require('./helpers/mock.app');
const config = require('../src/config/config');
var token = '';
var aChest = require('./helpers/newChest');
var newChest = JSON.parse(JSON.stringify(aChest));

describe('Chests.', function () {
  this.timeout(5000);

  before((done) => {
    request(app)
      .post('/api/authenticate')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send({ username: config.ADMIN_USERNAME, password: config.ADMIN_PASSWORD})
      .end((err, res) => {
        token = res.text;
        done();
    });
  });

  it('should create a new Chest', done => {
    request(app)
      .post('/api/chests')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send(newChest)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        res.status.should.eql(201);
        done();
      });
  });

});
