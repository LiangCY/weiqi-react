var React = require('react');
var Constants = require('../constants');
var Grid = require('./Grid.jsx');
var GameStore = require('../stores/GameStore');
var GameActions = require('../actions/GameActions');

var width = Constants.GRID_WIDTH;

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

    handleRevert: function () {
        GameActions.revert();
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
                <div style={{
                position:'relative',
                width:this.state.board.length*width,
                height:this.state.board.length*width,
                float:'left'
                }}>
                    {grids}
                </div>
                <button className="ui blue button"
                        style={{marginLeft:'20px',marginTop:width/2}}
                        onClick={this.handleRevert}>
                    REVERT
                </button>
            </div>
        )
    }
});

module.exports = GameApp;