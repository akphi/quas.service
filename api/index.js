"use strict";

let router = require("express").Router();
let config = require("../server/setup/config");
let trafficLogger = require("../server/setup/logger").stream;
let morgan = require("morgan")(config.get("TRAFFIC_LOG_FORMAT"), { "stream": trafficLogger });
let v1 = require("./v1").router;

router.use(morgan);

// API versioning
router.use("/v1", v1);

module.exports = router;