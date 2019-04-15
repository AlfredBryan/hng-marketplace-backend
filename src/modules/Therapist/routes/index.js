const express = require('express');
const ctrlTherapist = require('../controllers');
const {
  catchErrors, verifyToken, checkTokenExists,
} = require('../../../helpers');

const router = express.Router();
// TODO: remove all commented out authentication middleware
router.get('/all-therapists', /*checkTokenExists, verifyToken,*/ catchErrors(ctrlTherapist.allTherapists));
router.post('/search', /*checkTokenExists, verifyToken,*/ catchErrors(ctrlTherapist.search));
router.get('/marketplace', catchErrors(ctrlTherapist.marketplace));
router.put('/user/:userId/change-status', checkTokenExists, verifyToken, catchErrors(ctrlTherapist.changeStatus));
module.exports = router;
