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

    $scope.favGoalKeeper = new Player();
    $scope.favDefender = new Player();
    $scope.favMidfielder = new Player();
    $scope.favAttacker = new Player();

    $scope.coaches = [];

    $scope.currentPlayers = [];
    $scope.playersToShow = [];
    $scope.shownPlayers = [];

    $scope.playerLeft = new Player();
    $scope.playerRight = new Player();

    $scope.votingVisible = true;
    $scope.lineupVisible = false;
    $scope.mapVisible = false;

    $scope.votes = -1;
    $scope.KEY_FAVGOALKEEPER = "storage.favgoalkeeper";
    $scope.KEY_FAVDEFENDER = "storage.favdefender";
    $scope.KEY_FAVMIDFIELDER = "storage.favmidfielder";
    $scope.KEY_FAVATTACKER= "storage.favattacker";

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

            $(".left").animate({
                opacity: '0.3'
            }, 50, function() {

                console.log("CHANGE");
            });

            $(".left").animate({
                opacity: '1'
            }, 500, function () {

            });

            var i = getRandomInt(0, $scope.selectedLinie.array.length - 1);
            $scope.playerLeft = $scope.selectedLinie.array[i];
            $scope.selectedLinie.array.splice(i, 1);
            $scope.shownPlayers.push($scope.playerLeft);

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
                    switch ($scope.selectedLinie){
                        case $scope.linies[0]:
                            localStorage.setItem($scope.KEY_FAVGOALKEEPER, $scope.playerRight.id);
                            break;
                        case $scope.linies[1]:
                            localStorage.setItem($scope.KEY_FAVDEFENDER, $scope.playerRight.id);
                            break;
                        case $scope.linies[2]:
                            localStorage.setItem($scope.KEY_FAVMIDFIELDER, $scope.playerRight.id);
                            break;
                        case $scope.linies[3]:
                            localStorage.setItem($scope.KEY_FAVATTACKER, $scope.playerRight.id);
                            break;
                    }
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
                    switch ($scope.selectedLinie){
                        case $scope.linies[0]:
                            localStorage.setItem($scope.KEY_FAVGOALKEEPER, $scope.playerLeft.id);
                            break;
                        case $scope.linies[1]:
                            localStorage.setItem($scope.KEY_FAVDEFENDER, $scope.playerLeft.id);
                            break;
                        case $scope.linies[2]:
                            localStorage.setItem($scope.KEY_FAVMIDFIELDER, $scope.playerLeft.id);
                            break;
                        case $scope.linies[3]:
                            localStorage.setItem($scope.KEY_FAVATTACKER, $scope.playerLeft.id);
                            break;
                    }
                }
                });
            });
        }

    };

    $scope.linieChanged = function(linieIndex){

        //console.log("voting visible: " + $scope.votingVisible);
        if($scope.votingVisible){
            $scope.votingVisible = true;
            /*$("#voting").animate({
                opacity: '0'
            }, 500, function(){

            });*/

        }else if($scope.lineupVisible){
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
        }else{
            $scope.votingVisible = true;
            $(function () {
                $("#voting").animate({
                    height: 'toggle'
                }, { duration: 500, queue: false });
                $("#popularity").animate({
                    height: '0'
                }, { duration: 500, queue: false, complete: function(){
                    $scope.mapVisible = false;
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
            fillLineup();
            $scope.lineupVisible = true;
            document.getElementById("title").innerHTML = "Rode Duivels WK All-Star team";

            if($scope.votingVisible){
                $(function () {
                    $("#lineup").animate({
                        height: 'toggle',
                        opacity: '1'
                    }, { duration: 2500 });
                    $("#voting").animate({
                        height: 'toggle',
                        opacity: '0'
                    }, { duration: 2500, complete: function(){
                        $scope.votingVisible = false;
                    }
                    });
                });
            }else{
                $(function () {
                    $("#lineup").animate({
                        height: 'toggle',
                        opacity: '1'
                    }, { duration: 2500, queue: false });
                    $("#popularity").animate({
                        height: '0',
                        opacity: '0'
                    }, { duration: 2500, complete: function(){
                        $scope.mapVisible = false;
                    }
                    });
                });
            }
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
        $scope.favDefenders = [];
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

        var isFavAlreadyChosen = false;

        $scope.favGoalKeeper    = getPlayerById(localStorage.getItem($scope.KEY_FAVGOALKEEPER));
        $scope.favDefender      = getPlayerById(localStorage.getItem($scope.KEY_FAVDEFENDER));
        $scope.favMidfielder    = getPlayerById(localStorage.getItem($scope.KEY_FAVMIDFIELDER));
        $scope.favAttacker      = getPlayerById(localStorage.getItem($scope.KEY_FAVATTACKER));

        /*
        console.log($scope.favGoalKeeper.id + " " + $scope.favGoalKeeper.name);
        console.log($scope.favDefender.id + " " + $scope.favDefender.name);
        console.log($scope.favMidfielder.id + " " + $scope.favMidfielder.name);
        console.log($scope.favAttacker.id + " " + $scope.favAttacker.name);
        */

        switch ($scope.selectedLinie){
            case $scope.linies[0]:
                if(typeof $scope.favGoalKeeper != 'undefined'){
                    $scope.playerLeft = $scope.favGoalKeeper;
                    isFavAlreadyChosen = true;
                }
                break;
            case $scope.linies[1]:
                if(typeof $scope.favDefender != 'undefined'){
                    $scope.playerLeft = $scope.favDefender;
                    isFavAlreadyChosen = true;
                }
                break;
            case $scope.linies[2]:
                if(typeof $scope.favMidfielder != 'undefined'){
                    $scope.playerLeft = $scope.favMidfielder;
                    isFavAlreadyChosen = true;
                }
                break;
            case $scope.linies[3]:
                if(typeof $scope.favAttacker != 'undefined'){
                    $scope.playerLeft = $scope.favAttacker;
                    isFavAlreadyChosen = true;
                }
                break;
        }

        if(!isFavAlreadyChosen){
            resetPlayerslayout();

            var i = getRandomInt(0, $scope.selectedLinie.array.length - 1);
            $scope.playerLeft = $scope.selectedLinie.array[i];
            $scope.selectedLinie.array.splice(i, 1);
            $scope.shownPlayers.push($scope.playerLeft);

            i = getRandomInt(0, $scope.selectedLinie.array.length -1);
            $scope.playerRight = $scope.selectedLinie.array[i];
            $scope.selectedLinie.array.splice(i, 1);
            $scope.shownPlayers.push($scope.playerRight);
        }else{
            $(".left").css( "width", "100%" );
            $(".left").css( "opacity", "0" );
            $(".right").css( "width", "0%" );
            $( ".left" ).animate({
                opacity: "1"
            }, 500);
        }
    }

    function getPlayerById(id) {
        var l = $scope.players.length, i = 0;
        for(i; i < l; i++){
            if($scope.players[i].id == id){
                return $scope.players[i];
            }
        }
    }

    function resetPlayerslayout() {
        document.getElementById("title").innerHTML = "Kies telkens uw favoriete speler";
        $(".left").css( "width", "49.5%" );
        $(".right").css( "width", "49.5%" );
        $(".left").css( "opacity", "0" );
        $(".right").css( "opacity", "0" );
        $("#voting").css( "opacity", "1" );
        $(function () {
            $(".left").animate({
                opacity: '1'
            }, { duration: 500, queue: false });
            $(".right").animate({
                opacity: '1'
            }, { duration: 500, queue: false });
        });
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    var onError = function (response) {
        console.log(response);
    };

    $scope.clearStorage = function(){
        localStorage.clear();
    }

    $scope.popularityMap = function () {
        document.getElementById("title").innerHTML = "Populariteitskaart";
        if(!$scope.mapVisible){
            $scope.mapVisible = true;

            if($scope.lineupVisible){
                $(function () {
                    $("#popularity").animate({
                        height: '500px',
                        opacity: 1
                    }, { duration: 2500, queue: false });
                    $("#lineup").animate({
                        height: 'toggle'
                    }, { duration: 2500, queue: false, complete: function(){
                        $scope.lineupVisible = false;
                    }
                    });
                });
            }else{
                $(function () {
                    $("#popularity").animate({
                        height: '500px',
                        opacity:1
                    }, { duration: 2500, queue: false });
                    $("#voting").animate({
                        height: 'toggle'
                    }, { duration: 2500, queue: false, complete: function(){
                        $scope.votingVisible = false;
                    }
                    });
                });
            }
        }


    }

    //$http.get('http://localhost:63342/Angular/src/app/data/players.json').then(onPlayersDownloaded, onError);
    $http.get('http://student.howest.be/niels.lammens/fe/get_goalkeepers.php').then(onPlayersDownloaded, onError);

};

