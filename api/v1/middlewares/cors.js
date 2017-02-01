'use strict';

let config = require('../../../setup/config');
let corser = require('corser');
let logger = require('../../../setup/logger').api('MIDDLEWARE', 'v1');

// // Customize Method
// module.exports = (req, res, next) => {
//     let corserRequestListener = corser.create({
//         origins: config.get('CORS_DOMAINS'),
//         // requestHeaders: ["AUTHORIZATION", "CONTENT-TYPE"],
//         // methods: ["GET", "POST", "PUT", "DELETE"],
//         endPreflightRequests: false
//     });

//     corserRequestListener(req, res, () => {
//         if (req.method === "OPTIONS") {
//             res.writeHead(204);
//             res.end();
//         } else {
//             next();
//         }
//     });
// };

module.exports = corser.create({
  origins: config.get('CORS_DOMAINS'),
  requestHeaders: config.get('CORS_HEADERS'),
  methods: config.get('CORS_METHODS'),
  endPreflightRequests: config.get('CORS_END_PREFLIGHT')
});