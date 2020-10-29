"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = exports.getAll = void 0;

var _Query = _interopRequireDefault(require("../models/Query"));

var _async = _interopRequireDefault(require("../middlewares/async"));

var _utils = _interopRequireDefault(require("../utils"));

var _validation = require("../validation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getAll = (0, _async["default"])( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var queries;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _Query["default"].find();

          case 2:
            queries = _context.sent;

            _utils["default"].success(res, 200, {
              count: queries.length,
              queries: queries
            }, 'Successfully retrieved');

          case 4:
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
exports.getAll = getAll;
var create = (0, _async["default"])( /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var _validate, errors, query;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _validate = (0, _validation.validate)(_validation.queryValidate, req.body), errors = _validate.details;

            if (!errors) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return", _utils["default"].error(res, 400, errors[0].message, errors[0]));

          case 3:
            _context2.next = 5;
            return _Query["default"].create(req.body);

          case 5:
            query = _context2.sent;
            return _context2.abrupt("return", _utils["default"].success(res, 201, query, 'query submitted'));

          case 7:
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
exports.create = create;