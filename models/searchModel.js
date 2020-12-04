'use strict';

//TODO Tänne tulee haku itse tietokannasta sql-lauseella
const pool = require('../database/db');
const promisePool = pool.promise();

const getSearchResult = async (input) => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT DISTINCT postid, imgfile, caption, userid, timestamp FROM Post INNER JOIN User ON User.userid = Post.userid WHERE caption LIKE "%?%" OR username LIKE "%?%"',
        [input]);
    return rows;
  } catch (err) {
    console.log('SearchModel error', err.message);
  }
};

module.exports(
    getSearchResult,
);