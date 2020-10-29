"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var BlogSchema = new _mongoose.Schema({
  title: {
    type: String,
    unique: [true, 'Please provide another title'],
    required: [true, "Please provide a blog sender's title"]
  },
  body: {
    type: String,
    required: [true, 'Please provide a blog body']
  },
  image: {
    type: String,
    "default": 'https://via.placeholder.com/340x230.png?text=no+image',
    required: [true, 'Please provide a blog image!']
  },
  imageId: {
    type: String
  },
  comments: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }]
}, {
  timestamps: true
});

var _default = (0, _mongoose.model)('Blog', BlogSchema);

exports["default"] = _default;