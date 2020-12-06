'use strict';

//TODO Tänne tulee haku itse tietokannasta sql-lauseella
const pool = require('../database/db');
const promisePool = pool.promise();

const getSearchResult = async (params) => {
  try {
    console.log('searchModel params', params);
    const [rows] = await promisePool.execute(
        'SELECT DISTINCT postid, imgfile, caption, User.username, timestamp FROM Post INNER JOIN User ON User.userid = Post.userid WHERE caption LIKE ? OR username LIKE ?',
        params);
    console.log('searchModel rows', rows);
    return rows;
  } catch (err) {
    console.log('SearchModel error', err.message);
  }
};

module.exports = {
  getSearchResult,
};