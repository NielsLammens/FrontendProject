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
    $scope.infoVisible = false;

    $scope.votes = -1;
    $scope.KEY_FAVGOALKEEPER = "storage.favgoalkeeper";
    $scope.KEY_FAVDEFENDER = "storage.favdefender";
    $scope.KEY_FAVMIDFIELDER = "storage.favmidfielder";
    $scope.KEY_FAVATTACKER= "storage.favattacker";

    $scope.geocoder;
    $scope.provincie_id = 0;
    $scope.westVlaanderen = [];
    $scope.oostVlaanderen = [];
    $scope.antwerpen = [];
    $scope.limburg = [];
    $scope.vlaamsBrabant = [];

    var onPlayersDownloaded = function (response) {
        $scope.geocoder = new google.maps.Geocoder();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            console.log("no location services available in this browser");
        }

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

    function showPosition(position){
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;

        var latlng = new google.maps.LatLng(lat, lng);
        $scope.geocoder.geocode({'latLng': latlng}, function(results, status) {
            console.log(results[0].address_components[3].long_name + " ; " + results[0].address_components[3].short_name);
            var prov = results[0].address_components[3].short_name;
            switch (prov){
                case "OV":
                    $scope.provincie_id = 1;
                case "WV":
                    $scope.provincie_id = 2;
                case "AN":
                    $scope.provincie_id = 3;
                case "LI":
                    $scope.provincie_id = 4;
                case "VB":
                    $scope.provincie_id = 5;
                case "Brussel":
                    $scope.provincie_id = 5;
            }
        });


    }

    $scope.removeLeft = function(){

        console.log("Clicked right");


        var onPlayerUpdated = function(response){
            console.log("points sent");
            console.log(response);
        };

        var onError = function(response){
            console.log(response);
        };

        if($scope.selectedLinie.array.length > 2){

            console.log($scope.selectedLinie.array.length);

            $scope.playerRight.Points++;
            $scope.votes--;

            $(".left").animate({
                opacity: '0.3'
            }, 50, function() {

                //console.log("CHANGE");
            });

            $(".left").animate({
                opacity: '1'
            }, 500, function () {

            });

            //  remove current player
            var ind = $scope.selectedLinie.array.indexOf($scope.playerLeft);

            $scope.selectedLinie.array.splice(ind, 1);
            $scope.shownPlayers.push($scope.playerLeft);

            var i = 0;
            do{
                i = getRandomInt(0, $scope.selectedLinie.array.length -1);
            }while(i == $scope.selectedLinie.array.indexOf($scope.playerRight));

            $scope.playerLeft = $scope.selectedLinie.array[i];

        }else{

            var id = $scope.playerRight.id, incr = 1;
            var url = 'http://student.howest.be/niels.lammens/fe/update_player.php?id=' + id + '&i=' + incr;
            $http.get(url).then(onPlayerUpdated, onError);

            $(function () {
                $(".left").animate({
                    width: '0',
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

        if($scope.selectedLinie.array.length > 2){

            console.log($scope.selectedLinie.array.length);

            $scope.currentPoints++;
            $scope.playerLeft.Points++;
            $scope.votes--;

            $(".right").animate({
                opacity: '0.3'
            }, 50, function() {

                //console.log("CHANGE");
            });

            $(".right").animate({
                opacity: '1'
            }, 500, function () {

            });


            //  remove current player
            var ind = $scope.selectedLinie.array.indexOf($scope.playerRight);

            $scope.selectedLinie.array.splice(ind, 1);
            $scope.shownPlayers.push($scope.playerRight);

            var i = 0;
            do{
                i = getRandomInt(0, $scope.selectedLinie.array.length -1);
            }while(i == $scope.selectedLinie.array.indexOf($scope.playerLeft));

            $scope.playerRight = $scope.selectedLinie.array[i];

        }else{
            var id = $scope.playerLeft.id, incr = 1;
            var url = 'http://student.howest.be/niels.lammens/fe/update_player.php?id=' + id + '&i=' + incr;
            $http.get(url).then(onPlayerUpdated, onError);

            $(function () {
                $(".right").animate({
                    width: '0',
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
            $scope.infoVisible = false;
            $("#voting").animate({
                opacity: '1'
            }, 500 );

        }else{
            $scope.votingVisible = true;

            $scope.mapVisible = false;
            $scope.lineupVisible = false;
            $scope.infoVisible = false;
            $("#lineup").css( "opacity", "0" );
            $("#popularity").css( "opacity", "0" );
            $(".info").css("opacity", "0");

            $("#voting").animate({
                opacity: 1
            }, { duration: 500 });
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

            $scope.mapVisible = false;
            $scope.votingVisible = false;
            $scope.infoVisible = false;

            $("#lineup").css( "opacity", "0" );
            $("#popularity").css( "opacity", "0" );
            $(".info").css("opacity", "0");

            $("#lineup").animate({
                opacity: 1
            }, { duration: 500 });
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
            console.log("index: " + i);
            if(i < $scope.selectedLinie.array.length -2){
                i += 1;
                //console.log("index: " + i);
            }else{
                i = 0;
                //console.log("index: " + i);
            }

            //i = getRandomInt(0, $scope.selectedLinie.array.length -1);
            $scope.playerRight = $scope.selectedLinie.array[i];
            console.log("index: " + i);

        }else{
            $(".left").css( "width", "100%" );
            $(".left").css( "opacity", "0" );
            $(".right").css( "width", "0%" );
            $(".right").css( "opacity", "0" );
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
            }, { duration: 2000, queue: false });
            $(".right").animate({
                opacity: '1'
            }, { duration: 2000, queue: false });
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

            $scope.votingVisible = false;
            $scope.lineupVisible = false;
            $scope.infoVisible = false;

            $("#popularity").animate({
                opacity: 1
            }, { duration: 500, queue: false, complete: function(){
                resizeMap();
            }});
        }
        resizeMap();
    }

    $scope.InfoPanels = function () {
        document.getElementById("title").innerHTML = "Spelersinfo";
        if(!$scope.infoVisible){
            $scope.infoVisible = true;

            $scope.votingVisible = true;
            $scope.lineupVisible = false;
            $scope.mapVisible = false;
            $(".info").css( "line-height", "1.8" );
            $(".info").css( "z-index", "1" );
            $(".info").animate({
                opacity: 1
            }, { duration: 500 });
        }
    }

    $scope.InfoPanelsClose = function () {
        document.getElementById("title").innerHTML = "Kies telkens uw favoriete speler";
        if($scope.infoVisible){
            $scope.infoVisible = false;
            $scope.lineupVisible = false;
            $scope.mapVisible = false;
            $scope.votingVisible = true;

            $(".info").animate({
                opacity: 0
            }, { duration: 500, queue: false, complete: function(){
                $(".info").css( "z-index", "-1" );
            }});

        }

    }

    //$http.get('http://localhost:63342/Angular/src/app/data/players.json').then(onPlayersDownloaded, onError);
    $http.get('http://student.howest.be/niels.lammens/fe/get_goalkeepers.php').then(onPlayersDownloaded, onError);

};

