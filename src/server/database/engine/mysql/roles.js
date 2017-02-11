"use strict";

let config = require("../../../setup/config");

module.exports = [
  {
    name: "public",
    host: config.get("DB_MYSQL_HOST"),
    port: config.get("DB_MYSQL_PORT"),
    username: config.get("DB_MYSQL_PUBLIC_USERNAME"),
    password: config.get("DB_MYSQL_PUBLIC_PASSWORD"),
    database: config.get("DB_MYSQL_DATABASE")
  },
  {
    name: "user",
    host: config.get("DB_MYSQL_HOST"),
    port: config.get("DB_MYSQL_PORT"),
    username: config.get("DB_MYSQL_USER_USERNAME"),
    password: config.get("DB_MYSQL_USER_PASSWORD"),
    database: config.get("DB_MYSQL_DATABASE")
  }
]