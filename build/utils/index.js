"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Response = /*#__PURE__*/function () {
  function Response() {
    _classCallCheck(this, Response);
  }

  _createClass(Response, null, [{
    key: "success",
    value: function success(res) {
      var status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;
      var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var message = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'Successfull';
      return res.status(status).json({
        status: status,
        message: message,
        data: data
      });
    }
  }, {
    key: "error",
    value: function error(res) {
      var status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
      var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'Internal server error';

      var _error = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      return res.status(status).json({
        status: status,
        message: message,
        error: _error
      });
    }
  }]);

  return Response;
}();

exports["default"] = Response;