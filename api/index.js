"use strict";

let router = require("express").Router();
let config = require("../server/setup/config");
let trafficLogger = require("../server/setup/logger").stream;
let morgan = require("morgan")(config.get("TRAFFIC_LOG_FORMAT"), {
  skip: (req, res) => {
    if (req.originalUrl.match(/^\/api\/v\d\/docs/)) {
      return true; // skip docs file download report
    }
    if (res.statusCode < 400) {
      return true; // only return error
    }
    return false;
  },
  stream: trafficLogger
});
router.use(morgan);

// API versioning
let v1 = require("./v1").router;
router.use("/v1", v1);

module.exports = router;