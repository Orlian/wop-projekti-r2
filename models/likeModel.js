'use strict';

const pool = require('../database/db');
const promisePool = pool.promise();

/**Likes count of a post**/
const getPostLikesCount = async (postId) => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT COUNT(*) from Likes INNER JOIN Post ON Likes.postid = Post.postid WHERE Likes.postid = ?',
        [postId]);
    return rows;
  } catch (err) {
    console.log('likeModel error', err.message);
    return {error: 'DB Error'};
  }
};

/**Users who liked a post**/
const getPostLikesAuthors = async (postId) => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT username from Likes INNER JOIN User ON Likes.userid = User.userid WHERE postid = ?',
        [postId]);
    return rows;
  } catch (err) {
    console.log('likeModel error', err.message);
    return {error: 'DB Error'};
  }
};

/**Add like to a post**/
const addLike = async (params) => {
  try {
    const [rows] = await promisePool.execute(
        'INSERT INTO Likes (userid, postid) VALUES (?, ?) where postid = ?',
        [params]);
    return rows;
  } catch (err) {
    console.log('likeModel error', err.message);
    return {error: 'DB Error'};
  }
};

/**Delete like from a post**/
//Tähän tarvitaan se, että aktiivinen käyttäjä voi poistaa vain omat tykkäykset
const deleteLike = async (params) => {
  try {
    const [rows] = await promisePool.execute(
        'DELETE FROM Likes WHERE userid = ? AND postid = ?',
        [params]);
    return rows;
  } catch (err) {
    console.log('likeModel error', err.message);
    return {error: 'DB Error'};
  }
};

module.exports = {
  getPostLikesCount,
  getPostLikesAuthors,
  addLike,
  deleteLike,
};
