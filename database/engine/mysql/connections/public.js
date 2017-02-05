'use strict';

let config = require('../../../../setup/config');
let mysql2 = require('mysql2');
let logger = require('../../../../setup/logger').server('DATABASE');
let loggerMessage = require('../../../../constants/logger');

let pool = mysql2.createPool({
  host: config.get('DB_MYSQL_HOST'),
  port: Number(config.get('DB_MYSQL_PORT')),
  database: config.get('DB_MYSQL_DBNAME'),
  user: config.get('DB_MYSQL_PUBLIC_USERNAME'),
  password: config.get('DB_MYSQL_PUBLIC_PASSWORD'),
  connectionLimit: Number(config.get('DB_MYSQL_POOL_SIZE')),
  acquireTimeout: Number(config.get('DB_MYSQL_TIMEOUT'))
});

let checkConnection = (callback) => {
  pool.getConnection((error, connection) => {
    if (error) {
      logger.info(loggerMessage.DATABASE_CONNECTION_FAILURE, error);
      callback(error);
    } else {
      connection.release();
      logger.info(loggerMessage.DATABASE_CONNECTION_SUCCESS, config.get('DB_MYSQL_HOST') + ":" + config.get('DB_MYSQL_PORT') + "/" + config.get('DB_MYSQL_DBNAME'));
      callback()
    }
  });
};

module.exports = {
  connection: pool,
  checkConnection: checkConnection
};