const express = require('express');
const ctrlRequest = require('../controller/index');
const { checkTokenExists, verifyToken, catchErrors, } = require('../../../helpers');

const router = express.Router();

router.post('/user/:userId/therapist/:therapistId/pay', checkTokenExists, verifyToken, catchErrors(ctrlRequest.makePayment));
router.post('/user/:userId/therapist/:therapistId/make-request', checkTokenExists, verifyToken, catchErrors(ctrlRequest.makeRequest));
router.put('/user/:userId/accept-request', checkTokenExists, verifyToken, catchErrors(ctrlRequest.acceptRequest));
router.put('/user/:userId/reject-request', checkTokenExists, verifyToken, catchErrors(ctrlRequest.rejectRequest));
router.put('/user/:userId/start-session', checkTokenExists, verifyToken, catchErrors(ctrlRequest.startRequest));
router.put('/user/:userId/end-session', checkTokenExists, verifyToken, catchErrors(ctrlRequest.endSession));
module.exports = router;
