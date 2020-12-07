'use strict';
const express = require('express');
const {body} = require('express-validator');
const router = express.Router();
const multer  = require('multer');
const userController = require('../controllers/userController');

const fileFilter = (req, file, cb) => {
  if (file.mimetype.includes('image')) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ dest: './uploads/', fileFilter }); //app.js suhteen

const injectFile = (req, res, next) => {
  if (req.file) {
    req.body.mimetype = req.file.mimetype;
  }
  next();
};

router.get('/', userController.user_list_get);


router.get('/:email', userController.user_get);


router.put('/', upload.single('user_image'), injectFile, userController.make_thumbnail, [
  body('mimetype', 'File needs to be an image').contains('image'),
  body('username', 'minimum 3 characters').
      not().
      isEmpty().
      trim().
      escape().
      isLength({min: 3}),
  body('password', 'at least one upper case letter').
      not().
      isEmpty().
      trim().
      matches('(?=.*[A-Ö]).{8,}'),
  body('description', '').trim().escape(),
]);

router.delete('/', (req,res) =>{
  res.send('With this endpoint you can delete users.')
});

module.exports = router;