'use strict';
const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const searchController = require('../controllers/searchController');


router.post('/search', searchController.search_get_posts, [
    body('search', 'Give me something to search for').trim().escape().isLength({min: 1})
]);


module.exports = router;