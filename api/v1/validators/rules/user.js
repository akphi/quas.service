'use strict';

let constants = require('../../constants/user');

const USER_PASSWORD = {
  name: "password",
  required: {
    value: true,
    function: "REQUIRE",
  },
  validator: [{
    function: "LENGTH",
    values: {
      min: constants.PASSWORD_MIN_LENGTH,
    }
  }]
}

const USER_USERNAME = {
  name: "username",
  required: {
    value: true,
    function: "REQUIRE",
  },
  validator: [{
    function: "LENGTH",
    values: {
      min: constants.USERNAME_MIN_LENGTH,
      max: constants.USERNAME_MAX_LENGTH,
    }
  },
  {
    function: "DUPLICATION",
    message: "USER_USERNAME_DUPLICATED",
    values: {
      schema: require('../../models/user')
    }
  },
  {
    function: "MATCH",
    message: "USER_USERNAME_RULE_1",
    values: {
      patterns: [new RegExp("^[a-zA-Z0-9._]+$")]
    }
  },
  {
    function: "CONTAIN",
    message: "USER_USERNAME_RULE_2",
    values: {
      exclusion: true,
      patterns: ["_.", "._", "..", "__"]
    }
  },
  {
    function: "MATCH",
    message: "USER_USERNAME_RULE_3",
    values: {
      patterns: [new RegExp("^(?![_.])"), new RegExp("[^_.]$")]
    }
  }]
}

module.exports = {
  USER_USERNAME,
  USER_PASSWORD
}