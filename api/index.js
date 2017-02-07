'use strict';

let router = require('express').Router();
let trafficLogger = require('../setup/logger').stream;
router.use(require('morgan')('(:status) :method :url - :referrer :remote-user :remote-addr :response-time ms - Length :res[content-length]', { "stream": trafficLogger }));

// API versioning
router.use('/v1', require('./v1').router);

module.exports = router;