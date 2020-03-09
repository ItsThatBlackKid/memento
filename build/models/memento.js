"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose.default.Schema;
var MementoSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  mood: {
    type: Number,
    min: 0,
    max: 1,
    default: 0.5
  },
  content: {
    type: String,
    required: true
  }
});

var _default = _mongoose.default.model('memento', MementoSchema);

exports.default = _default;