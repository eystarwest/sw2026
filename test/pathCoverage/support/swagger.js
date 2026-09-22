const path = require('path');
const YAML = require('yamljs');

const swaggerDoc = YAML.load(path.join(__dirname, '..', '..', '..', 'swagger.yaml'));

function getOperation(pathKey, method) {
  const operation = swaggerDoc.paths[pathKey] && swaggerDoc.paths[pathKey][method];
  if (!operation) {
    throw new Error(`Operation ${method.toUpperCase()} ${pathKey} not found in swagger.yaml`);
  }
  return operation;
}

function getSuccessStatus(pathKey, method) {
  const operation = getOperation(pathKey, method);
  const code = Object.keys(operation.responses).find((c) => c.startsWith('2'));
  if (!code) {
    throw new Error(`No 2xx response documented for ${method.toUpperCase()} ${pathKey}`);
  }
  return Number(code);
}

module.exports = { swaggerDoc, getOperation, getSuccessStatus };
