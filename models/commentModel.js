'use strict';

const pool = require('../database/db');
const promisePool = pool.promise();

//Hakee kommentoijan
const getCommenter = async (params) => {
  try {
    const [rows] = await promisePool.execute('SELECT commentid FROM Comment WHERE postid = ? AND userid=?', params);
    return rows;
  } catch(err) {
    console.log('commentModel error', err.message);
  }
}

//Hakee yhden postin kommentia timestampin perusteella
const getPostComments = async (postId) => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT commentid, commentcontent, User.username, timestamp FROM Comment INNER JOIN User ON Comment.userid = User.userid WHERE postid = ? ORDER BY timestamp DESC',
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
const deleteComment = async (params) => {
  try {
    await promisePool.execute('DELETE FROM Comment WHERE commentid=? AND postid = ? AND userid = ?', params);
  } catch(err) {
    console.log('commentModel error', err.message);
  }
}

module.exports = {
  getCommenter,
  getPostComments,
  getUserComments,
  addComment,
  deleteComment,
}