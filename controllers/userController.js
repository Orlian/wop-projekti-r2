'use strict';

const {validationResult} = require('express-validator');
const userModel = require('../models/userModel');
//TODO Tänne loput controllerin vaatimat requiret sun muut

const user_list_get = async (req, res) => {
  const users = await userModel.getAllUsers();
  res.json(users);
};

//Täytyy hakea emaililla
const user_get = async (req, res) => {
  const userid = req.user.userid;
  const user = await userModel.getUser(userid);
  res.json(user);
};


module.exports = {
  user_list_get,
  user_get,
}