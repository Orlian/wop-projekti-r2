'use strict';
const express = require('express');
const router = express.Router();
const multer = require('multer');
const {body} = require('express-validator');
const postController = require('../controllers/postController');

const fileFilter = (req, file, cb) => {
  if (file.mimetype.includes('image')) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({dest: './uploads/', fileFilter});

const injectFile = (req, res, next) => {
  if (req.file) {
    req.body.mimetype = req.file.mimetype;
  }
  next();
};

router.get('/', postController.post_list_get);

router.get('/recent', postController.recent_post_list_get);

router.get('/:id', postController.post_get);

router.get('/user', postController.user_post_get);

router.post('/', upload.single('user-image'), injectFile, postController.make_thumbnail, [
  body('caption', 'Add caption').isLength({min: 1}),
  body('mimetype', 'Not an image').contains('image')
], postController.create_new_post);

router.put('/', [
  body('caption', 'Add caption').isLength({min: 1}),
  body('genres', 'Add genres').not().isEmpty(),
], postController.post_update_put);

router.delete('/:id', postController.post_delete);

module.exports = router;