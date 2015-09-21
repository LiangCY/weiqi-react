var Reflux = require('reflux');
var Weiqi = require('weiqi');
var GameActions = require('../actions/GameActions');

var game = Weiqi.createGame(9);

var GameStore = Reflux.createStore({

    init: function () {
        this.listenTo(GameActions.play, this.play);
    },

    play: function (position) {
        var player = game.getCurrentPlayer();
        game = game.play(player, position);
        this.trigger(game.getBoard().toArray());
    },

    getBoard: function () {
        return game.getBoard().toArray();
    }
});

module.exports = GameStore;

