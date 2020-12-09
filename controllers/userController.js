'use strict';

const {validationResult} = require('express-validator');
const userModel = require('../models/userModel');
const {makeThumbnail} = require('../utils/resize');
const bcrypt = require('bcryptjs');
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
  if(req.file){
    try {
      const thumbnail = await makeThumbnail(req.file.path, req.file.filename);
      console.log('thumbnail', thumbnail);
      if (thumbnail) {
        next();
      }
    } catch (e) {
      res.status(400).json({errors: e.message});
    }
  } else {
    next();
  }
};

const user_delete = async (req, res) => {
  const id = req.params.id;
  const user = await userModel.deleteUser(id);
  res.json(user);
};

const user_update = async (req, res) => {
  let params = [req.body.password, '', req.body.description, req.params.id];
  console.log('user_update password info', req.body.password, '\nuser_update params[0]', params);
  if(req.file !== undefined) {
    params = [req.body.password, req.file.filename, req.body.description, req.params.id];
    if(req.body.password !== undefined || req.body.password !== ''){
      const salt = bcrypt.genSaltSync(12);
      const hash = bcrypt.hashSync(req.body.password, salt);
      params = [hash, req.file.filename, req.body.description, req.params.id];
    }
  } else {
    if(req.body.password !== undefined || req.body.password !== ''){
      const salt = bcrypt.genSaltSync(12);
      const hash = bcrypt.hashSync(req.body.password, salt);
      params = [hash, '', req.body.description, req.params.id];
    }
  }
  console.log('user_update params', params);
  const user = await userModel.updateUser(params);
  console.log('user_update user', user);
  res.json(user);
}

module.exports = {
  user_list_get,
  user_get,
  make_thumbnail,
  user_delete,
  user_update,
}