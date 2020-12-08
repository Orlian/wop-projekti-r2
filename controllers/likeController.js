'use strict';
const {validationResult} = require('express-validator');
const likeModel = require('../models/likeModel');

const post_likes_count_get = async (req, res) => {
  const postId = req.params.postId;
  const likes = await likeModel.getPostLikesCount(postId);
  res.json(likes);
};

const post_like = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }
  const params = [req.user.userId, req.params.postid];
  const likes = await likeModel.addLike(params);
  res.json(likes);
};

module.exports = {
  post_likes_count_get,
  post_like,
};


