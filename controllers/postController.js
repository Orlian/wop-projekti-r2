'use strict';
const {validationResult} = require('express-validator');
const postModel = require('../models/postModel');
const {makeThumbnail} = require('../utils/resize');


const post_list_get = async (req, res) => {
  const posts = await postModel.getAllPosts();
  res.json(posts);
};

const post_get = async (req, res) => {
  const postId = req.params.postId;
  const post = await postModel.getPost(postId);
  res.json(post);
};

const user_post_get = async (req, res) => {
  const userId = req.params.userid;
  const userPosts = await postModel.getUserPosts(userId);
  res.json(userPosts);
};

const create_new_post = async (req, res) => {
  console.log('create_new_post', req.body, req.file);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }

  //Saadaanko req bodysta? vai mistä?
  const {caption} = req.body;
  const params = [req.file.filename, caption, req.user.userid];
  const post = await postModel.addPost(params);
  if(post){
    res.json({message: 'Upload ok'});
  }
};

const post_update_put = async (req, res) => {
  console.log('post_update_put', req.body);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});

  }
  //TODO: Add edit and delete post options in frontend too. You need to add name=id to html and dd id to params
  const {caption, genres} = req.body;
  const params = [caption, genres];
  const post = await postModel.updatePost(params);
  res.json({message: 'Update ok'});
};

const post_delete = async (req, res) => {
  const postId = req.params.postid;
  const post = await postModel.deletePost(postId);
  res.json(post);
};

const make_thumbnail = async (req, res, next) => {
  try {
    const thumbnail = await makeThumbnail(req.file.path, req.file.filename);
    console.log('thumbnail', thumbnail);
    if (thumbnail) {
      next();
    }
  } catch (e) {
    res.status(400).json({errors: e.message});
  }
};

module.exports = {
  post_list_get,
  post_get,
  user_post_get,
  create_new_post,
  post_update_put,
  post_delete,
  make_thumbnail,
};










