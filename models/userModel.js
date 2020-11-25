'use strict';

const pool = require('../database/db');
const promisePool = pool.promise();

const getAllUsers = async () => {
  try {
    const [rows] = await promisePool.query('SELECT email, username FROM user');
    return rows;
  } catch (err) {
    console.log('userModel error', err.message);
  }
};

const getUser = async (email) => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT email, username, desc, user_img FROM user WHERE email = ?',
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
        'INSERT INTO user (email, password, birthdate, user_img, desc, username) VALUES (?, ?, ?, ?, ?, ?)',
        params);
    return rows;
  } catch (err) {
    console.log('userModel error', err.message);
  }
};

const updateUser = async (params) => {
  try {
    const [rows] = promisePool.execute(
        'UPDATE user SET password = ?, user_img = ?, desc = ?, username = ? WHERE email = ?',
        params);
    return rows;
  } catch (err) {
    console.log('userModel error', err.message);
  }
};

const deleteUser = async (email) => {
  try {
    await promisePool.execute('DELETE FROM user WHERE email = ?', [email]);
  } catch (err) {
    console.log('userModel error', err.message);
  }
};

module.exports = {
  getAllUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
}