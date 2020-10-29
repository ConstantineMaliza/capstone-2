"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAll = exports.profile = exports.login = exports.signup = void 0;

var _validation = require("../validation");

var _User = _interopRequireDefault(require("../models/User"));

var _auth = require("../helpers/auth");

var _async = _interopRequireDefault(require("../middlewares/async"));

var _utils = _interopRequireDefault(require("../utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var signup = (0, _async["default"])( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var image, imageId, data, _validate, errors, hash, user;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            image = req.image, imageId = req.imageId;
            data = _objectSpread(_objectSpread({}, req.body), {}, {
              image: image,
              imageId: imageId
            });
            _validate = (0, _validation.validate)(_validation.userValidate.CreateSchema, data), errors = _validate.details;

            if (!errors) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", _utils["default"].error(res, 400, "Please provide ".concat(errors[0].context.key), errors[0]));

          case 5:
            _context.next = 7;
            return (0, _auth.encryptPassword)(data.password);

          case 7:
            hash = _context.sent;
            _context.next = 10;
            return _User["default"].create(_objectSpread(_objectSpread({}, data), {}, {
              password: hash
            }));

          case 10:
            user = _context.sent;

            if (user) {
              _context.next = 13;
              break;
            }

            return _context.abrupt("return", _utils["default"].error(res, 500, 'User not created!'));

          case 13:
            return _context.abrupt("return", _utils["default"].success(res, 201, (0, _auth.signToken)(user)));

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
exports.signup = signup;
var login = (0, _async["default"])( /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var _validate2, errors, _req$body, email, password, user, token;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _validate2 = (0, _validation.validate)(_validation.userValidate.LoginSchema, req.body), errors = _validate2.details;

            if (!errors) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return", _utils["default"].error(res, 400, "Please provide ".concat(errors[0].context.key), errors[0]));

          case 3:
            _req$body = req.body, email = _req$body.email, password = _req$body.password;
            _context2.next = 6;
            return _User["default"].findOne({
              email: email
            });

          case 6:
            user = _context2.sent;

            if (user) {
              _context2.next = 9;
              break;
            }

            return _context2.abrupt("return", _utils["default"].error(res, 404, 'wrong Credentials'));

          case 9:
            _context2.next = 11;
            return (0, _auth.decryptPassword)(password, user.password);

          case 11:
            if (_context2.sent) {
              _context2.next = 13;
              break;
            }

            return _context2.abrupt("return", _utils["default"].error(res, 401, 'wrong password'));

          case 13:
            token = (0, _auth.signToken)(user);
            return _context2.abrupt("return", _utils["default"].success(res, 200, token, 'Successfully Login in!'));

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
exports.login = login;
var profile = (0, _async["default"])( /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var error, image, imageId, data, hash, user;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            error = (0, _validation.validate)(_validation.userValidate.UpdateSchema, req.body);

            if (!error) {
              _context3.next = 3;
              break;
            }

            return _context3.abrupt("return", _utils["default"].error(res, 400, error.details[0].message, error));

          case 3:
            image = req.image, imageId = req.imageId;
            data = _objectSpread(_objectSpread({}, req.body), {}, {
              image: image,
              imageId: imageId
            });
            _context3.next = 7;
            return (0, _auth.encryptPassword)(data.password);

          case 7:
            hash = _context3.sent;
            _context3.next = 10;
            return _User["default"].findOneAndUpdate({
              _id: req.params.id
            }, _objectSpread(_objectSpread({}, data), {}, {
              password: hash
            }), {
              "new": true,
              runValidators: true
            });

          case 10:
            user = _context3.sent;

            if (user) {
              _context3.next = 13;
              break;
            }

            return _context3.abrupt("return", _utils["default"].error(res, 404, 'User not found!'));

          case 13:
            return _context3.abrupt("return", _utils["default"].success(res, 200, user));

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
exports.profile = profile;
var getAll = (0, _async["default"])( /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var users;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _User["default"].find();

          case 2:
            users = _context4.sent;

            _utils["default"].success(res, 200, {
              count: users.length,
              users: users
            }, 'Successfully retrieved');

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
exports.getAll = getAll;