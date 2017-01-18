'use strict';

let router = require('express').Router();
let logger = require('../../../../setup/logger')('ROUTER');

router.use('/', require('./users'));
router.use('/login', require('./login'));
// router.use('/logout', require('./logout'));
router.use('/:user_id', require('../../middlewares/authentication'), require('./user'));

module.exports = router;