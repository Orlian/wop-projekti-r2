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
  const email = req.params.email;
  const userPosts = await postModel.getUserPosts(email);
  res.json(userPosts);
};

const create_new_post = async (req, res) => {
  console.log('create_new_post', req.body, req.file);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }

  const {caption, genres} = req.body;
  const params = [caption, genres, req.file.filename];
  genres.forEach(genre => console.log(genre));
  const post = await postModel.addPost(params);
  res.json({message: 'Upload ok'});
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
  const postId = req.params.postId;
  const post = await postModel.deletePost(postId);
  res.json(post);
};







