"use strict";

let async = require("async");
let rule = require("../rules");
let methods = require("./methods");

let logger = require("../../server").logger.api("VALIDATOR", "v1");
let apiLoggerMessage = require("../../constants/api.logger");
let response = require("../../helpers/response");
let utils = require("../../helpers/utils");
let processingMode = require("../../constants/models").processingMode;

const validateObject = (req, res, next, callbackMain, option) => {
  let error = [];
  let resultValidation = {};
  let processingInstruction = generateProcessingInstruction(req.body, option.skip);
  async.parallel(option.field.map((attribute) => {
    return (callback) => { validateAttribute(req, resultValidation, error, rule[attribute], processingInstruction, callback); }
  }), (errorAsync) => {
    if (errorAsync) {
      error.push(new Error(errorAsync));
    }
    if (error.length !== 0) {
      return next({ logger: logger, error: { message: apiLoggerMessage.VALIDATION_ENGINE_FAILURE, data: error } });
    } else {
      if (!utils.isEmptyObject(resultValidation)) {
        response.errorValidation(req, res, { field: resultValidation });
      } else {
        callbackMain(processingInstruction);
      }
    }
  });
};

const validateAttribute = (req, resultValidation, error, options, processingInstruction, callbackRootValidator) => {
  let errorValidationList = [];
  if ((typeof options.required === "boolean" && options.required) || options.required.value) {
    if (!methods["REQUIRE"](req, options.name, errorValidationList, options.required)) {
      validateAttributeCore(req, resultValidation, error, options, errorValidationList, processingInstruction, callbackRootValidator);
    } else {
      generateValidationResult(resultValidation, options.name, errorValidationList, processingInstruction);
      callbackRootValidator();
    }
  } else {
    // not-required + empty -> no validation
    if (!req.body[options.name] || (options.type === "string" && req.body[options.name].length === 0)) {
      callbackRootValidator();
    } else {
      validateAttributeCore(req, resultValidation, error, options, errorValidationList, processingInstruction, callbackRootValidator);
    }
  }
};

const validateAttributeCore = (req, resultValidation, error, options, errorValidationList, processingInstruction, callbackRootValidator) => {
  if (methods["TYPE"](req, options.name, errorValidationList, options.type)) {
    async.series(options.validator.map((option) => {
      return (callback) => { methods[option.function](error, req, options.name, errorValidationList, option, callback) };
    }), () => {
      generateValidationResult(resultValidation, options.name, errorValidationList, processingInstruction);
      callbackRootValidator();
    });
  } else {
    generateValidationResult(resultValidation, options.name, errorValidationList, processingInstruction);
    callbackRootValidator();
  }
};

const generateValidationResult = (resultValidation, attributeName, errorValidationList, processingInstruction) => {
  processingInstruction[attributeName] = processingMode.VALID;
  if (errorValidationList.length !== 0) {
    processingInstruction[attributeName] = processingMode.INVALID;
    resultValidation[attributeName] = errorValidationList;
  }
}

const generateProcessingInstruction = (validationObject, option) => {
  let processingInstruction = {};
  Object.keys(validationObject).map((field) => {
    processingInstruction[field] = processingMode.RAW;
  })
  option.map((field) => {
    processingInstruction[field] = processingMode.SKIPPED;
  })
  return processingInstruction;
};

module.exports = { validateAttribute, validateObject };