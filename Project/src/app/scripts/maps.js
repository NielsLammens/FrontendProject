var map;
var infoWindow;

function initialize() {
    var mapOptions = {
        zoom: 9,
        center: new google.maps.LatLng(50.764294, 3.860573),
        mapTypeId: google.maps.MapTypeId.TERRAIN
    };

    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    // West-Vlaanderen
    var westFlanders;
    var westFlandersCoords = [
        new google.maps.LatLng(51.367476, 3.362337),
        new google.maps.LatLng(50.799842, 3.510652),
        new google.maps.LatLng(50.711226, 3.355470),
        new google.maps.LatLng(50.790293, 3.152223),
        new google.maps.LatLng(50.806785, 2.977815),
        new google.maps.LatLng(50.723398, 2.843233),
        new google.maps.LatLng(50.811124, 2.725130),
        new google.maps.LatLng(50.813727, 2.634492),
        new google.maps.LatLng(50.922064, 2.598787),
        new google.maps.LatLng(50.947162, 2.634492),
        new google.maps.LatLng(51.087118, 2.547975),
        new google.maps.LatLng(51.346037, 3.198915)
    ];
    westFlanders = new google.maps.Polygon({
        paths: westFlandersCoords,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 3,
        fillColor: '#FF0000',
        fillOpacity: 0.35
    });
    westFlanders.setMap(map);
    google.maps.event.addListener(westFlanders, 'click', showArrays);


    // Oost-Vlaanderen
    var eastFlanders;
    var eastFlandersCoords = [
        new google.maps.LatLng(51.272475, 3.388000),
        new google.maps.LatLng(51.249272, 3.527178),
        new google.maps.LatLng(51.287078, 3.516191),
        new google.maps.LatLng(51.301677, 3.590349),
        new google.maps.LatLng(51.255289, 3.792223),
        new google.maps.LatLng(51.213155, 3.790850),
        new google.maps.LatLng(51.243255, 4.054521),
        new google.maps.LatLng(51.352307, 4.241289),
        new google.maps.LatLng(51.134805, 4.323687),
        new google.maps.LatLng(50.735403, 3.950151),
        new google.maps.LatLng(50.773848, 3.689226),
        new google.maps.LatLng(50.722147, 3.639788),
        new google.maps.LatLng(50.733013, 3.542971),
        new google.maps.LatLng(50.764294, 3.538851),
        new google.maps.LatLng(50.764294, 3.449000),
        new google.maps.LatLng(50.799842, 3.511000)
    ];
    eastFlanders = new google.maps.Polygon({
        paths: eastFlandersCoords,
        strokeColor: '#00FF00',
        strokeOpacity: 0.8,
        strokeWeight: 3,
        fillColor: '#00FF00',
        fillOpacity: 0.35
    });
    eastFlanders.setMap(map);
    google.maps.event.addListener(eastFlanders, 'click', showArrays);

    infoWindow = new google.maps.InfoWindow();
}

/** @this {google.maps.Polygon} */
function showArrays(event) {

    // Since this polygon has only one path, we can call getPath()
    // to return the MVCArray of LatLngs.
    var vertices = this.getPath();

    var contentString = 'Meest populaire spelers:';


    // Replace the info window's content and position.
    infoWindow.setContent(contentString);
    infoWindow.setPosition(event.latLng);

    infoWindow.open(map);
}

google.maps.event.addDomListener(window, 'load', initialize);
