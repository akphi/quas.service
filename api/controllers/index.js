'use strict';

var express = require('express');
var router = express.Router();
var path = require('path');

// router.use('/', require('../middlewares/cors'));

router.use('/books', require('./books'));

module.exports = router;