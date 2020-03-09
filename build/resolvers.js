"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _memento = _interopRequireDefault(require("./models/memento"));

var _user = _interopRequireDefault(require("./models/user"));

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

var _apolloLinkHttp = require("apollo-link-http");

var _apolloLink = require("apollo-link");

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _apolloCacheInmemory = require("apollo-cache-inmemory");

var _core = require("lodash/core");

var _apolloFetch = require("apollo-fetch");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n    {\n        verify\n    }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    query {\n        getUser {\n            _id\n            first_name\n            last_name\n            email\n            createdAt\n            updatedAt\n        }\n    }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var uri = process.env.AUTH_URI || "http://test-sheku.com:5000/api";
var GET_USER = (0, _graphqlTag.default)(_templateObject());
var VERIFY = (0, _graphqlTag.default)(_templateObject2());
var resolvers = {
  Query: {
    allMemento: function allMemento(root, _ref, _ref2) {
      _objectDestructuringEmpty(_ref);

      var req = _ref2.req;
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _req$cookies, jwt, user_id, link, _ref3, error, data;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$cookies = req.cookies, jwt = _req$cookies.jwt, user_id = _req$cookies.user_id;
                link = new _apolloLinkHttp.HttpLink({
                  uri: uri,
                  fetch: _nodeFetch.default,
                  headers: {
                    'cookie': "jwt=".concat(req.cookies.jwt)
                  },
                  credentials: "include"
                });
                _context.next = 4;
                return (0, _apolloLink.makePromise)((0, _apolloLink.execute)(link, {
                  query: VERIFY
                }));

              case 4:
                _ref3 = _context.sent;
                error = _ref3.error;
                data = _ref3.data;

                if (!error) {
                  _context.next = 9;
                  break;
                }

                throw error;

              case 9:
                if (!data.verify) {
                  _context.next = 13;
                  break;
                }

                _context.next = 12;
                return _memento.default.find({
                  user: user_id
                });

              case 12:
                return _context.abrupt("return", _context.sent);

              case 13:
                _context.next = 15;
                return _memento.default.find();

              case 15:
                return _context.abrupt("return", _context.sent);

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    getMemento: function getMemento(root, _ref4) {
      var _id = _ref4._id;
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                console.log(_id);
                _context2.t0 = console;
                _context2.next = 4;
                return _memento.default.findById(_id);

              case 4:
                _context2.t1 = _context2.sent;

                _context2.t0.log.call(_context2.t0, _context2.t1);

                _context2.next = 8;
                return _memento.default.findById(_id);

              case 8:
                return _context2.abrupt("return", _context2.sent);

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    getUser: function getUser(root, _ref5, _ref6) {
      _objectDestructuringEmpty(_ref5);

      var req = _ref6.req,
          res = _ref6.res;
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var user, link, _ref7, errors, data;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _user.default.findById(req.cookies.user_id);

              case 2:
                user = _context3.sent;
                console.log(user);

                if (!(0, _core.isEmpty)(user)) {
                  _context3.next = 25;
                  break;
                }

                console.log("no user");
                _context3.prev = 6;
                link = new _apolloLinkHttp.HttpLink({
                  uri: uri,
                  fetch: _nodeFetch.default,
                  headers: {
                    'cookie': "jwt=".concat(req.cookies.jwt)
                  },
                  credentials: "include"
                });
                _context3.next = 10;
                return (0, _apolloLink.makePromise)((0, _apolloLink.execute)(link, {
                  query: GET_USER
                }));

              case 10:
                _ref7 = _context3.sent;
                errors = _ref7.errors;
                data = _ref7.data;

                if (!errors) {
                  _context3.next = 15;
                  break;
                }

                throw errors;

              case 15:
                console.log(data.getUser);
                user = data.getUser;
                _context3.next = 19;
                return _user.default.create(user);

              case 19:
                return _context3.abrupt("return", user);

              case 22:
                _context3.prev = 22;
                _context3.t0 = _context3["catch"](6);
                throw _context3.t0;

              case 25:
                return _context3.abrupt("return", user);

              case 26:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[6, 22]]);
      }))();
    }
  },
  Mutation: {
    createUser: function createUser(root, _ref8) {
      var input = _ref8.input;
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _user.default.create(input);

              case 2:
                return _context4.abrupt("return", _context4.sent);

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }))();
    },
    createMemento: function createMemento(root, _ref9, _ref10) {
      var input = _ref9.input;
      var req = _ref10.req;
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var _req$cookies2, jwt, user_id, link, _ref11, error, data;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _req$cookies2 = req.cookies, jwt = _req$cookies2.jwt, user_id = _req$cookies2.user_id;
                link = new _apolloLinkHttp.HttpLink({
                  uri: uri,
                  fetch: _nodeFetch.default,
                  headers: {
                    'cookie': "jwt=".concat(req.cookies.jwt)
                  },
                  credentials: "include"
                });
                _context5.next = 4;
                return (0, _apolloLink.makePromise)((0, _apolloLink.execute)(link, {
                  query: VERIFY
                }));

              case 4:
                _ref11 = _context5.sent;
                error = _ref11.error;
                data = _ref11.data;

                if (!error) {
                  _context5.next = 9;
                  break;
                }

                throw error;

              case 9:
                if (!data.verify) {
                  _context5.next = 13;
                  break;
                }

                _context5.next = 12;
                return _memento.default.create(_objectSpread({
                  user: user_id
                }, input));

              case 12:
                return _context5.abrupt("return", _context5.sent);

              case 13:
                _context5.next = 15;
                return _memento.default.create(input);

              case 15:
                return _context5.abrupt("return", _context5.sent);

              case 16:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }))();
    },
    editMemento: function editMemento(root, _ref12) {
      var _id = _ref12._id,
          input = _ref12.input;
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                console.log(input);
                _context6.next = 3;
                return _memento.default.findOneAndUpdate({
                  _id: _id
                }, input);

              case 3:
                return _context6.abrupt("return", _context6.sent);

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }))();
    },
    editName: function editName(root, _ref13) {
      var _id = _ref13._id,
          name = _ref13.name;
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return _memento.default.findOneAndUpdate({
                  _id: _id
                }, name);

              case 2:
                return _context7.abrupt("return", _context7.sent);

              case 3:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }))();
    }
  }
};
var _default = resolvers;
exports.default = _default;