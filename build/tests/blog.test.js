"use strict";

var _path = _interopRequireDefault(require("path"));

var _supertest = _interopRequireDefault(require("supertest"));

var _Blog = _interopRequireDefault(require("../models/Blog"));

var _User = _interopRequireDefault(require("../models/User"));

var _auth = require("../helpers/auth");

var _cloudinary = _interopRequireDefault(require("../config/cloudinary"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

describe('blog route', function () {
  var signupUser = {};
  var counter = 0;
  var testBlog = {
    title: 'Hello World',
    image: 'https://www.vippng.com/png/full/416-4161690_empty-profile-picture-blank-avatar-image-circle.png',
    body: 'today action'
  };
  var mockToken = "Bearer ".concat((0, _auth.signToken)({
    _id: signupUser._id,
    name: 'test',
    role: 'Guest',
    email: 'test@gmail.com',
    image: 'https://www.vippng.com/png/full/416-4161690_empty-profile-picture-blank-avatar-image-circle.png'
  }));
  beforeEach( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _Blog["default"].deleteMany({});

          case 2:
            _context.next = 4;
            return _User["default"].create({
              name: 'test',
              email: "test".concat(counter, "@gmail.com"),
              password: '$2b$12$xSd2pavqxxiSA09bGrENmeLN3Zkl89uJLXhWTS/lZEvXB3UdZ.hja'
            });

          case 4:
            signupUser = _context.sent;
            counter += 1;
            _context.next = 8;
            return signupUser.save();

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  afterAll( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _Blog["default"].deleteMany({});

          case 2:
            _context2.next = 4;
            return _User["default"].deleteMany({});

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  describe('POST', function () {
    it('should create post when valid token provided', /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(done) {
        var res;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return (0, _supertest["default"])(_app["default"]).post('/blog').set('authorization', mockToken).set('content-type', 'multipart/form-data').attach('image', _path["default"].join(__dirname, 'assets/dummy.txt')).field('title', testBlog.title).field('body', testBlog.body);

              case 2:
                res = _context3.sent;
                expect(res).toHaveProperty('status', 201);
                expect(res.body).toHaveProperty('status', 201);
                expect(res.body).toHaveProperty('message', 'Blog Created successfully');
                expect(res.body).toHaveProperty('data');
                expect(res.body.data).toHaveProperty('title', mockBlog.title);
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
  describe('GET all', function () {
    it('should read all posts', /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(done) {
        var testblogs, res;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                testblogs = [_objectSpread({}, testBlog), _objectSpread(_objectSpread({}, testBlog), {}, {
                  title: 'title of blog'
                }), _objectSpread(_objectSpread({}, testBlog), {}, {
                  title: 'title of blog 2'
                })];
                _context4.next = 3;
                return _Blog["default"].insertMany(testblogs);

              case 3:
                _context4.next = 5;
                return (0, _supertest["default"])(_app["default"]).get('/blog');

              case 5:
                res = _context4.sent;
                expect(res).toHaveProperty('status', 200);
                expect(res.body).toHaveProperty('status', 200);
                expect(res.body).toHaveProperty('data');
                expect(res.body.data).toHaveProperty('count', testblogs.length);
                expect(res.body.data).toHaveProperty('blogs');
                expect(res.body.data.blogs[0]).toHaveProperty('title', testBlog.title);
                done();

              case 13:
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
  });
  describe('GET /:blogId', function () {
    it('should read single post', /*#__PURE__*/function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(done) {
        var toRead, res;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return _Blog["default"].create(_objectSpread({}, testBlog));

              case 2:
                toRead = _context5.sent;
                _context5.next = 5;
                return toRead.save();

              case 5:
                _context5.next = 7;
                return (0, _supertest["default"])(_app["default"]).get("/blog/".concat(toRead._id));

              case 7:
                res = _context5.sent;
                expect(res).toHaveProperty('status', 200);
                expect(res.body).toHaveProperty('status', 200);
                expect(res.body).toHaveProperty('data');
                expect(res.body.data).toHaveProperty('title', toRead.title);
                done();

              case 13:
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
  });
});