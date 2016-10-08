'use strict';

var router = require('express').Router();
var logger = require('../../helpers/logger')('CONTROLLER-INDEX');

router.use('/books', require('./books'));
router.use('/users', require('./users'));

module.exports = router;