var map;
var infoWindow;

function initialize() {
    var mapOptions = {
        zoom: 8,
        center: new google.maps.LatLng(51, 3.3),
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

    // Antwerpen
    var Antwerp;
    var AntwerpCoords = [
        new google.maps.LatLng(51.423958, 4.535946),
        new google.maps.LatLng(51.473597, 4.548305),
        new google.maps.LatLng(51.448784, 4.382137),
        new google.maps.LatLng(51.420532, 4.384884),
        new google.maps.LatLng(51.363976, 4.431575),
        new google.maps.LatLng(51.372550, 4.218715),
        new google.maps.LatLng(51.125848, 4.310726),
        new google.maps.LatLng(51.039578, 4.298366),
        new google.maps.LatLng(51.034397, 4.217342),
        new google.maps.LatLng(51.000704, 4.452175),
        new google.maps.LatLng(51.043032, 4.968532),
        new google.maps.LatLng(51.144806, 5.258297),
        new google.maps.LatLng(51.304774, 5.240444),
        new google.maps.LatLng(51.394833, 5.071529),
        new google.maps.LatLng(51.469320, 5.078396),
        new google.maps.LatLng(51.471031, 5.008358),
        new google.maps.LatLng(51.399118, 4.912227),
        new google.maps.LatLng(51.429951, 4.765285),
        new google.maps.LatLng(51.421389, 4.832576),
        new google.maps.LatLng(51.504381, 4.774898),
        new google.maps.LatLng(51.421389, 4.640316),
        new google.maps.LatLng(51.423101, 4.537319)

    ];
    Antwerp = new google.maps.Polygon({
        paths: AntwerpCoords,
        strokeColor: '#3399FF',
        strokeOpacity: 0.8,
        strokeWeight: 3,
        fillColor: '#3399FF',
        fillOpacity: 0.35
    });
    Antwerp.setMap(map);
    google.maps.event.addListener(Antwerp, 'click', showArrays);

    // Limburg
    var Limburg;
    var LimburgCoords = [
        new google.maps.LatLng(51.261986, 5.333055),
        new google.maps.LatLng(51.245656, 5.220445),
        new google.maps.LatLng(51.138073, 5.209459),
        new google.maps.LatLng(51.034557, 4.981493),
        new google.maps.LatLng(51.019010, 5.063890),
        new google.maps.LatLng(51.048373, 5.116075),
        new google.maps.LatLng(51.021602, 5.155901),
        new google.maps.LatLng(50.940330, 5.043291),
        new google.maps.LatLng(50.899640, 5.188860),
        new google.maps.LatLng(50.711316, 5.103716),
        new google.maps.LatLng(50.718272, 5.305589),
        new google.maps.LatLng(50.746087, 5.389360),
        new google.maps.LatLng(50.726097, 5.475878),
        new google.maps.LatLng(50.808610, 5.679125),
        new google.maps.LatLng(50.875383, 5.653032),
        new google.maps.LatLng(51.141520, 5.843919),
        new google.maps.LatLng(51.221579, 5.562395),
        new google.maps.LatLng(51.295489, 5.514330),
        new google.maps.LatLng(51.264564, 5.415453)
    ];
    Limburg = new google.maps.Polygon({
        paths: LimburgCoords,
        strokeColor: '#FFFF66',
        strokeOpacity: 0.8,
        strokeWeight: 3,
        fillColor: '#FFFF66',
        fillOpacity: 0.35
    });
    Limburg.setMap(map);
    google.maps.event.addListener(LimburgCoords, 'click', showArrays);

    // Vlaams Brabant
    var VlaamsBrabant;
    var VBrabantCoords = [
        new google.maps.LatLng(50.930330, 4.097282),
        new google.maps.LatLng(50.837626, 4.043724),
        new google.maps.LatLng(50.830687, 4.069129),
        new google.maps.LatLng(50.772536, 4.015571),
        new google.maps.LatLng(50.769496, 3.939353),
        new google.maps.LatLng(50.729961, 3.937980),
        new google.maps.LatLng(50.726050, 3.894722),
        new google.maps.LatLng(50.690393, 3.932487),
        new google.maps.LatLng(50.726050, 4.150154),
        new google.maps.LatLng(50.701484, 4.306709),
        new google.maps.LatLng(50.749298, 4.496223),
        new google.maps.LatLng(50.795328, 4.645912),
        new google.maps.LatLng(50.706703, 5.093605),
        new google.maps.LatLng(50.903708, 5.186988),
        new google.maps.LatLng(50.934009, 5.044166),
        new google.maps.LatLng(51.024794, 5.151283),
        new google.maps.LatLng(51.010972, 4.810707),
        new google.maps.LatLng(51.006651, 4.490730),
        new google.maps.LatLng(51.029977, 4.244911),
        new google.maps.LatLng(50.926219, 4.148780),
        new google.maps.LatLng(50.927950, 4.099342)
    ];
    VlaamsBrabant = new google.maps.Polygon({
        paths: VBrabantCoords,
        strokeColor: '#CC0000',
        strokeOpacity: 0.8,
        strokeWeight: 3,
        fillColor: '#CC0000',
        fillOpacity: 0.35
    });
    VlaamsBrabant.setMap(map);
    google.maps.event.addListener(VBrabantCoords, 'click', showArrays);

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

function resizeMap() {
    google.maps.event.trigger(map, "resize");
    map.setCenter(new google.maps.LatLng(51, 4.8));
}

google.maps.event.addDomListener(window, 'load', initialize);
