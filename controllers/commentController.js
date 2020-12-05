'use strict';

const {validationResult} = require('express-validator');
const commentModel = require('../models/commentModel');

const post_comments_get = async (req, res) => {
  const postId = req.params.postid;
  const post = await commentModel.getPostComments(postId);
  res.json(post);
};

module.exports = {
  post_comments_get,
}