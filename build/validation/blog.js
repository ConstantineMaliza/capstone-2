"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateSchema = exports.CreateSchema = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var CreateSchema = _joi["default"].object().keys({
  title: _joi["default"].string().required().min(3),
  body: _joi["default"].string().required().min(6),
  imageId: _joi["default"].string().required(),
  image: _joi["default"].string().required().pattern(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/, 'link')
});

exports.CreateSchema = CreateSchema;

var UpdateSchema = _joi["default"].object().keys({
  title: _joi["default"].string().min(3),
  body: _joi["default"].string().min(6),
  imageId: _joi["default"].string(),
  image: _joi["default"].string().pattern(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/, 'link')
});

exports.UpdateSchema = UpdateSchema;