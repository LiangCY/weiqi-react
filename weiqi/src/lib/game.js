import Immutable from "immutable";
import { createBoard } from "./board";
import { opponentColor } from "./util";
import Constants from "./constants";

class Game {
    constructor(boardSize, values) {
        if (typeof values !== "undefined") {
            this.currentColor = values.currentColor;
            this.consecutivePasses = values.consecutivePasses;
            this.history = values.history;
            this.board = values.board;
            this.boardSize = boardSize;
        } else {
            this.currentColor = Constants.BLACK;
            this.consecutivePasses = 0;
            this.board = createBoard(boardSize);
            this.history = Immutable.List([this.board.stones]);
            this.boardSize = boardSize;
        }
    }

    isOver() {
        return this.consecutivePasses >= 2;
    }

    getCurrentPlayer() {
        return this.currentColor;
    }

    getBoard() {
        return this.board;
    }

    play(player, coords) {

        const inHistory = (otherBoard) => this.history.includes(otherBoard.stones);

        if (this.isOver())
            throw "Game is already over";

        if (player != this.currentColor)
            throw "Not player's turn";

        const newBoard = this.board.play(this.currentColor, coords);

        if (inHistory(newBoard))
            throw "Violation of Ko";

        return createGame(this.boardSize, {
            currentColor: opponentColor(this.currentColor),
            consecutivePasses: 0,
            board: newBoard,
            history: this.history.push(newBoard.stones)
        });

    }

    revert(player) {

        if (this.history.size < 2)
            throw "Game is not started";

        const history = this.history.pop();

        return createGame(this.boardSize, {
            currentColor: player,
            consecutivePasses: 0,
            board: createBoard(this.boardSize, history.last()),
            history: history
        });
    }

    pass(player) {
        if (this.isOver())
            throw "Game is already over";

        if (player != this.currentColor)
            throw "Not player's turn";

        return createGame(this.boardSize, {
            currentColor: opponentColor(this.currentColor),
            consecutivePasses: this.consecutivePasses + 1,
            board: this.board,
            history: this.history
        });
    }

    /*
     * Returns Black - White
     */
    areaScore(komi) {
        if (typeof komi === "undefined")
            komi = 0.0;

        const boardScore = this.board.areaScore();
        return boardScore[Constants.BLACK] - (boardScore[Constants.WHITE] + komi);
    }

}

export const createGame = (boardSize, values) =>
    new Game(boardSize, values);
