const { expect } = require('chai');
const request = require('supertest');
const { BASE_URL } = require('./support/globalSetup');
const { getOperation, getSuccessStatus } = require('./support/swagger');

const PATH = '/checkout';
const METHOD = 'post';
const operation = getOperation(PATH, METHOD);

describe(`Path: POST /api${PATH}`, () => {
  it(operation.summary, async () => {
    const loginRes = await request(BASE_URL)
      .post('/api/auth/login')
      .send({ email: 'bob@example.com', password: 'Passw0rd!' });

    const token = loginRes.body.token;

    const res = await request(BASE_URL)
      .post(`/api${PATH}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        paymentMethod: 'cash',
        items: [
          { productId: 1, quantity: 2 },
          { productId: 3, quantity: 1 },
        ],
      });

    expect(res.status).to.equal(getSuccessStatus(PATH, METHOD));
    expect(res.body).to.have.property('paymentMethod', 'cash');
    expect(res.body).to.have.property('subtotal', 90);
    expect(res.body).to.have.property('discount', 9);
    expect(res.body).to.have.property('total', 81);
  });
});
