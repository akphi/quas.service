'use strict';

let router = require('express').Router();
let logger = require('../helpers/logger')('ROUTER');
let trafficLogger = require('../helpers/logger').stream;
router.use(require('morgan')('(:status) :method :url - :referrer :remote-user :remote-addr :response-time ms - Length :res[content-length]', { "stream": trafficLogger }));

router.use('/', require('../middlewares/cors'));
router.use('/', require('../middlewares/ratelimiter'));
router.use('/v1', require('./v1'));

module.exports = router;