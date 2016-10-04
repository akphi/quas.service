'use strict';

var express = require('express');
var router = express.Router();
var logger = require('../helpers/logger')('CONTROLLER-INDEX');
var trafficLogger = require('../helpers/logger').stream;
router.use(require('morgan')('(:status) :method :url - :referrer :remote-user :remote-addr :response-time ms - Length :res[content-length]', { "stream": trafficLogger }));

router.use('/', require('../middlewares/cors'));
router.use('/books', require('./books'));
router.use('/users', require('./users'));
router.use('/authenticate', require('./users'));

module.exports = router;