'use strict';
const express = require('express');
const router = express.Router();
const likeController = require('../controllers/likeController');

router.get('/author/:postid', likeController.post_liker);

router.get('/:postid', likeController.post_likes_count_get);

router.post('/:postid', likeController.post_like);

router.delete('/:postid', likeController.user_delete);

module.exports = router;

