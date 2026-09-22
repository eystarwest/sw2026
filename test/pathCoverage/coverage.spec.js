const { expect } = require('chai');
const { swaggerDoc } = require('./support/swagger');

const TESTED_OPERATIONS = [
  'GET /healthcheck',
  'POST /auth/register',
  'POST /auth/login',
  'POST /checkout',
];

describe('Path Coverage: swagger.yaml vs tested operations', () => {
  it('covers every path/method documented in swagger.yaml', () => {
    const documentedOperations = Object.entries(swaggerDoc.paths).flatMap(([pathKey, methods]) =>
      Object.keys(methods).map((method) => `${method.toUpperCase()} ${pathKey}`)
    );

    expect(TESTED_OPERATIONS.sort()).to.deep.equal(documentedOperations.sort());
  });
});
