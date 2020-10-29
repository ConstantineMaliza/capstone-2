"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var asyncHandler = function asyncHandler(func) {
  return function (req, res, next) {
    return Promise.resolve(func(req, res, next))["catch"](next);
  };
};

var _default = asyncHandler;
exports["default"] = _default;