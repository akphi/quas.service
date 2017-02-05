'use strict';

let constants = require('../../constants/user');

const USER_PASSWORD = {
  name: "password",
  type: "string",
  required: true,
  validator: [{
    function: "LENGTH",
    values: {
      min: constants.PASSWORD_MIN_LENGTH
    }
  }]
}

const USER_USERNAME = {
  name: "username",
  type: "string",
  required: true,
  validator: [{
    function: "LENGTH",
    values: {
      min: constants.USERNAME_MIN_LENGTH,
      max: constants.USERNAME_MAX_LENGTH
    }
  },
  // {
  //   function: "DUPLICATION",
  //   message: "USER_USERNAME_DUPLICATED",
  //   values: {
  //     schema: require('../../../../database/models').get("user", "user")
  //   }
  // },
  {
    function: "MATCH",
    message: "USER_USERNAME_RULE_1",
    values: {
      exclusion: false,
      patterns: [/^[a-zA-Z0-9\._]+$/]
    }
  },
  {
    function: "MATCH",
    message: "USER_USERNAME_RULE_2",
    values: {
      exclusion: true,
      patterns: [/[_.]{2,}/]
    }
  },
  {
    function: "MATCH",
    message: "USER_USERNAME_RULE_3",
    values: {
      exclusion: false,
      patterns: [/^([^_.])/, /[^_.]$/]
    }
  }]
}

module.exports = {
  USER_USERNAME,
  USER_PASSWORD
}