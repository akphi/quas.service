'use strict';

let router = require('express').Router();
let swaggerUi = require('swagger-ui-express');
let swaggerDocument = require('./docs/swagger.json');

router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
router.use('/', require('./middlewares/cors'));
router.use('/', require('./middlewares/ratelimiter'));
router.use('/', require('./controllers'));

module.exports = router;