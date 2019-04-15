const express = require('express');
const expressValidator = require('express-joi-validator');
const ctrlUser = require('../controllers');
const validateUser = require('../policies');
const { catchErrors, checkTokenExists, verifyToken } = require('../../../helpers');


const router = express.Router();

router.post('/auth/signup', expressValidator(validateUser.register), catchErrors(ctrlUser.register));
router.post('/auth/login', expressValidator(validateUser.login), catchErrors(ctrlUser.login));
router.get('/user/:userId', catchErrors(ctrlUser.viewProfile));
router.delete('/user/:userId/leave-marketplace');
router.put('/user/:userId/update-me', checkTokenExists, verifyToken, catchErrors(ctrlUser.updateUser));

module.exports = router;
