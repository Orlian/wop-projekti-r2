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

const user_delete = async (req, res) => {
  const id = req.params.id;
  const user = await userModel.deleteUser(id);
  res.json(user);
};

const user_update = async (req, res) => {
  const params = [req.body.password, req.file.userimg, req.body.description, req.params.userid]
  const user = await userModel.updateUser(params);
  res.json(user);
}

module.exports = {
  user_list_get,
  user_get,
  make_thumbnail,
  user_delete,
  user_update,
}