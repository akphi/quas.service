'use strict';

let router = require('express').Router();
let logger = require('../helpers/logger')('ROUTER');

router.use('/books', require('./books'));
router.use('/users', require('./users'));

module.exports = router;