'use strict';

const pool = require('../database/db');
const promisePool = pool.promise();

const getAllPosts = async () => {
  try {
    //TODO: Inner join user table
    const [rows] = await promisePool.query(
        'SELECT postid, imgfile, caption, email, timestamp FROM Post');
    return rows;
  } catch (err) {
    console.log('postModel error', err.message);
    return {error: 'DB Error'};
  }
};

const getRecentPosts = async () => {
  try {
    const [rows] = await promisePool.execute('SELECT postid, imgfile, caption, User.username, timestamp FROM Post INNER JOIN User ON Post.email = User.email ORDER BY timestamp DESC LIMIT 50');
    return rows;
  } catch(err) {
    console.log('postModel error', err.message);
    return {error: 'DB Error'};
  }
}

const getPost = async (postId) => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT imgfile, caption, email, timestamp FROM Post WHERE postid = ?',
        [postId]);
    return rows;
  } catch (err) {
    console.log('postModel error', err.message);
    return {error: 'DB Error'};
  }
};

const getUserPosts = async (email) => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT postid, imgfile, caption, timestamp FROM Post WHERE email = ?', [email]);
    return rows;
  } catch (err) {
    console.log('postModel error', err.message);
    return {error: 'DB Error'};
  }
};

const addPost = async (params) => {
  try {
    const [rows] = await promisePool.execute(
        'INSERT INTO Post (imgfile, caption, email, timestamp) VALUES (?, ?, ?, NOW())',
        params);
    return rows;
  } catch (err) {
    console.log('postModel error', err.message);
    return {error: 'DB Error'};
  }
};

const updatePost = async (params) => {
  try {
    const [rows] = promisePool.execute(
        'UPDATE Post SET caption = ? WHERE postid = ?',
        params);
    return rows;
  } catch (err) {
    console.log('postModel error', err.message);
    return {error: 'DB Error'};
  }
};

const deletePost = async (postId) => {
  try {
    await promisePool.execute('DELETE FROM Post WHERE postid = ?', [postId]);
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
  getRecentPosts,
};