'use strict';

let isEmptyObject = (object) => {
  if (Object.keys(object).length === 0 && object.constructor == Object) {
    return true;
  }
  return false;
}


module.exports = { isEmptyObject };