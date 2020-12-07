'use strict';

const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const userModel = require('../models/userModel');
const {makeThumbnail} = require('../utils/resize');

const login = (req, res) => {
  passport.authenticate('local', {session: false}, (err, user, info) => {
    console.log('login', info);
    if (err || !user) {
      return res.status(400).json({
        message: 'Something went wrong',
        user: user,
      });
    }
    req.login(user, {session: false}, (err) => {
      if (err) {
        res.send(err.message);
      }
      console.log('login user', user);
      const token = jwt.sign(user, 'this_is_a_mega_secret');
      delete user.password;
      return res.json({user, token});
    });

  })(req, res);
};

const user_register = async (req, res) => {
  // Extract the validation errors from a request.
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('user register error', errors);
    res.send(errors.array());
  } else {
    const salt = bcrypt.genSaltSync(12);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const params = [
      req.body.email,
      hash,
      req.file.filename,
      req.body.description,
      req.body.username,
    ];
    console.log('user_register params', params);

    if (await userModel.addUser(params)) {
      res.status(200).json({message: 'register ok'});
    } else {
      res.status(400).json({error: 'register error'});
    }
  }
};

const logout = (req, res) => {
  req.logout();
  res.json({message: 'logout'});
};

const user_check = async (req, res) => {
  try {
    const rows = await userModel.getUsername(req.body.username);
      if(rows.length !== 0) {
        return res.json({message: 'username unavailable'});
      }
      return res.json({message: 'username ok'});
  } catch (err){
    res.send({error: 'Something went wrong'});
  }

}

const password_check = async (req, res) => {
  try {
    const [user] = await userModel.getUserLogin(req.params.email);
    if(!bcrypt.compareSync(passwordInput.value, user.password)) {
      return res.json({message: 'incorrect password'});
    }
    return res.json({message: 'password ok'});
  } catch (err){
    res.send({error: 'Something went wrong'});
  }
}

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
  login,
  user_register,
  logout,
  user_check,
  make_thumbnail,
  password_check,
};