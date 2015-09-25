"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _constants = require("./constants");

var _constants2 = _interopRequireDefault(_constants);

var opponentColor = function opponentColor(color) {
    return color == _constants2["default"].BLACK ? _constants2["default"].WHITE : _constants2["default"].BLACK;
};
exports.opponentColor = opponentColor;