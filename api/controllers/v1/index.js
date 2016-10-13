'use strict';

var router = require('express').Router();
var logger = require('../../helpers/logger')('ROUTER');

router.use('/books', require('./books'));
router.use('/users', require('./users'));

module.exports = router;