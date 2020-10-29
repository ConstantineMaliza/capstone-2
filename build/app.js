"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("@babel/polyfill");

var _express = _interopRequireWildcard(require("express"));

var _database = _interopRequireDefault(require("./config/database"));

var _passport = _interopRequireDefault(require("passport"));

var _routes = _interopRequireDefault(require("./routes"));

var _passport2 = require("./config/passport");

var _expressFileupload = _interopRequireDefault(require("express-fileupload"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

(0, _database["default"])();
var app = (0, _express["default"])();
app.use((0, _express.json)());
app.use((0, _express.urlencoded)({
  extended: false
}));
app.use((0, _expressFileupload["default"])({
  useTempFiles: true
}));
app.use(_routes["default"]);
app.use(_passport["default"].initialize());

_passport["default"].use(_passport2.jwtStrategy);

app.get('/', function (req, res) {
  res.end("hello world");
});
var _default = app;
exports["default"] = _default;