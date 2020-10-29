"use strict";

var _supertest = _interopRequireDefault(require("supertest"));

var _app = _interopRequireDefault(require("../app"));

var _User = _interopRequireDefault(require("../models/User"));

var _auth = require("../helpers/auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

describe('user', function () {
  beforeEach( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _User["default"].deleteMany({});

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
            return _User["default"].deleteMany({});

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  var SignupUser = {
    name: "maliza",
    email: "malizacoco@gmail.com",
    password: "$2b$12$xSd2pavqxxiSA09bGrENmeLN3Zkl89uJLXhWTS/lZEvXB3UdZ.hja"
  };
  var LoginUser = {
    email: 'malizacoco@gmail.com',
    password: 'Jannyda1'
  };
  describe('POST /signup', function () {
    it('should return valid token when the all request body is valid', /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(done) {
        var res, data;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return (0, _supertest["default"])(_app["default"]).post('/user/signup').send(SignupUser);

              case 2:
                res = _context3.sent;
                data = (0, _auth.verifyToken)(res.body.data);
                expect(res.status).toEqual(201);
                expect(res.body).toHaveProperty('status', 201);
                expect(res.body).toHaveProperty('data');
                expect(data).toHaveProperty('name', SignupUser.name);
                expect(data).toHaveProperty('email', SignupUser.email);
                done();

              case 10:
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
  describe('POST /login', function () {
    it('should validate email & password', /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(done) {
        var user, res, res2;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _User["default"].create(SignupUser);

              case 2:
                user = _context4.sent;
                _context4.next = 5;
                return user.save();

              case 5:
                _context4.next = 7;
                return (0, _supertest["default"])(_app["default"]).post('/user/login/').send(_objectSpread(_objectSpread({}, LoginUser), {}, {
                  email: 'null@nibo.haha'
                }));

              case 7:
                res = _context4.sent;
                expect(res.status).toEqual(404);
                expect(res.body).toHaveProperty('status', 404);
                expect(res.body).toHaveProperty('error');
                _context4.next = 13;
                return (0, _supertest["default"])(_app["default"]).post('/user/login/').send(_objectSpread(_objectSpread({}, LoginUser), {}, {
                  password: 'nuller'
                }));

              case 13:
                res2 = _context4.sent;
                expect(res2.status).toEqual(401);
                expect(res2.body).toHaveProperty('status', 401);
                expect(res2.body).toHaveProperty('message', 'wrong password');
                expect(res2.body).toHaveProperty('error');
                done();

              case 19:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      return function (_x2) {
        return _ref4.apply(this, arguments);
      };
    }());
    it('should return valid token when email & password are valid', /*#__PURE__*/function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(done) {
        var user, res, data;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return _User["default"].create(SignupUser);

              case 2:
                user = _context5.sent;
                _context5.next = 5;
                return user.save();

              case 5:
                _context5.next = 7;
                return (0, _supertest["default"])(_app["default"]).post('/user/login/').send(LoginUser);

              case 7:
                res = _context5.sent;
                data = (0, _auth.verifyToken)(res.body.data);
                expect(res.status).toEqual(200);
                expect(res.body).toHaveProperty('status', 200);
                expect(res.body).toHaveProperty('data');
                expect(data).toHaveProperty('name', SignupUser.name);
                expect(data).toHaveProperty('email', SignupUser.email);
                done();

              case 15:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      return function (_x3) {
        return _ref5.apply(this, arguments);
      };
    }());
  }); //  describe('POST /profile',() => {
  //     it('should return valid token and update the profile', async(done) =>{
  //         const user = await User.create(SignupUser);
  //         await user.save();
  //         const updateUser = {
  //             name: 'John',
  //         };
  //         const res = await request(app)
  //         .post(`/user/profile/${user._id}`)
  //         .send(updateUser);
  //         expect(res.status).toEqual(200);
  //         expect(res.body).toHaveProperty('data');
  //         expect(res.body.data).toHaveProperty('name', updateUser.name);
  //         done()
  //     })
  //  });
});