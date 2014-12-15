/**
 * Created by nielslammens on 1/12/14.
 */

var HotOrNotController = function($scope, $http){

    $scope.linies = [{id: 1, linie:"Goalkeepers", array: []},{id: 2, linie:"Defenders", array: []},{id: 3, linie:"Midfielders", array: []},{id: 4, linie:"Attackers", array: []}];
    $scope.selectedLinie = $scope.linies[0];
    $scope.players = [];
    $scope.goalKeepers = [];
    $scope.currentPoints = 0;

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

        $scope.linies[0].array = $scope.goalKeepers;
        $scope.linies[1].array = $scope.defenders;
        $scope.linies[2].array = $scope.midfielders;
        $scope.linies[3].array = $scope.attackers;

        $scope.votes = $scope.players.length - 1;
        initPlayersShown();
    };

    $scope.removeLeft = function(){
        console.log("Clicked right");

        var onPlayerUpdated = function(response){
            console.log("points sent");
            console.log(response);
        };

        var onError = function(response){
            console.log(response);
        };

        if($scope.selectedLinie.array.length >= 1){
            $scope.playerRight.Points++;
            $scope.votes--;

            var i = getRandomInt(0, $scope.selectedLinie.array.length - 1);
            $scope.playerLeft = $scope.selectedLinie.array[i];
            $scope.selectedLinie.array.splice(i, 1);
            $scope.shownPlayers.push($scope.playerLeft);


            /*$( ".left" ).animate({
             left: "-=100%"
             }, 500, function() {
             // Animation complete.
             });*/
        }else{

            var id = $scope.playerRight.id, incr = 1;
            var url = 'http://student.howest.be/niels.lammens/fe/update_player.php?id=' + id + '&i=' + incr;
            $http.get(url).then(onPlayerUpdated, onError);

            $(function () {
                $(".left").animate({
                    width: 'toggle',
                    opacity: '0'
                }, { duration: 500, queue: false });
                $(".right").animate({
                    width: '100%'
                }, { duration: 500, queue: false, complete: function(){
                    // TODO: speler opslaan in localstorage
                }
                });
            });
        }



    };

    $scope.removeRight = function(){
        console.log("Clicked left");

        var onPlayerUpdated = function(response){
            console.log("points sent");
            console.log(response);
        };

        var onError = function(response){
            console.log(response);
        };

        if($scope.selectedLinie.array.length >= 1){

            $scope.currentPoints++;
            $scope.playerLeft.Points++;
            $scope.votes--;

            i = getRandomInt(0, $scope.selectedLinie.array.length -1);
            $scope.playerRight = $scope.selectedLinie.array[i];
            $scope.selectedLinie.array.splice(i, 1);
            $scope.shownPlayers.push($scope.playerRight);

        }else{
            var id = $scope.playerLeft.id, incr = 1;
            var url = 'http://student.howest.be/niels.lammens/fe/update_player.php?id=' + id + '&i=' + incr;
            $http.get(url).then(onPlayerUpdated, onError);

            $(function () {
                $(".right").animate({
                    width: 'toggle',
                    opacity: '0'
                }, { duration: 500, queue: false });
                $(".left").animate({
                    width: '100%'
                }, { duration: 500, queue: false, complete: function(){
                    // TODO: speler opslaan in localstorage
                }
                });
            });
        }



    };


    $scope.linieChanged = function(linieIndex){

        console.log("voting visible: " + $scope.votingVisible);
        if(!$scope.votingVisible){
            $scope.votingVisible = true;
            $(function () {
                $("#voting").animate({
                    height: 'toggle'
                }, { duration: 500, queue: false });
                $("#lineup").animate({
                    height: 'toggle'
                }, { duration: 500, queue: false, complete: function(){
                    $scope.lineupVisible = false;
                }
                });
            });
        }

        console.log("linie chosen:" + linieIndex);

        $scope.selectedLinie = $scope.linies[linieIndex];

        initPlayersShown();
    }

    $scope.endVoting = function() {
        if(!$scope.lineupVisible){
            $scope.lineupVisible = true;

            $(function () {
                $("#lineup").animate({
                    height: 'toggle'
                }, { duration: 500, queue: false });
                $("#voting").animate({
                    height: 'toggle'
                }, { duration: 500, queue: false, complete: function(){
                    $scope.votingVisible = false;
                }
                });
            });

            fillLineup();
        }

    }

    function fillLineup() {
        fillGoalkeeper();
        fillDefenders();
        fillMidfielders();
        fillAttackers();
    }

    function fillGoalkeeper() {
        $scope.favGoalKeepers = [];
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
            $scope.favDefenders = [];
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
        $scope.favMidfielders = [];
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
        $scope.favAttackers = [];
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

        resetPlayerslayout();

        var i = getRandomInt(0, $scope.selectedLinie.array.length - 1);
        $scope.playerLeft = $scope.selectedLinie.array[i];
        $scope.selectedLinie.array.splice(i, 1);
        $scope.shownPlayers.push($scope.playerLeft);

        i = getRandomInt(0, $scope.selectedLinie.array.length -1);
        $scope.playerRight = $scope.selectedLinie.array[i];
        $scope.selectedLinie.array.splice(i, 1);
        $scope.shownPlayers.push($scope.playerRight);
    }

    function resetPlayerslayout() {
        document.getElementById("title").innerHTML = "Kies telkens uw favoriete speler";
        $(".left").css( "width", "49.5%" );
        $(".right").css( "width", "49.5%" );
        $(".left").css( "opacity", "1" );
        $(".right").css( "opacity", "1" );
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