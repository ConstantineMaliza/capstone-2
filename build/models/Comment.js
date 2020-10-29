"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var CommentSchema = new _mongoose.Schema({
  body: {
    type: String,
    required: [true, 'Please provide a comment body']
  },
  author: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

var _default = (0, _mongoose.model)('Comment', CommentSchema);

exports["default"] = _default;