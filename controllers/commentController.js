'use strict';

const {validationResult} = require('express-validator');
const commentModel = require('../models/commentModel');

const post_comments_get = async (req, res) => {
  const postId = req.params.postid;
  const post = await commentModel.getPostComments(postId);
  res.json(post);
};

const post_comment_add = async (req, res) => {
  const params = [req.body.comment, req.params.postid, req.user.userid];
  const post = await commentModel.addComment(params);
  res.json(post);
};

const post_comment_delete = async (req, res) => {
  const params = [req.params.postid, req.user.userid];
  await commentModel.deleteComment(params);
};

module.exports = {
  post_comments_get,
  post_comment_add,
  post_comment_delete,
}