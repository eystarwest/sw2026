const { expect } = require('chai');
const request = require('supertest');
const { BASE_URL } = require('./support/globalSetup');
const { getOperation, getSuccessStatus } = require('./support/swagger');

const PATH = '/auth/login';
const METHOD = 'post';
const operation = getOperation(PATH, METHOD);

describe(`Path: POST /api${PATH}`, () => {
  it(operation.summary, async () => {
    const res = await request(BASE_URL)
      .post(`/api${PATH}`)
      .send({ email: 'alice@example.com', password: 'Passw0rd!' });

    expect(res.status).to.equal(getSuccessStatus(PATH, METHOD));
    expect(res.body).to.have.property('token').that.is.a('string').and.not.empty;
  });
});
