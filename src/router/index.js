const express = require('express');
const userRoutes = require('../modules/User/routes');
const requestRoutes = require('../modules/Request/routes');

const router = express.Router();

router.use('/user', userRoutes);
router.use(requestRoutes);

module.exports = router;
