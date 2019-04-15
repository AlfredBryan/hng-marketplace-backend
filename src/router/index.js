const express = require('express');
const userRoutes = require('../modules/User/routes');
const requestRoutes = require('../modules/Request/routes');
const therapistRoutes = require('../modules/Therapist/routes');
const router = express.Router();

router.use('/user', userRoutes);
router.use(requestRoutes);
router.use('/therapist', therapistRoutes);

module.exports = router;
