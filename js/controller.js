var app = angular.module("redDevilsApp", []);

app.controller("QuestionListCtrl", function($scope, $http) {
    $scope.questions = [];

    var onQuestionsDownloaded = function (response) {
        angular.forEach(response.data, function(value, key){
            var newQuestion = new Question(
                value.year,
                value.text,
                value.question,
                value.answers);

            $scope.questions.push(newQuestion);
        });

        console.log($scope.questions);

        $.getScript("js/jquery.timelinr-0.9.54.js", function(){
            $().timelinr({
            arrowKeys: 'true'
            })
        });
    };

    var onError = function(response){
        console.log(response);
    };

    $http.get('data/questions.json').then(onQuestionsDownloaded, onError);

});