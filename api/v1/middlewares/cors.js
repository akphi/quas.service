"use strict";

let corser = require("corser");
let config = require("../server").config;

module.exports = corser.create({
  origins: config.get("CORS_DOMAINS"),
  requestHeaders: config.get("CORS_HEADERS"),
  methods: config.get("CORS_METHODS"),
  endPreflightRequests: config.get("CORS_END_PREFLIGHT")
});