var app = angular.module("redDevilsApp", []);

app.controller("DateListCtrl", function($scope, $http) {
    $http.defaults.headers.common["X-Custom-Header"] = "Angular.js";
    $http.get('data/dates.json').
        success(function(data, status, headers, config) {
            console.log(data);
            $scope.dates = data;
            $.getScript("js/jquery.timelinr-0.9.54.js", function(){
                $().timelinr({
                    arrowKeys: 'true'
                })
            });
        }).
        error(function(data, status, headers, config) {
            // log error
            console.log('Could not load data ...');
        });


    });