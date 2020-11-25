'use strict';

const {validationResult} = require('express-validator');
const userModel = require('/models/userModel');
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

const user_create = async (req, res) => {
  console.log('Created user: ', req.body, req.file);

  //TODO Tarkista tietojen järjestys ja tarpeellisuus
  const {email, password, birthdate, desc, username} = req.body;
  const params = [email, password, birthdate, desc, username, req.file.filename];
  await userModel.addUser(params);

  res.json({message: 'upload oukelidoukeli'});
};


module.exports = {
  user_list_get,
  user_get,
  user_create,
}