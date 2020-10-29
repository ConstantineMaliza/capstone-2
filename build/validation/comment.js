"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var CreateSchema = _joi["default"].object().keys({
  author: _joi["default"].string().required().min(3),
  body: _joi["default"].string().required().min(6)
});

var _default = CreateSchema;
exports["default"] = _default;