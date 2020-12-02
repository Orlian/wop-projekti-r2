'use strict';

//TODO Tänne tulee haku itse tietokannasta sql-lauseella
const pool = require('../database/db');
const promisePool = pool.promise();

const getSearchResult = async (input) => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT DISTINCT postid, imgfile, caption, timestamp FROM Post INNER JOIN Categorise ON Post.postid = Categorise.postid INNER JOIN Category ON Category.categoryid = Categorise.categoryid INNER JOIN User ON User.email = Post.email WHERE caption LIKE "%?%" OR username LIKE "%?%" OR categoryname LIKE "%?%"',
        [input]);
    return rows;
  } catch (err) {
    console.log('SearchModel error', err.message);
  }
};

module.exports(
    getSearchResult,
);