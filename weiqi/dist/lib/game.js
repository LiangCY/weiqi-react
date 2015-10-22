"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _immutable = require("immutable");

var _immutable2 = _interopRequireDefault(_immutable);

var _board = require("./board");

var _util = require("./util");

var _constants = require("./constants");

var _constants2 = _interopRequireDefault(_constants);

var Game = (function () {
    function Game(boardSize, values) {
        _classCallCheck(this, Game);

        if (typeof values !== "undefined") {
            this.currentColor = values.currentColor;
            this.consecutivePasses = values.consecutivePasses;
            this.history = values.history;
            this.board = values.board;
            this.boardSize = boardSize;
        } else {
            this.currentColor = _constants2["default"].BLACK;
            this.consecutivePasses = 0;
            this.board = (0, _board.createBoard)(boardSize);
            this.history = _immutable2["default"].List([this.board.stones]);
            this.boardSize = boardSize;
        }
    }

    _createClass(Game, [{
        key: "isOver",
        value: function isOver() {
            return this.consecutivePasses >= 2;
        }
    }, {
        key: "getCurrentPlayer",
        value: function getCurrentPlayer() {
            return this.currentColor;
        }
    }, {
        key: "getBoard",
        value: function getBoard() {
            return this.board;
        }
    }, {
        key: "play",
        value: function play(player, coords) {
            var _this = this;

            var inHistory = function inHistory(otherBoard) {
                return _this.history.includes(otherBoard.stones);
            };

            if (this.isOver()) throw "Game is already over";

            if (player != this.currentColor) throw "Not player's turn";

            var newBoard = this.board.play(this.currentColor, coords);

            if (inHistory(newBoard)) throw "Violation of Ko";

            return createGame(this.boardSize, {
                currentColor: (0, _util.opponentColor)(this.currentColor),
                consecutivePasses: 0,
                board: newBoard,
                history: this.history.push(newBoard.stones)
            });
        }
    }, {
        key: "revert",
        value: function revert(player) {

            if (this.history.size < 2) throw "Game is not started";

            var history = this.history.pop();

            return createGame(this.boardSize, {
                currentColor: player,
                consecutivePasses: 0,
                board: (0, _board.createBoard)(this.boardSize, history.last()),
                history: history
            });
        }
    }, {
        key: "pass",
        value: function pass(player) {
            if (this.isOver()) throw "Game is already over";

            if (player != this.currentColor) throw "Not player's turn";

            return createGame(this.boardSize, {
                currentColor: (0, _util.opponentColor)(this.currentColor),
                consecutivePasses: this.consecutivePasses + 1,
                board: this.board,
                history: this.history
            });
        }

        /*
         * Returns Black - White
         */
    }, {
        key: "areaScore",
        value: function areaScore(komi) {
            if (typeof komi === "undefined") komi = 0.0;

            var boardScore = this.board.areaScore();
            return boardScore[_constants2["default"].BLACK] - (boardScore[_constants2["default"].WHITE] + komi);
        }
    }]);

    return Game;
})();

var createGame = function createGame(boardSize, values) {
    return new Game(boardSize, values);
};
exports.createGame = createGame;