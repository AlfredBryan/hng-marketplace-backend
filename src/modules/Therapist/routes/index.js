const express = require('express');
const ctrlTherapist = require('../controllers');
const {
  catchErrors, verifyToken, checkTokenExists,
} = require('../../../helpers');

const router = express.Router();
// TODO: remove all commented out authentication middleware
router.put('/edit/:Id', checkTokenExists, verifyToken, catchErrors(ctrlTherapist.updateTherapist));
router.get('/profile/:id', catchErrors(ctrlTherapist.viewTherapist));
router.get('/all', checkTokenExists, verifyToken, catchErrors(ctrlTherapist.allTherapists));
router.post('/search', catchErrors(ctrlTherapist.searchTherapist));
router.get('/marketplace', catchErrors(ctrlTherapist.marketplace));
router.post('/user/therapist/verify-me', checkTokenExists, verifyToken, catchErrors(ctrlTherapist.verifyTherapist));
router.put('/user/:userId/change-status', checkTokenExists, verifyToken, catchErrors(ctrlTherapist.changeStatus));

module.exports = router;
