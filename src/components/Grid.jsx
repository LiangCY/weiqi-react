var React = require('react');
var Weiqi = require('../../weiqi/dist');

var width = 48;

var Grid = React.createClass({

    handlePlay: function (x, y, event) {
        event.preventDefault();
        this.props.onPlay([x, y]);
    },

    render: function () {

        var grid = this.props.grid;

        var style = {
            position: 'absolute',
            width: width + 'px',
            height: width + 'px',
            top: grid.x * width + 'px',
            left: grid.y * width + 'px',
            textDecoration: 'none'
        };

        var lineHClass;
        var lineVClass;
        var stoneClass;

        var lineHStyle;
        var lineVStyle;
        var stoneStyle;

        if (grid.x == 0) {
            lineVClass = 'line-v-t';
            lineVStyle = {
                height: width / 2 + 'px'
            };
        } else if (grid.x == 18) {
            lineVClass = 'line-v-b';
            lineVStyle = {
                height: width / 2 + 'px'
            };
        } else {
            lineVClass = 'line-v';
            lineVStyle = {
                height: width + 'px'
            };
        }

        if (grid.y == 0) {
            lineHClass = 'line-h-l';
            lineHStyle = {
                width: width / 2 + 'px'
            };
        } else if (grid.y == 18) {
            lineHClass = 'line-h-r';
            lineHStyle = {
                width: width / 2 + 'px'
            };
        } else {
            lineHClass = 'line-h';
            lineHStyle = {
                width: width + 'px'
            };
        }

        if (grid.color == Weiqi.BLACK) {
            stoneClass = 'stone-b';
            stoneStyle = {
                height: parseInt(width * 0.8) + 'px',
                width: parseInt(width * 0.8) + 'px'
            };
        } else if (grid.color == Weiqi.WHITE) {
            stoneClass = 'stone-w';
            stoneStyle = {
                height: parseInt(width * 0.8) + 'px',
                width: parseInt(width * 0.8) + 'px'
            };
        } else {
            stoneClass = 'stone'
        }

        if (
            (grid.x == 3 && (grid.y == 3 || grid.y == 9 || grid.y == 15)) ||
            (grid.x == 9 && (grid.y == 3 || grid.y == 9 || grid.y == 15)) ||
            (grid.x == 15 && (grid.y == 3 || grid.y == 9 || grid.y == 15))
        ) {
            return (
                <div href="#" style={style}
                     onClick={this.handlePlay.bind(null, grid.x, grid.y)}>
                    <div className={lineHClass} style={lineHStyle}></div>
                    <div className={lineVClass} style={lineVStyle}></div>
                    <div className={'star'}></div>
                    <div className={stoneClass} style={stoneStyle}></div>
                </div>
            )
        } else {
            return (
                <div href="#" style={style}
                     onClick={this.handlePlay.bind(null, grid.x, grid.y)}>
                    <div className={lineHClass} style={lineHStyle}></div>
                    <div className={lineVClass} style={lineVStyle}></div>
                    <div className={stoneClass} style={stoneStyle}></div>
                </div>
            )
        }

    }
});

module.exports = Grid;