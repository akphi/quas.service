'use strict';

var router = require('express').Router();
var logger = require('../helpers/logger')('API-VERSION-INDEX');
var trafficLogger = require('../helpers/logger').stream;
router.use(require('morgan')('(:status) :method :url - :referrer :remote-user :remote-addr :response-time ms - Length :res[content-length]', { "stream": trafficLogger }));

router.use('/', require('../middlewares/cors'));
router.use('/', require('../middlewares/ratelimiter'));
router.use('/v1', require('./v1'));

module.exports = router;