'usestrict';

var config = require('nconf');

module.exports = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', config.get('NODE_HOST'));
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.sendStatus(200);
    }
    else {
      next();
    }
};