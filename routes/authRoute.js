'use strict';

const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const authController = require('../controllers/authController');
const multer = require('multer');

const fileFilter = (req, file, seppo) => {
  if(file.mimetype.includes('image')) {
    seppo(null, true);
  } else {
    seppo(null, false);
  }
};

const upload = multer({dest: './uploads/', fileFilter}); //app.js suhteen

const injectFile = (req, res, next) => {
  if (req.file) {
    req.body.file = req.file.mimetype;
  }
  next();
};

router.post('/login', authController.login);

router.get('/logout', authController.logout);

router.post('/register', upload.single('user'), injectFile,
    [
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
    ],
    authController.user_register,
    authController.login,
);

module.exports = router;