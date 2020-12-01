'use strict';

const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const userModel = require('../models/userModel');

const login = (req, res) => {
  passport.authenticate('local', {session: false}, (err, user, info) => {
    console.log('login', info);
    if(err || !user) {
      return res.status(400).json({
        message: 'Something went wrong',
        user: user
      });
    }
    req.login(user, {session: false}, (err) => {
      if(err) {
        res.send(err.message);
      }
      const token = jwt.sign(user, 'this_is_a_mega_secret');
      return res.json({user, token});
    });

  })(req, res);
};

const user_register = async (req, res, next) => {
  // Extract the validation errors from a request.
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log('user create error', errors);
    res.send(errors.array());
  } else {
    const salt = bcrypt.genSaltSync(12);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const {username, email, description} = req.body;
    const params = [
      //req.body.email,
      email,
      hash,
      req.file.filename,
      description,
      username,
      //req.body.user_image,
      //req.body.description,
      //req.body.username,
    ];
    console.log('user_register params', params);

    if (await userModel.addUser(params)) {
      next();
    } else {
      res.status(400).json({error: 'register error'});
    }
  }
};

const logout = (req, res) => {
  req.logout();
  res.json({message: 'logout'});
};

module.exports = {
  login,
  user_register,
  logout,
};