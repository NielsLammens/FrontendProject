var redDevilsApp = angular.module('redDevilsApp', []);

redDevilsApp.controller('DateListCtrl', function ($scope) {
  $scope.dates = [
    {'year': '1990'},
    {'year': '1991'},
    {'year': '1992'},
    {'year': '1993'}
  ];
});