'use strict';
const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const likeController = require('../controllers/likeController');

router.get('/:postid', likeController.post_likes_count_get);

router.get('/authors/:postid', likeController.post_likes_authors_get);

router.post('/:postid', [body('like', 'Add like').not().isEmpty()],
    likeController.post_like);

