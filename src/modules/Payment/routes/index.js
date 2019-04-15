const express = require('express');
const ctrlRequest = require('../controller/index');
const { checkTokenExists, verifyToken, catchErrors, } = require('../../../helpers');

const router = express.Router();

router.post('/user/:userId/pay', checkTokenExists, verifyToken, catchErrors(ctrlRequest.makePayment));
router.post('/user/:userId/make-request', checkTokenExists, verifyToken, catchErrors(ctrlRequest.makeRequest));
router.put('/user/:userId/accept-request', checkTokenExists, verifyToken, catchErrors(ctrlRequest.acceptRequest));
router.put('/user/:userId/reject-request', checkTokenExists, verifyToken, catchErrors(ctrlRequest.rejectRequest));
router.put('/user/:userId/start-session', checkTokenExists, verifyToken, catchErrors(ctrlRequest.startRequest));
module.exports = router;
