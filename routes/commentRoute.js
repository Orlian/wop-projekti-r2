'use strict';

const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const commentController = require('../controllers/commentController');

router.get('/:postid', commentController.post_comments_get);

router.get('/author/:postid', commentController.get_commenter);

router.post('/:postid', [
    body('comment', 'Please add a comment').trim().isLength({min: 1}).escape(),
], commentController.post_comment_add);

router.delete('/:postid/:commentid', commentController.post_comment_delete);

module.exports = router;