"use strict";

let router = require("express").Router();
let yaml = require("js-yaml");
let swaggerUi = require("swagger-ui-express");
let fs = require("fs");
let response = require("./helpers/response");
let cors = require("./middlewares/cors");
let ratelimiter = require("./middlewares/ratelimiter");
let controllers = require("./controllers");
let logger = require("./server").logger.api("ROUTER", "v1");
let apiMessage = require("./constants/api.logger");

fs.readFile(__dirname + "/docs/swagger.yaml", { encoding: "utf-8" }, (errReadFile, data) => {
  if (errReadFile) {
    logger.error(apiMessage.DOCS_LOAD_FAILED, errReadFile);
  } else {
    router.use("/docs", swaggerUi.serve, swaggerUi.setup(yaml.load(data)));
  }
});

router.use("/", cors);
router.use("/", ratelimiter);
router.use("/", controllers);
router.use(response.errorSystem);

module.exports = { router };