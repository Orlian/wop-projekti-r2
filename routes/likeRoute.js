'use strict';
const express = require('express');
const router = express.Router();
const likeController = require('../controllers/likeController');

router.get('/:postId', likeController.post_likes_count_get);

router.post('/:postId', likeController.post_like);

