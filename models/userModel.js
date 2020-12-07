'use strict';

const pool = require('../database/db');
const promisePool = pool.promise();

const getAllUsers = async () => {
  try {
    const [rows] = await promisePool.query('SELECT userid, email, username FROM User');
    return rows;
  } catch (err) {
    console.log('userModel error', err.message);
  }
};

const getUsername = async (username) => {
  try {
    const [rows] = await promisePool.execute('SELECT username FROM User WHERE username = ?', [username]);
    return rows;
  } catch (err) {
    console.log('userModel error', err.message);
  }
}


//Täytyy hakea emaililla tämä
const getUser = async (email) => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT userid, email, username, description, userimg FROM User WHERE email = ?',
        [email]);
    return rows;
  } catch (err) {
    console.log('userModel error', err.message);
  }
};

const addUser = async (params) => {
  try {
    //TODO Varmista sql-lauseen toimivuus valinnaisen datan kanssa
    const [rows] = await promisePool.execute(
        'INSERT INTO User (email, password, userimg, description, username) VALUES (?, ?, ?, ?, ?)',
        params);
    return rows;
  } catch (err) {
    console.log('userModel error', err.message);
  }
};

const getUserLogin = async (params) => {
  try {
    console.log('getUserLogin params', params);
    const [rows] = await promisePool.execute(
        'SELECT * FROM User WHERE email = ?;', params);
    console.log(rows, 'getuserlogin');
    return rows;
  } catch(e) {
    console.log('userModel error', e.message);
  }
};

const updateUser = async (params) => {
  try {
    const [rows] = promisePool.execute(
        'UPDATE User SET password = ?, userimg = ?, description = ?, username = ? WHERE userid = ?',
        params);
    return rows;
  } catch (err) {
    console.log('userModel error', err.message);
  }
};

const deleteUser = async (userid) => {
  try {
    await promisePool.execute('DELETE FROM User WHERE userid = ?', [userid]);
  } catch (err) {
    console.log('userModel error', err.message);
  }
};

module.exports = {
  getAllUsers,
  getUsername,
  getUser,
  addUser,
  updateUser,
  deleteUser,
  getUserLogin,
}