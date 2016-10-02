'use strict';

var express = require('express');
var router = express.Router();
var logger = require('../helpers/logger')('CONTROLLER-INDEX');

router.use('/', require('../middlewares/cors'));
router.use('/books', require('./books'));

module.exports = router;