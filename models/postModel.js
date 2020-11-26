'use strict';

const pool = require('../database/db');
const promisePool = pool.promise();

const getAllPosts = async () => {
  try {
    const [rows] = await promisePool.query(
        'SELECT post_id, img_file, caption, email FROM post');
    return rows;
  } catch (err) {
    console.log('postModel error', err.message);
  }
};

const getPost = async (postId) => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT img_file, caption, email FROM post WHERE post_id = ?',
        [postId]);
    return rows;
  } catch (err) {
    console.log('postModel error', err.message);
  }
};

const getUserPosts = async (email) => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT post_id, img_file, caption FROM post WHERE email = ?', [email]);
    return rows;
  } catch (err) {
    console.log('postModel error', err.message);
  }
};

const addPost = async (params) => {
  try {
    const [rows] = await promisePool.execute(
        'INSERT INTO post (post_id, img_file, caption, email) VALUES (?, ?, ?, ?)',
        params);
    return rows;
  } catch (err) {
    console.log('postModel error', err.message);
  }
};

const updatePost = async (params) => {
  try {
    const [rows] = promisePool.execute(
        'UPDATE post SET caption = ? WHERE post_id = ?',
        params);
    return rows;
  } catch (err) {
    console.log('postModel error', err.message);
  }
};

const deletePost = async (postId) => {
  try {
    await promisePool.execute('DELETE FROM post WHERE post_id = ?', [postId]);
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