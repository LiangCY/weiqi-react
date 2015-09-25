'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _libGame = require('./lib/game');

var _libBoard = require('./lib/board');

var _libConstants = require('./lib/constants');

var _libConstants2 = _interopRequireDefault(_libConstants);

exports['default'] = {
    createGame: _libGame.createGame,
    createBoard: _libBoard.createBoard,
    EMPTY: _libConstants2['default'].EMPTY,
    BLACK: _libConstants2['default'].BLACK,
    WHITE: _libConstants2['default'].WHITE
};
module.exports = exports['default'];