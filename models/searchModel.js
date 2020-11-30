'use strict';

//TODO Tänne tulee haku itse tietokannasta sql-lauseella
const pool = require('../database/db');
const promisePool = pool.promise();

const getSearchResult = async (input) => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT postid, imgfile, caption, timestamp FROM post WHERE caption LIKE "%?%" UNION SELECT userimg, description, username FROM user WHERE username LIKE "%?% UNION SELECT categoryid FROM category WHERE categoryname LIKE "%?%',
        [input]);
    return rows;
  } catch (err) {
    console.log('SearchModel error', err.message);
  }
};

module.exports(
    getSearchResult,
);