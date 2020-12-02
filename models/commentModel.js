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
        'SELECT commentid, commentcontent, email, timestamp FROM Comment WHERE postid = ? ORDER BY timestamp DESC LIMIT 20',
        [postId]);
    return rows;
  } catch (err) {
    console.log('commentModel error', err.message);
  }
};

//Hakee yhden käyttäjän kaikki kommentit
const getUserComments = async (email) => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT commentid, commentcontent, postid, timestamp FROM Comment WHERE email = ?', [email]);
    return rows;
  } catch (err) {
    console.log('commentModel error', err.message);
  }
};

//Kommentin lisääminen tiettyyn postaukseen
const addComment = async (params) => {
  try {
    const [rows] = await promisePool.execute(
        'INSERT INTO Comment (commentcontent, postid, email, timestamp) VALUES (?, ?, ?, NOW())',
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
  getPostComments,
  getUserComments,
  addComment,
  deleteComment,
}