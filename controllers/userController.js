'use strict';

const {validationResult} = require('express-validator');
const userModel = require('../models/userModel');
//TODO Tänne loput controllerin vaatimat requiret sun muut

const user_list_get = async (req, res) => {
  const users = await userModel.getAllUsers();
  res.json(users);
};

const user_get = async (req, res) => {
  const email = req.params.email;
  const user = await userModel.getUser(email);
  res.json(user);
};


module.exports = {
  user_list_get,
  user_get,
}