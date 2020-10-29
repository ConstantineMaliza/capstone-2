"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = exports.signToken = exports.decryptPassword = exports.encryptPassword = void 0;

require("@babel/polyfill");

var _dotenv = require("dotenv");

var _bcrypt = require("bcrypt");

var _jsonwebtoken = require("jsonwebtoken");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

(0, _dotenv.config)();
var JWT_SECRET = process.env.JWT_SECRET;

var encryptPassword = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(password) {
    var salt, hash;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _bcrypt.genSalt)(12);

          case 2:
            salt = _context.sent;
            _context.next = 5;
            return (0, _bcrypt.hash)(password, salt);

          case 5:
            hash = _context.sent;

            if (hash) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", false);

          case 8:
            return _context.abrupt("return", hash);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function encryptPassword(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.encryptPassword = encryptPassword;

var decryptPassword = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(password, hash) {
    var isValid;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _bcrypt.compare)(password, hash);

          case 2:
            isValid = _context2.sent;

            if (isValid) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", false);

          case 5:
            return _context2.abrupt("return", isValid);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function decryptPassword(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

exports.decryptPassword = decryptPassword;

var signToken = function signToken(_ref3) {
  var email = _ref3.email,
      userId = _ref3._id,
      name = _ref3.name,
      role = _ref3.role;
  var secret = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : JWT_SECRET;
  var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var tokeOptions = duration ? {
    expiresIn: duration
  } : undefined;
  var token = (0, _jsonwebtoken.sign)({
    email: email,
    userId: userId,
    name: name,
    role: role
  }, secret, tokeOptions);
  return token;
};

exports.signToken = signToken;

var verifyToken = function verifyToken(token) {
  var secret = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : JWT_SECRET;
  var decoded = (0, _jsonwebtoken.verify)(token, secret);
  return decoded;
};

exports.verifyToken = verifyToken;