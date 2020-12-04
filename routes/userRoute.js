'use strict';
const express = require('express');
const {body} = require('express-validator');
const router = express.Router();
const multer  = require('multer');
const userController = require('../controllers/userController');

const upload = multer({ dest: './uploads/' }); //app.js suhteen

router.get('/', userController.user_list_get);


router.get('/:email', userController.user_get);


router.put('/', (req,res) =>{
  res.send('With this endpoint you can edit users.')
});

router.delete('/', (req,res) =>{
  res.send('With this endpoint you can delete users.')
});

module.exports = router;