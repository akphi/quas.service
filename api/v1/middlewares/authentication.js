"usestrict";

let config = require("../server").config;
let error = require("../constants/error");
let jwt = require("jsonwebtoken");
let response = require("../helpers/response");

module.exports = (req, res, next) => {
  let token = req.body.token || req.query.token || req.headers["authorization"];
  if (token) {
    jwt.verify(token, config.get("TOKEN_JWT_SECRET"), (err, decodedToken) => {
      if (err) {
        if (err.name == "TokenExpiredError") {
          // Token has expired
          return response.error(req, res, {
            status: "401",
            error: error.TOKEN_EXPIRED
          });
        } else {
          // Token is invalid or validation failed.
          return response.error(req, res, {
            status: "401",
            error: error.TOKEN_INVALID
          });
        }
      } else {
        // Token is valid, authentication succeeded.
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    // Token is missing.
    return response.error(req, res, {
      status: "401",
      error: error.TOKEN_MISSING
    });
  }
};
