"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var UserSchema = new _mongoose.Schema({
  email: {
    type: String,
    unique: [true, 'Email already in use!'],
    required: [true, 'Please provide an email!']
  },
  password: String,
  image: {
    type: String,
    "default": 'https://www.vippng.com/png/full/416-4161690_empty-profile-picture-blank-avatar-image-circle.png'
  },
  imageId: String,
  role: {
    type: String,
    "default": 'Guest',
    required: [true, 'Please provide a user role']
  },
  name: {
    type: String,
    required: [true, 'Please provide a user name'],
    unique: false
  }
}, {
  timestamps: true
});

var _default = (0, _mongoose.model)('User', UserSchema);

exports["default"] = _default;