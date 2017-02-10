"use strict";

let moment = require("moment");

// DATE_FORMAT_STANDARD: moment.ISO_8601,
// DATE_FORMAT_DATABASE: "YYYY-MM-DD HH:MM:SS"

let execute = (query, pool, callback) => {
  pool.getConnection((errorConnection, connection) => {
    if (errorConnection) {
      callback(errorConnection);
    } else {
      connection.execute(query.string, query.params, function (errExecuteQuery, rows, columns) {
        connection.release();
        connection.unprepare(query.string);
        if (errExecuteQuery) {
          callback(errExecuteQuery);
        } else {
          callback(null, rows, columns)
        }
      });
    }
  });
};

let find = (projection, criteria, tableName, pool, callback) => {
  execute(queryBuilder(["SELECT", projection, "FROM", tableName, "WHERE", { data: criteria }]), pool, (errDB, result) => {
    if (errDB) {
      callback(errDB);
    } else {
      callback(null, result);
    }
  });
};

let findOne = (projection, criteria, tableName, pool, callback) => {
  execute(queryBuilder(["SELECT", projection, "FROM", tableName, "WHERE", { data: criteria }, "LIMIT 1"]), pool, (errDB, result) => {
    if (errDB) {
      callback(errDB);
    } else {
      callback(null, result);
    }
  });
};

let insert = (data, tableName, pool, callback) => {
  let group = groupParamsBuilder(data);
  execute(queryBuilder(["INSERT INTO", tableName, group.keys, "VALUES", group.values]), pool, (errDB, result) => {
    if (errDB) {
      callback(errDB);
    } else {
      callback(null, result);
    }
  });
};

let update = (query, pool, callback) => {
  callback();
};

let remove = (query, pool, callback) => {
  callback();
};

let stringToDate = (input) => {
  return moment(input).format("YYYY-MM-DD HH:MM:SS");
}

let parseDbObject = (input, callback) => {
  callback();
}

let groupParamsBuilder = (objArrays, referenceKeys) => {
  let paramsGroup = [];
  let objs = objArrays.length ? objArrays : [objArrays];
  let keys = referenceKeys ? referenceKeys : Object.keys(objs[0]);
  objs.map((obj) => {
    let tempGroup = [];
    keys.map((field) => {
      tempGroup.push(obj[field]);
    })
    paramsGroup.push(tempGroup);
  })
  if (paramsGroup.length === 1) {
    return { keys: { paramNames: keys }, values: { param: paramsGroup[0] } };
  }
  return { keys: { paramNames: keys }, values: { params: paramsGroup } };
}

let queryBuilder = (queryArray) => {
  let queryParams = [];
  let queryString = queryArray.map((item) => {
    if (typeof item === "object") {
      if (item.data) {
        queryParams.push(item.data[Object.keys(item.data)[0]]);
        return (Object.keys(item.data)[0] + "= ?");
      } else if (item.paramNames) {
        return "(" + item.paramNames.join(",") + ")";
      } else if (item.param) {
        queryParams = queryParams.concat(item.param);
        return "(" + (item.param.fill("?")).join(",") + ")";
      } else if (item.params) {
        item.params = item.params.map((param) => {
          queryParams = queryParams.concat(param);
          return "(" + (param.fill("?")).join(",") + ")";
        });
        return item.params.join(",");
      } else if (item.length) {
        return item.join(",");
      }
    } else {
      return item;
    }
  })
  return { string: queryString.join(" "), params: queryParams };
}

module.exports = {
  execute, find, findOne, insert, update, remove,
  stringToDate, parseDbObject,
  groupParamsBuilder, queryBuilder
};