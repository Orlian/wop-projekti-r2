'use strict';
const {validationResult} = require('express-validator');
const likeModel = require('../models/likeModel');

const post_likes_count_get = async (req, res) => {
  const postId = req.params.postid;
  const likes = await likeModel.getPostLikesCount(postId);
  res.json(likes);
};

const post_like = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }
  const params = [req.user.userid, req.params.postid];
  const likes = await likeModel.addLike(params);
  res.json(likes);
};

const post_liker = async (req, res) => {
  const params = [req.user.userid, req.params.postid];
  const like = await likeModel.getLiker(params);
  res.json(like);
};

const delete_like = async (req, res) => {
  const params = [req.user.userid, req.params.postid];
  const like = await likeModel.deleteLike(params);
  res.json(like);
};

module.exports = {
  post_likes_count_get,
  post_like,
  post_liker,
  delete_like,
};


