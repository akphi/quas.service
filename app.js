'use strict';

// CONFIG
// =============================================================================
var express = require('express');
var app = express();
var router = require('./api/controllers');
var async = require('async');
var bodyParser = require('body-parser');
var config = require('./config/initializers/config');
var path = require('path');
var logger = require('./api/helpers/logger')('APP');

app.use(express.static('public'));
// configure app to use bodyParser() => allow get the data from a POST
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use('/api', router);

// SETUP SWAGGER
// =============================================================================
var SwaggerExpress = require('swagger-express-mw');
var SwaggerUi = require('swagger-tools/middleware/swagger-ui');
SwaggerExpress.create({
    appRoot: __dirname,
}, function (err, swaggerExpress) {
    if (err) { throw err; }
    // Add swagger-ui (This must be before swaggerExpress.register)
    app.use(SwaggerUi(swaggerExpress.runner.swagger, { apiDocs: '/api/api-docs', swaggerUi: '/api/docs' }));
    // Install middleware
    swaggerExpress.register(app);
    logger.info('Initialize Swagger');
});

// SETUP DATABASE
// =============================================================================
var mongoose = require('mongoose');
var mongodbList = {
    local: 'mongodb://localhost/db',
    remote: 'mongodb://test:test@ds033126.mlab.com:33126/quas-test'
}
mongoose.Promise = global.Promise;
mongoose.connect(mongodbList[config.get('DB_LOCATION')], {
    server: {
        socketOptions: {
            keepAlive: 300000,
            connectTimeoutMS: 30000
        }
    },
    replset: {
        socketOptions: {
            keepAlive: 300000,
            connectTimeoutMS: 30000
        }
    }
});
mongoose.connection
    .on('connected', () => {
        logger.info('Mongoose connection open to', mongodbList[config.get('DB_LOCATION')]);
    })
    .on('error', (error) => {
        logger.error('Mongoose connection error: ', error);
    });

// Initialize Modules
// async.series([
//     function initializeDBConnection(callback) {
//         require('./config/initializers/database')(callback);
//     },
//     function startServer(callback) {
//         server(callback);
//     }], function (err) {
//         if (err) {
//             logger.error('[APP] initialization failed', err);
//         } else {
//             logger.info('[APP] initialized SUCCESSFULLY');
//         }
//     }
// );

app.listen(config.get('NODE_PORT'));

// SETUP TESTING
// =============================================================================
module.exports = app;
