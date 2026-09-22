const express = require('express');
const healthcheckController = require('../controllers/healthcheck.controller');

const router = express.Router();

router.get('/', healthcheckController.healthcheck);

module.exports = router;
