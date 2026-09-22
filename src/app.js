const path = require('path');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const routes = require('./routes');
const { notFoundHandler, errorHandler } = require('./middleware/error.middleware');

const swaggerDocument = YAML.load(path.join(__dirname, '..', 'swagger.yaml'));

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', routes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
