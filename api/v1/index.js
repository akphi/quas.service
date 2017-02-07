'use strict';

let router = require('express').Router();
let swaggerUi = require('swagger-ui-express');
let swaggerDocument = require('./docs/swagger.json');
let response = require('./helpers/response');

router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
router.use('/', require('./middlewares/cors'));
router.use('/', require('./middlewares/ratelimiter'));
router.use('/', require('./controllers'));
router.use(response.errorSystem);

module.exports = { router };