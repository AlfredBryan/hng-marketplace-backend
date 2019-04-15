const express = require('express');
const ctrlTherapist = require('../controllers');
const {
  catchErrors, verifyToken, checkTokenExists,
} = require('../../../helpers');

const router = express.Router();
// TODO: remove all commented out authentication middleware
router.put('/edit/:Id', checkTokenExists, verifyToken, catchErrors(ctrlTherapist.updateTherapist));
router.get('/profile/:id', catchErrors(ctrlTherapist.viewTherapist));
router.get('/all', /*checkTokenExists, verifyToken,*/ catchErrors(ctrlTherapist.allTherapists));
router.post('/search', /*checkTokenExists, verifyToken,*/ catchErrors(ctrlTherapist.search));
router.post('/verify/:userId', /*checkTokenExists, verifyToken,*/ catchErrors(ctrlTherapist.create));

module.exports = router;
