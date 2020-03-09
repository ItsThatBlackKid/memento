"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _morgan = _interopRequireDefault(require("morgan"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _apolloServerExpress = require("apollo-server-express");

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _resolvers = _interopRequireDefault(require("./resolvers"));

var _schema = _interopRequireDefault(require("./schema"));

var _expressGraphql = _interopRequireDefault(require("express-graphql"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_mongoose.default.Promise = global.Promise;

_mongoose.default.connect("mongodb://".concat(process.env.MONGO_HOST || "localhost", "/memento"), {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var server = new _apolloServerExpress.ApolloServer({
  typeDefs: _schema.default,
  resolvers: _resolvers.default,
  context: function context(ctx) {
    return _objectSpread({}, ctx);
  },
  playground: {
    settings: {
      "request.credentials": "include"
    }
  },
  formatError: function formatError(error) {
    var params = {
      name: error.name,
      message: error.message,
      locations: error.locations,
      stack: error.stack
    };
    console.log(error.message);
    return params;
  }
});
var app = (0, _express.default)();
var PORT = process.env.PORT || 4300;

var errorHandler = function errorHandler(err, req, res, next) {
  console.log('reached');
  console.log(err.stack);
  res.status(500);
};

app.use((0, _cookieParser.default)());
app.use((0, _morgan.default)('combined'));
app.use(_express.default.json());
app.use((0, _cors.default)());
server.applyMiddleware({
  app: app,
  path: '/graphql',
  cors: false
});
app.use(errorHandler);
app.listen(PORT, function () {
  console.log("Server is listening on PORT ".concat(PORT));
});