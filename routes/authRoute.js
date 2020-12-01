'use strict';

const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const multer = require('multer');
const authController = require('../controllers/authController');

const fileFilter = (req, file, seppo) => {
  if(file.mimetype.includes('image')) {
    console.log('Seppo on true');
    seppo(null, true);
  } else {
    console.log('Seppo on false');
    seppo(null, false);
  }
};

const upload = multer({dest: './uploads/', fileFilter}); //app.js suhteen

const injectFile = (req, res, next) => {
  if (req.file) {
    req.body.mimetype = req.file.mimetype;
  }
  next();
};

router.post('/login', authController.login);

router.get('/logout', authController.logout);

router.post('/register', upload.single('user_image'), injectFile,
    [
      body('user_image', 'File needs to be an image').contains('image'),
      body('username', 'minimum 3 characters').
          not().
          isEmpty().
          trim().
          escape().
          isLength({min: 3}),
      body('email', 'email is not valid').isEmail(),
      body('password', 'at least one upper case letter').
          not().
          isEmpty().
          trim().
          matches('(?=.*[A-Ö]).{8,}'),
        body('description', '').trim().escape(),
    ],
    authController.user_register,
    authController.login,
);

module.exports = router;