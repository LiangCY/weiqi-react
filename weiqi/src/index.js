import { createGame } from './lib/game';
import { createBoard } from './lib/board';
import Constants from './lib/constants';
import { opponentColor } from "./lib/util";

export default {
    createGame: createGame,
    createBoard: createBoard,
    opponentColor: opponentColor,
    EMPTY: Constants.EMPTY,
    BLACK: Constants.BLACK,
    WHITE: Constants.WHITE
};
