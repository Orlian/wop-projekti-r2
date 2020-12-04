'use strict';

const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.get('/:postid', commentController.post_comments_get);

module.exports = router;