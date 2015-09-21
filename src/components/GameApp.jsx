var React = require('react');
var Grid = require('./Grid.jsx');
var GameStore = require('../stores/GameStore');
var GameActions = require('../actions/GameActions');

var GameApp = React.createClass({

    getInitialState: function () {
        return {board: GameStore.getBoard()}
    },

    onChange: function (board) {
        this.setState({
            board: board
        });
    },

    componentDidMount: function () {
        this.unsubscribe = GameStore.listen(this.onChange);
    },

    componentWillUnmount: function () {
        this.unsubscribe();
    },

    handlePlay: function (position) {
        GameActions.play(position);
    },

    render: function () {
        var board = this.state.board;
        var grids = [];
        var self = this;
        board.forEach(function (line, i) {
            line.forEach(function (item, j) {
                grids.push(
                    <Grid key={[i,j]} grid={{color:item,x:i,y:j}} onPlay={self.handlePlay}/>
                )
            })
        });
        return (
            <div>
                {grids}
            </div>
        )
    }
});

module.exports = GameApp;