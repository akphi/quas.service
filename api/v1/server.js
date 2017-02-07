'use strict';

module.exports = {
  path: {
    base: "../../",
    database: "../../database/",
    setup: "../../setup/",
    constants: "../../constants/"
  },
  databaseEngine: require("../../database/engine"),
  logger: require("../../setup/logger"),
  config: require("../../setup/config"),
  loggerMessage: require("../../constants/server.logger")
};