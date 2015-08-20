// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

angular.module('starter', ['ionic'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }

        });
    })

    .directive('tableSize', function ($window) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {

                attrs.$observe('tableSize', function (value) {
                        var row = scope.$eval(value)[0];
                        var col = scope.$eval(value)[1];

                        var gridSize = Math.min(
                            Math.floor(($window.innerWidth - 40) / col - 4),
                            Math.floor(($window.innerHeight - 40) / row - 4)
                        );


                        element.empty()
                            .css('top', gridSize / 2 + 'px')
                            .css('left', gridSize / 2 + 'px');

                        for (var i = 0; i < row - 1; i++) {
                            element.append(angular.element(document.createElement('tr')));
                            for (var j = 0; j < col - 1; j++) {
                                element.children().append(
                                    angular.element(document.createElement('td'))
                                        .css('width', gridSize + 'px')
                                        .css('height', gridSize + 'px')
                                        .css('border', '1px solid #000'))
                            }
                        }
                    }
                );
            }
        };
    })

    .directive('gameSize', function ($window, $compile) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {

                attrs.$observe('gameSize', function (value) {
                    var row = scope.$eval(attrs.gameSize)[0];
                    var col = scope.$eval(attrs.gameSize)[1];

                    var gridSize = Math.min(
                        Math.floor(($window.innerWidth - 40) / col - 4),
                        Math.floor(($window.innerHeight - 40) / row - 4)
                    );

                    element.empty();

                    var dom = "<tr ng-repeat='stoneRow in stones'>" +
                        "<td ng-bind='rowIndex=$index' style='display:none'></td>" +
                        "<td ng-repeat='stone in stoneRow track by $index' style='width:" + gridSize + "px;height:" + gridSize + "px;border:1px solid transparent'>" +
                        "<div ng-class='stone' ng-click='click(rowIndex,$index)'></div>" +
                        "</td></tr>";

                    element.append($compile(dom)(scope));
                });
            }

        };
    })

    .controller('GameCtrl', function ($scope, $ionicPopup) {
        $scope.row = 9;
        $scope.col = 9;

        var game = Weiqi.createGame($scope.row, $scope.col);

        $scope.stones = [];
        var arr = game.getBoard().toArray();
        for (i = 0; i < arr.length; i++) {
            $scope.stones.push(arr[i].map(function (stone) {
                return 'blank'
            }));
        }
        $scope.click = function (a, b) {

            $scope.stones = [];
            try {
                var player = game.getCurrentPlayer();
                game = game.play(player, [a, b]);
            } catch (e) {
                console.log(e)
            }
            arr = game.getBoard().toArray();
            for (i = 0; i < arr.length; i++) {
                $scope.stones.push(arr[i].map(function (stone) {
                    if (stone == '.') {
                        return 'blank'
                    } else if (stone == 'o') {
                        return 'white'
                    } else {
                        return 'black'
                    }
                }));
            }
        };

        $scope.showPopup = function () {

            $scope.size = {};

            // 调用$ionicPopup弹出定制弹出框
            $ionicPopup.show({
                template: "<input type='text' ng-model='size.row'>" +
                "<input type='text' ng-model='size.col'>",
                title: "输入高度和宽度",
                scope: $scope,
                buttons: [
                    {text: "取消"},
                    {
                        text: "<b>确定</b>",
                        type: "button-positive",
                        onTap: function (e) {
                            return $scope.size;
                        }
                    }
                ]
            }).then(function (res) {
                console.log(res);
                $scope.row = res.row;
                $scope.col = res.col;

                game = Weiqi.createGame($scope.row, $scope.col);
                $scope.stones = [];
                var arr = game.getBoard().toArray();
                for (i = 0; i < arr.length; i++) {
                    $scope.stones.push(arr[i].map(function (stone) {
                        return 'blank'
                    }));
                }
            });
        };
    });