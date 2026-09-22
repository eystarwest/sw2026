const { expect } = require('chai');
const request = require('supertest');
const { BASE_URL } = require('./support/globalSetup');
const { getOperation, getSuccessStatus } = require('./support/swagger');

const PATH = '/auth/register';
const METHOD = 'post';
const operation = getOperation(PATH, METHOD);

describe(`Path: POST /api${PATH}`, () => {
  it(operation.summary, async () => {
    const newUser = {
      name: 'Dana Lee',
      email: `dana.lee.${Date.now()}@example.com`,
      password: 'Passw0rd!',
    };

    const res = await request(BASE_URL).post(`/api${PATH}`).send(newUser);

    expect(res.status).to.equal(getSuccessStatus(PATH, METHOD));
    expect(res.body).to.have.property('id').that.is.a('number');
    expect(res.body).to.have.property('name', newUser.name);
    expect(res.body).to.have.property('email', newUser.email);
    expect(res.body).to.not.have.property('password');
  });
});
