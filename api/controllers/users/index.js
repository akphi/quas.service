'use strict';

var router = require('express').Router();
var logger = require('../../helpers/logger')('CONTROLLER-INDEX');

router.use('/', require('./users'));
router.use('/login', require('./login'));
// router.use('/logout', require('./logout'));
router.use('/:user_id', require('../../middlewares/authentication'), require('./user'));

module.exports = router;