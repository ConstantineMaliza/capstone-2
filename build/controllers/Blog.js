"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeComment = exports.addComment = exports.deleteOne = exports.update = exports.create = exports.getOne = exports.getAll = void 0;

var _validation = require("../validation");

var _async = _interopRequireDefault(require("../middlewares/async"));

var _Blog = _interopRequireDefault(require("../models/Blog"));

var _Comment = _interopRequireDefault(require("../models/Comment"));

var _utils = _interopRequireDefault(require("../utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getAll = (0, _async["default"])( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var blogs;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _Blog["default"].find();

          case 2:
            blogs = _context.sent;

            if (blogs) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", _utils["default"].error(res, 404, 'No blog was found!'));

          case 5:
            return _context.abrupt("return", _utils["default"].success(res, 200, {
              count: blogs.length,
              blogs: blogs
            }, 'Successfully retrieved'));

          case 6:
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
var getOne = (0, _async["default"])( /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var blogId, _yield$BlogModel$find, blog;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            blogId = req.params.blogId;

            if (blogId) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return", _utils["default"].error(res, 400, 'Please provide an id for the blog'));

          case 3:
            _context2.next = 5;
            return _Blog["default"].findById(blogId).populate('comments');

          case 5:
            _yield$BlogModel$find = _context2.sent;
            blog = _yield$BlogModel$find._doc;

            if (blog) {
              _context2.next = 9;
              break;
            }

            return _context2.abrupt("return", _utils["default"].error(res, 404, 'Blog not found!'));

          case 9:
            return _context2.abrupt("return", _utils["default"].success(res, 200, _objectSpread({}, blog)));

          case 10:
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
exports.getOne = getOne;
var create = (0, _async["default"])( /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var image, imageId, post, _validate, errors, _yield$BlogModel$crea, blog;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            image = req.image, imageId = req.imageId;
            post = _objectSpread(_objectSpread({}, req.body), {}, {
              image: image,
              imageId: imageId
            });
            _validate = (0, _validation.validate)(_validation.blogValidate.CreateSchema, post), errors = _validate.details;

            if (!errors) {
              _context3.next = 5;
              break;
            }

            return _context3.abrupt("return", _utils["default"].error(res, 400, errors[0].message, errors[0]));

          case 5:
            _context3.next = 7;
            return _Blog["default"].create(post);

          case 7:
            _yield$BlogModel$crea = _context3.sent;
            blog = _yield$BlogModel$crea._doc;

            if (blog) {
              _context3.next = 11;
              break;
            }

            return _context3.abrupt("return", _utils["default"].error(res, 404, 'Blog not created!'));

          case 11:
            return _context3.abrupt("return", _utils["default"].success(res, 201, blog, 'Blog Created successfully'));

          case 12:
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
exports.create = create;
var update = (0, _async["default"])( /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var blogId, _validate2, errors, blog;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            blogId = req.params.blogId;
            _validate2 = (0, _validation.validate)(_validation.blogValidate.UpdateSchema, req.body), errors = _validate2.details;

            if (!errors) {
              _context4.next = 4;
              break;
            }

            return _context4.abrupt("return", _utils["default"].error(res, 400, errors[0].message, errors[0]));

          case 4:
            _context4.next = 6;
            return _Blog["default"].findOneAndUpdate({
              _id: blogId
            }, req.body, {
              "new": true
            });

          case 6:
            blog = _context4.sent;

            if (blog) {
              _context4.next = 9;
              break;
            }

            return _context4.abrupt("return", _utils["default"].error(res, 404, 'Blog not found'));

          case 9:
            return _context4.abrupt("return", _utils["default"].success(res, 200, blog, 'Blog Updated successfully'));

          case 10:
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
exports.update = update;
var deleteOne = (0, _async["default"])( /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var blogId, blog;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            blogId = req.params.blogId;
            _context5.next = 3;
            return _Blog["default"].findOne({
              _id: blogId
            });

          case 3:
            blog = _context5.sent;

            if (blog) {
              _context5.next = 6;
              break;
            }

            return _context5.abrupt("return", _utils["default"].error(res, 404, blog.imageId));

          case 6:
            if (!blog.imageid) {
              _context5.next = 9;
              break;
            }

            _context5.next = 9;
            return deleteImage(res, blog.imageId);

          case 9:
            _context5.next = 11;
            return blog.deleteOne();

          case 11:
            return _context5.abrupt("return", _utils["default"].success(res, 200, blog, 'Blog deletd successfully'));

          case 12:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
exports.deleteOne = deleteOne;
var addComment = (0, _async["default"])( /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var blogId, userId, comment, _validate3, errors, blog, newComment;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            blogId = req.params.blogId;
            userId = req.user.userId;

            if (blogId) {
              _context6.next = 4;
              break;
            }

            return _context6.abrupt("return", _utils["default"].error(res, 400, 'Please provide an id for the blog!'));

          case 4:
            comment = _objectSpread(_objectSpread({}, req.body), {}, {
              author: userId
            });
            _validate3 = (0, _validation.validate)(_validation.commentValidate, comment), errors = _validate3.details;

            if (!errors) {
              _context6.next = 8;
              break;
            }

            return _context6.abrupt("return", _utils["default"].error(res, 400, errors[0].message, errors[0]));

          case 8:
            _context6.next = 10;
            return _Blog["default"].findById(blogId);

          case 10:
            blog = _context6.sent;

            if (blog) {
              _context6.next = 13;
              break;
            }

            return _context6.abrupt("return", _utils["default"].error(res, 404, 'Blog not found!'));

          case 13:
            _context6.next = 15;
            return _Comment["default"].create(comment);

          case 15:
            newComment = _context6.sent;
            console.log(newComment);
            _context6.next = 19;
            return newComment.save();

          case 19:
            blog.comments.push(newComment._id);
            blog.commentsCount += 1;
            _context6.next = 23;
            return blog.save();

          case 23:
            return _context6.abrupt("return", _utils["default"].success(res, 201, newComment, 'Successfully commented on post'));

          case 24:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}());
exports.addComment = addComment;
var removeComment = (0, _async["default"])( /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var _req$params, commentId, blogId, blog;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _req$params = req.params, commentId = _req$params.commentId, blogId = _req$params.blogId;

            if (!(!blogId || !commentId)) {
              _context7.next = 3;
              break;
            }

            return _context7.abrupt("return", _utils["default"].error(res, 400, 'Please provide an id for the blog and comment!'));

          case 3:
            _context7.next = 5;
            return _Blog["default"].findById(blogId);

          case 5:
            blog = _context7.sent;

            if (blog) {
              _context7.next = 8;
              break;
            }

            return _context7.abrupt("return", _utils["default"].error(res, 404, 'Blog not found!'));

          case 8:
            if (blog.comments.includes(commentId)) {
              _context7.next = 10;
              break;
            }

            return _context7.abrupt("return", _utils["default"].error(res, 404, 'Comment not found!'));

          case 10:
            blog.comments = blog.comments.filter(function (id) {
              return id !== String(commentId);
            });
            blog.commentsCount -= 1;
            _context7.next = 14;
            return _Comment["default"].findByIdAndDelete(commentId);

          case 14:
            _context7.next = 16;
            return blog.save();

          case 16:
            return _context7.abrupt("return", _utils["default"].success(res, 200, {
              comments: blog.comments,
              commentsCount: blog.commentsCount
            }, 'Successfully removed comment'));

          case 17:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}());
exports.removeComment = removeComment;