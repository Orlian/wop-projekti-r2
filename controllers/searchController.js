'use strict';
const searchModel = require('../models/searchModel');
const {validationResult} = require('express-validator');

const search_get_posts = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }
  const wildCardParam = '%' + req.params.inputs + '%';
  const params = [wildCardParam, wildCardParam];
  const posts = await searchModel.getSearchResult(params);
  res.json(posts);
};

module.exports = {
  search_get_posts,
};