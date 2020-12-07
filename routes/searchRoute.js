'use strict';
const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const searchController = require('../controllers/searchController');


router.post('/:inputs', [
    body('search', 'Give me something to search for').trim().escape().isLength({min: 1})
],searchController.search_get_posts);

router.get('/params/:inputs', searchController.search_get_posts_url);


module.exports = router;