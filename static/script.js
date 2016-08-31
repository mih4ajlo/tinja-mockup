var map;
var picture;

var markers = [];

var url = "data/data.csv";
var allData = [];

function initMap() {


    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 44.8666, lng: 13.8496 },
        zoom: 8,
        //icon: marker,
        disableDefaultUI: true
    });


    d3.csv(url, function(data) {
      allData = data;
    });


    google.maps.event.addListenerOnce(map, 'idle', function(){
        puttingMarkers(map, allData);


        $("#submitForm").click(function(event) {
            var lat = 44.6666;
            var long = 14.1496;

            event.preventDefault();
            $("#landing").hide();
            $(".belove").removeClass("belove")
            
            var center = new google.maps.LatLng(lat, long);
            
            map.panTo(center);
        });

    });

}







function puttingMarkers(map, allData) {
  

    for (var i = 0; i < allData.length; i++) {
        var temp_datum = allData[i]; 
        var temp_lat =  parseFloat(temp_datum.lat);
        var temp_lon =  parseFloat( temp_datum.lon );

        //https://developers.google.com/maps/documentation/javascript/markers
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(temp_lat,  temp_lon),
            icon: {
                url: 'http://localhost/tinja-mockup/static/solar_panel.svg',
                size: new google.maps.Size(30, 42)           

            },

            title: temp_datum.city
        });

        var contentString = textData( temp_datum );

        var infowindow = new google.maps.InfoWindow({
            content: contentString,

        });

        marker.infobox = infowindow;
        
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                markers[i].infobox.open(map, this);
                map.panTo(markerData[i].latLng);
            }
        })(marker, i));



        markers.push(marker);
    }

 

    var stylesMC = [{
        url: 'static/sun_dark.svg',
        height: 50,
        width: 50,
        anchor: [-7, 16],
        textColor: 'white',
        textSize: 10
    }]

    var mcOptions = { gridSize: 50, maxZoom: 9, styles: stylesMC };
    var mc = new MarkerClusterer(map, markers, mcOptions);


}


function textData( object ) {



var res =   
  '<div id="content' + object.city + '">' +
  '<div>' +
  '</div>' +
  '<h1  class="firstHeading">' + object.city + '</h1>' +
  '<div>' +
  '<p>' +
  //'<p><b>'+ object.city +'</b> ' +  
  '<br/> Broj suncanih dana: '+ object.sunny_days + 
  
  '</p>' +
  '</div>' +
  '</div>';
  return res;
}