'use strict';

var express = require('express');
var router = express.Router();
var logger = require('../../helpers/logger')('CONTROLLER-INDEX');

router.use('/', require('./books'));
router.use('/:book_id', require('./book'));

module.exports = router;