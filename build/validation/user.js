"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoginSchema = exports.UpdateSchema = exports.CreateSchema = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var CreateSchema = _joi["default"].object().keys({
  name: _joi["default"].string().required().min(3),
  email: _joi["default"].string().required().min(5).pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'email'),
  image: _joi["default"].string().min(8).pattern(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/, 'link'),
  imageId: _joi["default"].string().min(3),
  password: _joi["default"].string().required().min(6).pattern(/^[a-zA-Z\d\s.!@#$%&*()_+-=:?]{6,}$/, 'password')
});

exports.CreateSchema = CreateSchema;

var UpdateSchema = _joi["default"].object().keys({
  name: _joi["default"].string().min(3),
  role: _joi["default"].string(),
  image: _joi["default"].string().min(8).pattern(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/, 'link'),
  email: _joi["default"].string().min(5).pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'email'),
  imageId: _joi["default"].string().min(3),
  password: _joi["default"].string().min(6).pattern(/^[a-zA-Z\d\s.!@#$%&*()_+-=:?]{6,}$/, 'password')
});

exports.UpdateSchema = UpdateSchema;

var LoginSchema = _joi["default"].object().keys({
  email: _joi["default"].string().min(6).required().pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'email'),
  password: _joi["default"].string().min(5).required().pattern(/^[a-zA-Z\d\s.!@#$%&*()_+-=:?]{6,}$/, 'password')
});

exports.LoginSchema = LoginSchema;