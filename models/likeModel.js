'use strict';

const pool = require('../database/db');
const promisePool = pool.promise();

/**Likes count of a post**/
const getPostLikesCount = async (postId) => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT COUNT(*) AS likecount from Likes WHERE postid = ?',
        [postId]);
    return rows;
  } catch (err) {
    console.log('likeModel error', err.message);
    return {error: 'DB Error'};
  }
};

//**Get user who liked picture**//
const getLiker = async (params) => {
  try {
    console.log('Model getliker', params);
    const [rows] = await promisePool.execute(
        'SELECT userid FROM Likes WHERE userid=? AND postid=?',
        params);
    console.log('model getliker', rows);
    return rows;
  } catch (err) {
    console.log('likeModel error', err.message);
    return {error: 'DB Error'};
  }
};


/**Add like to a post**/
const addLike = async (params) => {
  console.log('add like params', params);
  try {
    const [rows] = await promisePool.execute(
        'INSERT INTO Likes (userid, postid) VALUES (?, ?)',
        params);
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
        params);
    return rows;
  } catch (err) {
    console.log('likeModel error', err.message);
    return {error: 'DB Error'};
  }
};

module.exports = {
  getPostLikesCount,
  addLike,
  deleteLike,
  getLiker,
};
