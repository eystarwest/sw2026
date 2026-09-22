const express = require('express');
const authRoutes = require('./auth.routes');
const checkoutRoutes = require('./checkout.routes');
const healthcheckRoutes = require('./healthcheck.routes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/checkout', checkoutRoutes);
router.use('/healthcheck', healthcheckRoutes);

module.exports = router;
