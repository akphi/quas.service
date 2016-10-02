'usestrict';

var config = require('../../config/initializers/config');
var corser = require('corser');
var logger = require('../helpers/logger')('MIDDLEWARE-CORS');


// // Customize Method
// module.exports = (req, res, next) => {
//     var corserRequestListener = corser.create({
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
    requestHeaders: ["AUTHORIZATION", "CONTENT-TYPE"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    endPreflightRequests: true
});