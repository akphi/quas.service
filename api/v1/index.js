"use strict";

let router = require("express").Router();
let swaggerUi = require("swagger-ui-express");
let swaggerDocument = require("./docs/swagger.json");
let response = require("./helpers/response");
let cors = require("./middlewares/cors");
let ratelimiter = require("./middlewares/ratelimiter");
let controllers = require("./controllers");

router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
router.use("/", cors);
router.use("/", ratelimiter);
router.use("/", controllers);
router.use(response.errorSystem);

module.exports = { router };