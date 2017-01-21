'use strict';

let express = require('express');
let router = express.Router();

router.use('/', require('./books'));
router.use('/:book_id', require('./book'));

module.exports = router;