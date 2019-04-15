const express = require('express');
const ctrlRequest = require('../controller/index');
const { checkTokenExists, verifyToken, catchErrors, } = require('../../../helpers');

const router = express.Router();

router.post('/user/:userId/pay', checkTokenExists, verifyToken, catchErrors(ctrlRequest.makePayment));
router.post('/user/:userId/make-request', checkTokenExists, verifyToken, catchErrors(ctrlRequest.makeRequest));
module.exports = router;
