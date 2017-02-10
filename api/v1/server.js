"use strict";

let projectPath = "../../";
let serverPath = "../../server/";

module.exports = {
  path: {
    base: projectPath,
    database: serverPath + "database/",
    setup: serverPath + "setup/",
    constants: serverPath + "constants/"
  },
  databaseEngine: require(serverPath + "database/engine"),
  logger: require(serverPath + "setup/logger"),
  config: require(serverPath + "setup/config"),
  loggerMessage: require(serverPath + "constants/server.logger")
};