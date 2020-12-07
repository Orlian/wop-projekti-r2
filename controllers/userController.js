'use strict';

const {validationResult} = require('express-validator');
const userModel = require('../models/userModel');
const {makeThumbnail} = require('../utils/resize');
//TODO Tänne loput controllerin vaatimat requiret sun muut

const user_list_get = async (req, res) => {
  const users = await userModel.getAllUsers();
  res.json(users);
};

//Täytyy hakea emaililla
const user_get = async (req, res) => {
  const user = await userModel.getUser(req.user.email);
  res.json(user);
};

const make_thumbnail = async (req, res, next) => {
  try {
    const thumbnail = await makeThumbnail(req.file.path, req.file.filename);
    console.log('thumbnail', thumbnail);
    if (thumbnail) {
      next();
    }
  } catch (e) {
    res.status(400).json({errors: e.message});
  }
};

module.exports = {
  user_list_get,
  user_get,
  make_thumbnail,
}