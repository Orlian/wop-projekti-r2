'use strict';

//TODO Tänne tulee haku itse tietokannasta sql-lauseella
const pool = require('../database/db');
const promisePool = pool.promise();

const getSearchResult = async (input) => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT * FROM post WHERE desc LIKE "%?%"', [input]); //TODO Tee oleellinen sql haku
    return rows;
  } catch (err) {
    console.log('SearchModel error', err.message);
  }
};

module.exports(
    getSearchResult,
);