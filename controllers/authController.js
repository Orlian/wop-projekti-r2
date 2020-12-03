'use strict';

const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const userModel = require('../models/userModel');

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
      const token = jwt.sign(user, 'this_is_a_mega_secret');
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
    const param = [
        req.body.username,
    ]
    const check = await userModel.getUsername(param);
    console.log('username_check', check, '\nreq.body.username', req.body.username);
      if(!check.empty()) {
        res.json({message: 'username unavailable'});
      }
      res.json({message: 'username ok'});
  } catch (err){
    res.send({error: 'Something went wrong'});
  }

}

module.exports = {
  login,
  user_register,
  logout,
  user_check,
};