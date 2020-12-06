'use strict';
const searchModel = require('../models/searchModel');
const {validationResult} = require('express-validator');

const search_get_posts = async (req, res) => {
  const posts = await searchModel.getSearchResult(req.body.search);
  res.json(posts);
};

module.exports = {
  search_get_posts,
};