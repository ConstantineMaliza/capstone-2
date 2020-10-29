"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = require("dotenv");

var _cloudinary = require("cloudinary");

(0, _dotenv.config)();

_cloudinary.v2.config(process.env.CLOUDINARY_URL);

var _default = _cloudinary.v2.uploader;
exports["default"] = _default;