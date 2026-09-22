const { expect } = require('chai');
const request = require('supertest');
const { BASE_URL } = require('./support/globalSetup');
const { getOperation, getSuccessStatus } = require('./support/swagger');

const PATH = '/healthcheck';
const METHOD = 'get';
const operation = getOperation(PATH, METHOD);

describe(`Path: GET /api/${PATH.replace(/^\//, '')}`, () => {
  it(operation.summary, async () => {
    const res = await request(BASE_URL).get(`/api${PATH}`);

    expect(res.status).to.equal(getSuccessStatus(PATH, METHOD));
    expect(res.body).to.have.property('status', 'ok');
    expect(res.body).to.have.property('uptime').that.is.a('number');
    expect(res.body).to.have.property('timestamp').that.is.a('string');
  });
});
