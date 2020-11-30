'use strict';

const pool = require('../database/db');
const promisePool = pool.promise();

const getAllPosts = async () => {
  try {
    const [rows] = await promisePool.query(
        'SELECT postid, imgfile, caption, email, timestamp FROM post');
    return rows;
  } catch (err) {
    console.log('postModel error', err.message);
  }
};

const getPost = async (postId) => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT imgfile, caption, email, timestamp FROM post WHERE postid = ?',
        [postId]);
    return rows;
  } catch (err) {
    console.log('postModel error', err.message);
  }
};

const getUserPosts = async (email) => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT postid, imgfile, caption, timestamp FROM post WHERE email = ?', [email]);
    return rows;
  } catch (err) {
    console.log('postModel error', err.message);
  }
};

const addPost = async (params) => {
  try {
    const [rows] = await promisePool.execute(
        'INSERT INTO post (imgfile, caption, email, timestamp) VALUES (?, ?, ?, NOW())',
        params);
    return rows;
  } catch (err) {
    console.log('postModel error', err.message);
  }
};

const updatePost = async (params) => {
  try {
    const [rows] = promisePool.execute(
        'UPDATE post SET caption = ? WHERE postid = ?',
        params);
    return rows;
  } catch (err) {
    console.log('postModel error', err.message);
  }
};

const deletePost = async (postId) => {
  try {
    await promisePool.execute('DELETE FROM post WHERE postid = ?', [postId]);
  } catch (err) {
    console.log('postModel error', err.message);
  }
};

module.exports = {
  getAllPosts,
  getPost,
  getUserPosts,
  addPost,
  updatePost,
  deletePost,
};