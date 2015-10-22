var Reflux = require('reflux');
var Weiqi = require('../../weiqi/dist');
var Constants = require('../constants');
var GameActions = require('../actions/GameActions');

var game;

var GameStore = Reflux.createStore({

    init: function () {
        game = Weiqi.createGame(19);
        this.listenTo(GameActions.play, this.play);
        this.listenTo(GameActions.revert, this.revert);
    },

    play: function (position) {
        var player = game.getCurrentPlayer();
        game = game.play(player, position);
        this.trigger(game.getBoard().toArray());
    },

    revert: function () {
        var player = game.getCurrentPlayer();
        game = game.revert(Weiqi.opponentColor(player));
        this.trigger(game.getBoard().toArray());
    },

    getBoard: function () {
        return game.getBoard().toArray();
    }
});

module.exports = GameStore;

