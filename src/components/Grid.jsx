var React = require('react');
var Weiqi = require('weiqi');

var Grid = React.createClass({

    handlePlay: function (x, y, event) {
        event.preventDefault();
        this.props.onPlay([x, y]);
    },

    render: function () {

        var grid = this.props.grid;

        var style = {
            position: 'absolute',
            width: '50px',
            height: '50px',
            top: grid.x * 50 + 'px',
            left: grid.y * 50 + 'px',
            'text-decoration': 'none'
        };

        var lineHClass;
        var lineVClass;
        var stoneClass;

        if (grid.x == 0) {
            lineVClass = 'line-v-t';
        } else if (grid.x == 8) {
            lineVClass = 'line-v-b';
        } else {
            lineVClass = 'line-v';
        }

        if (grid.y == 0) {
            lineHClass = 'line-h-l'
        } else if (grid.y == 8) {
            lineHClass = 'line-h-r'
        } else {
            lineHClass = 'line-h'
        }

        if (grid.color == Weiqi.BLACK) {
            stoneClass = 'stone-b'
        } else if (grid.color == Weiqi.WHITE) {
            stoneClass = 'stone-w'
        } else {
            stoneClass = 'stone'
        }

        return (
            <div href="#" style={style}
                 onClick={this.handlePlay.bind(null, grid.x, grid.y)}>
                <div className={lineHClass}></div>
                <div className={lineVClass}></div>
                <div className={stoneClass}></div>
            </div>
        )
    }
});

module.exports = Grid;