var map;
var infoWindow;
var contentString;
var content = [];
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
        fillOpacity: 0.35,
        PROV: "2"
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
        fillOpacity: 0.35,
        PROV: "1"
    });
    eastFlanders.setMap(map);
    google.maps.event.addListener(eastFlanders, 'click', showArrays);

    // Antwerpen
    var Antwerp;
    var AntwerpCoords = [
        new google.maps.LatLng(51.372335, 4.221462),
        new google.maps.LatLng(51.353042, 4.241375),
        new google.maps.LatLng(51.132096, 4.323772),

        new google.maps.LatLng(51.040226, 4.194683),
        new google.maps.LatLng(51.005241, 4.453548),
        new google.maps.LatLng(51.026408, 4.896434),
        new google.maps.LatLng(51.147606, 5.256237),
        new google.maps.LatLng(51.304560, 5.239757),
        new google.maps.LatLng(51.317436, 5.134014),
        new google.maps.LatLng(51.486640, 5.036510),
        new google.maps.LatLng(51.398047, 4.926647),
        new google.maps.LatLng(51.413038, 4.776958),
        new google.maps.LatLng(51.429737, 4.768718),
        new google.maps.LatLng(51.421174, 4.831203),
        new google.maps.LatLng(51.480654, 4.838756),
        new google.maps.LatLng(51.497328, 4.752239),
        new google.maps.LatLng(51.426312, 4.666408),
        new google.maps.LatLng(51.424172, 4.535946),
        new google.maps.LatLng(51.481081, 4.537319),
        new google.maps.LatLng(51.448142, 4.382137),
        new google.maps.LatLng(51.361618, 4.433635),


    ];
    Antwerp = new google.maps.Polygon({
        paths: AntwerpCoords,
        strokeColor: '#3399FF',
        strokeOpacity: 0.8,
        strokeWeight: 3,
        fillColor: '#3399FF',
        fillOpacity: 0.35,
        PROV: "3"
    });
    Antwerp.setMap(map);
    google.maps.event.addListener(Antwerp, 'click', showArrays);

    // Limburg
    var Limburg;
    var LimburgCoords = [
        new google.maps.LatLng(51.264564, 5.257524),
        new google.maps.LatLng(51.139796, 5.250658),
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
        fillOpacity: 0.35,
        PROV: "4"
    });
    Limburg.setMap(map);
    google.maps.event.addListener(Limburg, 'click', showArrays);

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
        fillOpacity: 0.35,
        PROV: "5"
    });
    VlaamsBrabant.setMap(map);
    google.maps.event.addListener(VlaamsBrabant, 'click', showArrays);

    infoWindow = new google.maps.InfoWindow();
}

/** @this {google.maps.Polygon} */
function showArrays(event) {

    // Since this polygon has only one path, we can call getPath()
    // to return the MVCArray of LatLngs.
    var vertices = this.getPath();

    contentString = 'Populairste speler: <br>';

    var prov = this.PROV;

    var p, i = 0;

    for(i; i < 5; i++){
        if(content[i].provincie == prov){
            p = content[i];
        }
    }

    contentString += p.firstName + " " + p.name + "<br>";
    contentString += "<img width=\"75\" src=\"" + p.url + "\">";

    // Replace the info window's content and position.
    infoWindow.setContent(contentString);
    infoWindow.setPosition(event.latLng);

    infoWindow.open(map);
}

function resizeMap() {
    google.maps.event.trigger(map, "resize");
    map.setCenter(new google.maps.LatLng(51, 4.8));
}

function setContents(c) {
    content = c;
}

google.maps.event.addDomListener(window, 'load', initialize);
