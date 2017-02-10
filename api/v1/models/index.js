"use strict";

let async = require("async");
let processingMode = require("../constants/models").processingMode;
let utils = require("../helpers/utils");
let models = {
  user: require("./user"),
  book: require("./book")
}

let modelize = (modelName, dbName, processingInstruction, data, callback) => {
  let model = models[modelName];
  async.series([
    // Convert type
    (callbackMain) => {
      async.parallel(Object.keys(data).map((field) => {
        return (callbackTypeProcessing) => {
          switch (processingInstruction[field]) {
            case processingMode.SKIPPED:
              data[field] = model[field].default;
              return callbackTypeProcessing();
            case processingMode.VALID:
            case processingMode.DO_NOT_PROCESS:
              return utils.convertType(model[field].type, data[field], (error, result) => {
                if (error) {
                  return callbackTypeProcessing(error);
                }
                data[field] = result;
                return callbackTypeProcessing();
              });
            case processingMode.DONE:
              return callbackTypeProcessing();
            default:
              delete data[field];
              return callbackTypeProcessing();
          }
        }
      }),
        (error) => {
          if (error) {
            callbackMain({ message: "TYPE CONVERSION ERROR", data: error });
          } else { callbackMain(); }
        }
      )
    },
    // Apply post-processing functions and parsers
    (callbackMain) => {
      async.parallel(
        Object.keys(data).map((field) => {
          return (callbackPostProcessing) => {
            if ((processingInstruction[field] !== processingMode.DONE)
              && (processingInstruction[field] !== processingMode.DO_NOT_PROCESS)
              && model[field].postProcess) {
              data[field] = model[field].postProcess(data, field, callbackPostProcessing);
            } else {
              callbackPostProcessing();
            }
          }
        }).concat(
          (callbackPostProcessing) => {
            utils.parseDbObject(data, dbName, callbackPostProcessing);
          }),
        (error) => {
          if (error) {
            callbackMain({ message: "PROCESSING ERROR", data: error });
          } else { callbackMain(); }
        }
      );
    }
  ],
    (error) => {
      if (error) {
        callback(error);
      } else { callback(null, data); }
    }
  )
}

module.exports = { modelize };