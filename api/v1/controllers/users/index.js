'use strict';

let router = require('express').Router();

router.use('/', require('./users'));
router.use('/login', require('./login'));
router.use('/:user_id', require('../../middlewares/authentication'), require('./user'));

module.exports = router;