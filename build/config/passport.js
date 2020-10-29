"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jwtStrategy = void 0;

var _dotenv = require("dotenv");

var _passportJwt = require("passport-jwt");

(0, _dotenv.config)();
var JWToptions = {
  jwtFromRequest: _passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};
var jwtStrategy = new _passportJwt.Strategy(JWToptions, function (payload, done) {
  return payload ? done(null, payload) : done({
    message: 'unauthenticated'
  });
});
exports.jwtStrategy = jwtStrategy;