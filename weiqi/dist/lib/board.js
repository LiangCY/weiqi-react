"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _immutable = require("immutable");

var _immutable2 = _interopRequireDefault(_immutable);

var _util = require("./util");

var _constants = require("./constants");

var _constants2 = _interopRequireDefault(_constants);

var IPoint = _immutable2["default"].Record({ i: 0, j: 0 });
var IGroup = _immutable2["default"].Record({ stones: null, surrounding: null });

var Point = (function (_IPoint) {
    _inherits(Point, _IPoint);

    function Point(i, j) {
        _classCallCheck(this, Point);

        _get(Object.getPrototypeOf(Point.prototype), "constructor", this).call(this, { i: i, j: j });
    }

    return Point;
})(IPoint);

var Group = (function (_IGroup) {
    _inherits(Group, _IGroup);

    function Group() {
        _classCallCheck(this, Group);

        _get(Object.getPrototypeOf(Group.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Group, [{
        key: "isDead",
        value: function isDead() {
            return this.getLiberties().isEmpty();
        }
    }, {
        key: "getLiberties",
        value: function getLiberties() {
            return this.surrounding.filter(function (color) {
                return color === _constants2["default"].EMPTY;
            });
        }
    }]);

    return Group;
})(IGroup);

var inBounds = function inBounds(size, point) {
    return point.i >= 0 && point.i < size && point.j >= 0 && point.j < size;
};

var getStone = function getStone(stones, coords) {
    return stones.get(coords, _constants2["default"].EMPTY);
};

var replaceStone = function replaceStone(stones, coords, value) {
    if (value === _constants2["default"].EMPTY) return removeStone(coords);else return stones.set(coords, value);
};

var removeStone = function removeStone(stones, coords) {
    return stones.remove(coords);
};

var deltas = _immutable2["default"].List.of(new Point(-1, 0), new Point(0, 1), new Point(1, 0), new Point(0, -1));

/*
 * Given a board position, returns a list of [i,j] coordinates representing
 * orthogonally adjacent intersections
 */
var getAdjacentIntersections = function getAdjacentIntersections(size, coords) {
    var addPair = function addPair(vec) {
        return new Point(vec.i + coords.i, vec.j + coords.j);
    };
    return deltas.map(addPair).filter(function (coord) {
        return inBounds(size, coord);
    });
};

var allPositions = function allPositions(size) {
    var range = _immutable2["default"].Range(0, size);
    return range.flatMap(function (i) {
        return range.map(function (j) {
            return new Point(i, j);
        });
    });
};

/*
 * Performs a breadth-first search about an (i,j) position to find recursively
 * orthogonally adjacent stones of the same color (stones with which it shares
 * liberties).
 */
var getGroup = function getGroup(stones, size, coords) {
    var color = getStone(stones, coords);

    var search = function search(_x4, _x5, _x6) {
        var _again2 = true;

        _function2: while (_again2) {
            var visited = _x4,
                queue = _x5,
                surrounding = _x6;
            stone = neighbors = undefined;
            _again2 = false;

            if (queue.isEmpty()) return { visited: visited, surrounding: surrounding };

            var stone = queue.first();
            queue = queue.shift();

            if (visited.has(stone)) {
                _x4 = visited;
                _x5 = queue;
                _x6 = surrounding;
                _again2 = true;
                continue _function2;
            }

            var neighbors = getAdjacentIntersections(size, stone);
            neighbors.forEach(function (n) {
                var state = getStone(stones, n);
                if (state === color) queue = queue.push(n);else surrounding = surrounding.set(n, state);
            });

            visited = visited.add(stone);
            _x4 = visited;
            _x5 = queue;
            _x6 = surrounding;
            _again2 = true;
            continue _function2;
        }
    };

    var _search = search(_immutable2["default"].Set(), _immutable2["default"].List([coords]), _immutable2["default"].Map());

    var visited = _search.visited;
    var surrounding = _search.surrounding;

    return new Group({
        stones: visited,
        surrounding: surrounding
    });
};

var createEmptyGrid = (function () {
    var createGrid = function createGrid(size) {
        return _immutable2["default"].Repeat(_immutable2["default"].Repeat(_constants2["default"].EMPTY, size).toList(), size).toList();
    };

    var cache = {};
    return function (size) {
        return cache[size] || (cache[size] = createGrid(size));
    };
})();

var Board = (function () {
    function Board(size, stones) {
        _classCallCheck(this, Board);

        if (typeof size === "undefined" || size < 0) throw "Size must be an integer greater than zero";

        if (typeof stones === "undefined") stones = _immutable2["default"].Map();

        this.size = size;
        this.stones = stones;
    }

    _createClass(Board, [{
        key: "getSize",
        value: function getSize() {
            return this.size;
        }
    }, {
        key: "toArray",
        value: function toArray() {
            return this.getIntersections().toJS();
        }
    }, {
        key: "getIntersections",
        value: function getIntersections() {
            var _this = this;

            var mergeStones = function mergeStones(map) {
                return _this.stones.reduce(function (board, color, point) {
                    return board.setIn([point.i, point.j], color);
                }, map);
            };
            return createEmptyGrid(this.size).withMutations(mergeStones);
        }
    }, {
        key: "play",
        value: function play(color, coords) {
            var _this2 = this;

            coords = new Point(coords[0], coords[1]);

            if (!inBounds(this.size, coords)) throw "Intersection out of bounds";

            if (getStone(this.stones, coords) != _constants2["default"].EMPTY) throw "Intersection occupied by existing stone";

            var newBoard = replaceStone(this.stones, coords, color);
            var neighbors = getAdjacentIntersections(this.size, coords);
            var neighborColors = _immutable2["default"].Map(neighbors.zipWith(function (n) {
                return [n, getStone(newBoard, n)];
            }));
            var isOpponentColor = function isOpponentColor(stoneColor, _) {
                return stoneColor === (0, _util.opponentColor)(color);
            };
            var captured = neighborColors.filter(isOpponentColor).map(function (val, coord) {
                return getGroup(newBoard, _this2.size, coord);
            }).valueSeq().filter(function (g) {
                return g.isDead();
            });

            // detect suicide
            var newGroup = getGroup(newBoard, this.size, coords);
            if (captured.isEmpty() && newGroup.isDead()) captured = _immutable2["default"].List([newGroup]);

            newBoard = captured.flatMap(function (g) {
                return g.get("stones");
            }).reduce(function (acc, stone) {
                return removeStone(acc, stone);
            }, newBoard);

            return createBoard(this.size, newBoard);
        }
    }, {
        key: "areaScore",
        value: function areaScore() {
            var _this3 = this;

            var positions = allPositions(this.size);
            var visited = _immutable2["default"].Set();
            var score = {};
            score[_constants2["default"].BLACK] = 0;
            score[_constants2["default"].WHITE] = 0;

            positions.forEach(function (coords) {
                if (visited.has(coords)) return;

                var state = getStone(_this3.stones, coords);
                var group = getGroup(_this3.stones, _this3.size, coords);
                var groupStones = group.get("stones");
                var surroundingColors = group.get("surrounding").valueSeq().toSet();

                if (state === _constants2["default"].EMPTY && surroundingColors.size === 1) score[surroundingColors.first()] += groupStones.size;else score[state] += groupStones.size;

                visited = visited.union(groupStones);
            });

            return score;
        }
    }]);

    return Board;
})();

var createBoard = function createBoard(size, stones) {
    return new Board(size, stones);
};
exports.createBoard = createBoard;