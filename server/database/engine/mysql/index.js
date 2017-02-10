"use strict";

let config = require("../../../setup/config");
let mysql2 = require("mysql2");
let logger = require("../../../setup/logger").server("DATABASE");
let serverMessage = require("../../../constants/server.logger");

let connections = {};

let createConnectionPool = (options, callback) => {
  connections[options.name] = mysql2.createPool({
    host: options.host,
    port: options.port,
    database: options.database,
    user: options.username,
    password: options.password,
    connectionLimit: Number(config.get("DB_MYSQL_POOL_SIZE")),
    acquireTimeout: Number(config.get("DB_MYSQL_TIMEOUT"))
  })
  connections[options.name].getConnection((error, connection) => {
    if (error) {
      logger.info(serverMessage.DATABASE_CONNECTION_FAILURE, error);
      callback(error);
    } else {
      connection.release();
      logger.info(serverMessage.DATABASE_CONNECTION_SUCCESS, "(" + options.name + ") " + options.host + ":" + options.port + "/" + options.database);
      callback()
    }
  });
};

module.exports = {
  roles: require("./roles"),
  tool: require("./tools"),
  createConnectionPool: createConnectionPool,
  as: (roleName) => {
    return connections[roleName];
  }
};