'use strict';

module.exports = {

  REQUIRED: "This field is required",
  MISMATCH: "The input does not match required format",
  LENGTH_BOUNDED: "Length must be between {{min}} and {{max}} characters",
  LENGTH_LOWER: "Length must be greater than {{min}} characters",
  LENGTH_UPPER: "Length must be less than {{max}} characters",

  USER_USERNAME_DUPLICATED: "Username is already taken",
  USER_USERNAME_RULE_1: "A-Za-z0-9_. are allowed",
  USER_USERNAME_RULE_2: "_ and . are not allowed to stay near one another",
  USER_USERNAME_RULE_3: "_ and . are not allowed at either ends",
}