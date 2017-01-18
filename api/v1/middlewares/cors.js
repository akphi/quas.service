'use strict';

let config = require('../../../setup/config');
let corser = require('corser');
let logger = require('../../../setup/logger')('MIDDLEWARE');


// // Customize Method
// module.exports = (req, res, next) => {
//     let corserRequestListener = corser.create({
//         origins: [config.get('NODE_HOST')],
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
  origins: [config.get('NODE_HOST')],
  requestHeaders: ['AUTHORIZATION', 'CONTENT-TYPE'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  endPreflightRequests: true
});