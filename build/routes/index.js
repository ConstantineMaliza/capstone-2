"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _User = _interopRequireDefault(require("./User"));

var _Blog = _interopRequireDefault(require("./Blog"));

var _Comment = _interopRequireDefault(require("./Comment"));

var _Query = _interopRequireDefault(require("./Query"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.use('/user', _User["default"]);
router.use('/blog', _Blog["default"]);
router.use('/comment', _Comment["default"]);
router.use('/query', _Query["default"]);
var _default = router;
exports["default"] = _default;