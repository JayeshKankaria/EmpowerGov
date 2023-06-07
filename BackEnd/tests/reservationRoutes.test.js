const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

const { expect } = chai;

chai.use(chaiHttp);

describe('Reservation Routes', () => {
  it('should register a user', (done) => {
    chai
      .request(app)
      .post('/api/register')
      .send({ username: 'testuser', password: 'testpassword' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').equals('User registered successfully');
        done();
      });
  });

  // Add more tests for other routes
});