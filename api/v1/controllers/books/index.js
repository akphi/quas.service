'use strict';

let express = require('express');
let router = express.Router();
let logger = require('../../../../setup/logger')('ROUTER');

router.use('/', require('./books'));
router.use('/:book_id', require('./book'));

module.exports = router;