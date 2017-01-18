'use strict';

let router = require('express').Router();
let swaggerUi = require('swagger-ui-express');
let swaggerDocument = require('./docs/swagger.json');
let logger = require('./helpers/logger')('ROUTER');
let trafficLogger = require('./helpers/logger').stream;
router.use(require('morgan')('(:status) :method :url - :referrer :remote-user :remote-addr :response-time ms - Length :res[content-length]', { "stream": trafficLogger }));


router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
router.use('/', require('./middlewares/cors'));
router.use('/', require('./middlewares/ratelimiter'));
router.use('/', require('./controllers'));

module.exports = router;