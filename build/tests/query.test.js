"use strict";

var _supertest = _interopRequireDefault(require("supertest"));

var _auth = require("../helpers/auth");

var _Query = _interopRequireDefault(require("../models/Query"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

describe('query', function () {
  beforeEach( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _Query["default"].deleteMany({});

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  afterEach( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _Query["default"].deleteMany();

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  var testQuery = {
    name: 'user',
    email: 'user@gmail.com',
    body: 'yeshhguj jgk'
  };
  describe('Post/', function () {
    it('should return created query ', /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(done) {
        var res;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return (0, _supertest["default"])(_app["default"]).post('/query').send(testQuery);

              case 2:
                res = _context3.sent;
                expect(res.status).toEqual(201);
                expect(res.body).toHaveProperty('status', 201);
                expect(res.body.data).toHaveProperty('name', testQuery.name);
                expect(res.body.data).toHaveProperty('body', testQuery.body);
                expect(res.body.data).toHaveProperty('email', testQuery.email);
                done();

              case 9:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function (_x) {
        return _ref3.apply(this, arguments);
      };
    }());
  });
});