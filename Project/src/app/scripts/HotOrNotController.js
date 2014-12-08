/**
 * Created by nielslammens on 1/12/14.
 */

var HotOrNotController = function($scope, $http){

    $scope.players = [];
    $scope.goalKeepers = [];
    $scope.defenders = [];
    $scope.midfielders = [];
    $scope.attackers = [];

    $scope.favGoalKeepers = [];
    $scope.favDefenders = [];
    $scope.favMidfielders = [];
    $scope.favAttackers = [];

    $scope.coaches = [];

    $scope.currentPlayers = [];
    $scope.playersToShow = [];
    $scope.shownPlayers = [];

    $scope.playerLeft = new Player();
    $scope.playerRight = new Player();

    $scope.votingVisible = true;
    $scope.lineupVisible = false;

    $scope.votes = -1;

    var onPlayersDownloaded = function (response) {
        angular.forEach(response.data, function (value, key) {
            var newPlayer = new Player(value.id, value.firstname, value.name, value.dob, value.caps, value.selecties, value.doelpunten, value.speelminuten, value.info, value.position, value.image);
            $scope.players.push(newPlayer);
            $scope.playersToShow.push(newPlayer);
            switch (newPlayer.Position){
                case "goalkeeper":
                    $scope.goalKeepers.push(newPlayer);
                    break;
                case "defender":
                    $scope.defenders.push(newPlayer);
                    break;
                case "midfielder":
                    $scope.midfielders.push(newPlayer);
                    break;
                case "attacker":
                    $scope.attackers.push(newPlayer);
                    break;
            }
        });
        $scope.votes = $scope.players.length - 1;
        initPlayersShown();
    };

    $scope.removeLeft = function(){
        console.log("Clicked left");

        $scope.playerRight.Points++;
        $scope.votes--;

        var i = getRandomInt(0, $scope.playersToShow.length - 1);
        $scope.playerLeft = $scope.playersToShow[i];
        $scope.playersToShow.splice(i, 1);
        $scope.shownPlayers.push($scope.playerLeft);


        /*$( ".left" ).animate({
            left: "-=100%"
        }, 500, function() {
            // Animation complete.
        });*/

        if($scope.votes == 0){
            endVoting();
        }

    };

    $scope.removeRight = function(){
        console.log("Clicked right");

        $scope.playerLeft.Points++;
        $scope.votes--;

        i = getRandomInt(0, $scope.playersToShow.length -1);
        $scope.playerRight = $scope.playersToShow[i];
        $scope.playersToShow.splice(i, 1);
        $scope.shownPlayers.push($scope.playerRight);

        /*$( ".right" ).animate({
            left: "+=100%"
        }, 500, function() {
            // Animation complete.
        });*/

        if($scope.votes == 0){
            endVoting();
        }
    };

    function endVoting() {
        $( "#voting" ).animate({
            opacity: 0
        }, 5000, function() {
            // Animation complete.
            console.log("animation complete, hide and show");
            $scope.votingVisible = false;
            $scope.lineupVisible = true;
        });

        //drawing a chart : https://github.com/gonewandering/angles

        fillLineup();
    }

    function fillLineup() {
        fillGoalkeeper();
        fillDefenders();
        fillMidfielders();
        fillAttackers();
    }

    function fillGoalkeeper() {
        var onKeeperDownloaded = function(response){
            angular.forEach(response.data, function (value, key){
                var newPlayer = new Player(value.id, value.firstname, value.name, value.dob, value.caps, value.selecties, value.doelpunten, value.speelminuten, value.info, value.position, value.image);
                $scope.favGoalKeepers.push(newPlayer);
            });
        };

        var onError = function(response){
            console.log(response);
        };

        $http.get('http://student.howest.be/niels.lammens/fe/get_players_from_linie.php?pos=goalkeeper&am=1').then(onKeeperDownloaded, onError);
    }

    function fillDefenders() {
        var onDefendersDownloaded = function(response){
            angular.forEach(response.data, function (value, key){
                var newPlayer = new Player(value.id, value.firstname, value.name, value.dob, value.caps, value.selecties, value.doelpunten, value.speelminuten, value.info, value.position, value.image);
                $scope.favDefenders.push(newPlayer);
            });
        };

        var onError = function(response){
            console.log(response);
        };

        $http.get('http://student.howest.be/niels.lammens/fe/get_players_from_linie.php?pos=defender&am=4').then(onDefendersDownloaded, onError);
    }

    function fillMidfielders() {
        var onMidfieldersDownloaded = function(response){
            angular.forEach(response.data, function (value, key){
                var newPlayer = new Player(value.id, value.firstname, value.name, value.dob, value.caps, value.selecties, value.doelpunten, value.speelminuten, value.info, value.position, value.image);
                $scope.favMidfielders.push(newPlayer);
            });
        };

        var onError = function(response){
            console.log(response);
        };

        $http.get('http://student.howest.be/niels.lammens/fe/get_players_from_linie.php?pos=midfielder&am=3').then(onMidfieldersDownloaded, onError);
    }

    function fillAttackers() {
        var onAttackersDownloaded = function(response){
            angular.forEach(response.data, function (value, key){
                var newPlayer = new Player(value.id, value.firstname, value.name, value.dob, value.caps, value.selecties, value.doelpunten, value.speelminuten, value.info, value.position, value.image);
                $scope.favAttackers.push(newPlayer);
            });
        };

        var onError = function(response){
            console.log(response);
        };

        $http.get('http://student.howest.be/niels.lammens/fe/get_players_from_linie.php?pos=attacker&am=3').then(onAttackersDownloaded, onError);
    }

    function initPlayersShown() {
        var i = getRandomInt(0, $scope.playersToShow.length - 1);
        $scope.playerLeft = $scope.playersToShow[i];
        $scope.playersToShow.splice(i, 1);
        $scope.shownPlayers.push($scope.playerLeft);

        i = getRandomInt(0, $scope.playersToShow.length -1);
        $scope.playerRight = $scope.playersToShow[i];
        $scope.playersToShow.splice(i, 1);
        $scope.shownPlayers.push($scope.playerRight);
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    var onError = function (response) {
        console.log(response);
    };


    //$http.get('http://localhost:63342/Angular/src/app/data/players.json').then(onPlayersDownloaded, onError);
    $http.get('http://student.howest.be/niels.lammens/fe/get_goalkeepers.php').then(onPlayersDownloaded, onError);

};