var Reflux = require('reflux');

var GameActions = Reflux.createActions([
    "play",
    "revert"
]);

module.exports = GameActions;