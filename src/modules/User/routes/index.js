const express = require('express');
const expressValidator = require('express-joi-validator');
const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinarystorage = require('multer-storage-cloudinary');
const ctrlUser = require('../controllers');
const validateUser = require('../policies');
const { catchErrors, checkTokenExists, verifyToken } = require('../../../helpers');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  
const storage = cloudinarystorage({
    cloudinary: cloudinary,
    folder: "upload",
    allowedFormats: ["jpg", "png"],
});

const parser = multer({storage: storage})

const router = express.Router();

router.post('/auth/signup', expressValidator(validateUser.register), catchErrors(ctrlUser.register));
router.post('/auth/login', expressValidator(validateUser.login), catchErrors(ctrlUser.login));
router.get('/user/:userId', catchErrors(ctrlUser.viewProfile));
//test route later
router.delete('/user/:userId/leave-marketplace');
router.put('/user/:userId/update-me', checkTokenExists, verifyToken, parser.single("image"), catchErrors(ctrlUser.updateUser));

module.exports = router;
