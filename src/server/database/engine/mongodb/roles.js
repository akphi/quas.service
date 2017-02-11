"use strict";

let config = require("../../../setup/config");

module.exports = [
  {
    name: "public",
    host: config.get("DB_MONGO_HOST"),
    port: config.get("DB_MONGO_PORT"),
    username: config.get("DB_MONGO_PUBLIC_USERNAME"),
    password: config.get("DB_MONGO_PUBLIC_PASSWORD"),
    database: config.get("DB_MONGO_DATABASE"),
    dbauthentication: config.get("DB_MONGO_DBAUTHENTICATION")
  },
  {
    name: "user",
    host: config.get("DB_MONGO_HOST"),
    port: config.get("DB_MONGO_PORT"),
    username: config.get("DB_MONGO_USER_USERNAME"),
    password: config.get("DB_MONGO_USER_PASSWORD"),
    database: config.get("DB_MONGO_DATABASE"),
    dbauthentication: config.get("DB_MONGO_DBAUTHENTICATION")
  }
]