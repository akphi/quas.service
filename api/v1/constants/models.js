"use strict";

let processingMode = {
  DO_NOT_PROCESS: "DO_NOT_PROCESS",
  DONE: "DONE",
  VALID: "VALID",
  INVALID: "INVALID",
  SKIPPED: "SKIPPED",
  RAW: "RAW"
}

let type = {
  STRING: "STRING",
  NUMBER: "NUMBER",
  BOOLEAN: "BOOLEAN",
  DATE: "DATE",
  MIXED: "MIXED"
}

module.exports = { processingMode, type };