'use strict';

const pool = require('../database/db');
const promisePool = pool.promise();

//Hakee yksittäisen kommentin
const getComment = async (commentId) => {
  try {
    const [rows] = await promisePool.execute('SELECT * FROM Comment WHERE commentid = ?', [commentId]);
    return rows;
  } catch(err) {
    console.log('commentModel error', err.message);
  }
}

//Hakee yhden postin viimeisimmät 20 kommentia timestampin perusteella
const getPostComments = async (postId) => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT commentcontent, User.username, timestamp FROM Comment INNER JOIN User ON Comment.userid = User.userid WHERE postid = ? ORDER BY timestamp DESC',
        [postId]);
    return rows;
  } catch (err) {
    console.log('commentModel error', err.message);
  }
};

//Hakee yhden käyttäjän kaikki kommentit
const getUserComments = async (userid) => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT commentid, commentcontent, postid, timestamp FROM Comment WHERE userid = ?', [userid]);
    return rows;
  } catch (err) {
    console.log('commentModel error', err.message);
  }
};

//Kommentin lisääminen tiettyyn postaukseen
const addComment = async (params) => {
  try {
    const [rows] = await promisePool.execute(
        'INSERT INTO Comment (commentcontent, postid, userid, timestamp) VALUES (?, ?, ?, NOW())',
        params);
    return rows;
  } catch (err) {
    console.log('commentModel error', err.message);
  }
};

//Poistaa yksittäisen kommentin
const deleteComment = async (commentId) => {
  try {
    await promisePool.execute('DELETE FROM Comment WHERE commentid = ?',[commentId]);
  } catch(err) {
    console.log('commentModel error', err.message);
  }
}

module.exports = {
  getComment,
  getPostComments,
  getUserComments,
  addComment,
  deleteComment,
}