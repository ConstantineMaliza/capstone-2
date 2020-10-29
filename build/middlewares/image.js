"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteImage = exports.uploadImage = void 0;

var _cloudinary = _interopRequireDefault(require("../config/cloudinary"));

var _async = _interopRequireDefault(require("./async"));

var _utils = _interopRequireDefault(require("../utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var uploadImage = (0, _async["default"])( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var tempFilePath, _yield$cloudinary$upl, url, pid;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (req.files) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", next());

          case 2:
            tempFilePath = req.files.image.tempFilePath;
            _context.next = 5;
            return _cloudinary["default"].upload(tempFilePath);

          case 5:
            _yield$cloudinary$upl = _context.sent;
            url = _yield$cloudinary$upl.url;
            pid = _yield$cloudinary$upl.public_id;
            req.image = url;
            req.imageId = pid;
            return _context.abrupt("return", next());

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
exports.uploadImage = uploadImage;

var deleteImage = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(res, id) {
    var _yield$cloudinary$del, result;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _cloudinary["default"].deleteImage(id);

          case 3:
            _yield$cloudinary$del = _context2.sent;
            result = _yield$cloudinary$del.result;
            if (result !== 'ok') _utils["default"].error(res, 500, 'Unable to delete Image');
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);

            _utils["default"].error(res, 503, 'unable to that delete image', _context2.t0);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 8]]);
  }));

  return function deleteImage(_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

exports.deleteImage = deleteImage;