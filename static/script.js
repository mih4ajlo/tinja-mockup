var map;
var picture;

var markers = [];

var url = "data/data.csv";
var citiesData = [];

function initMap() {


    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 44.8666, lng: 13.8496 },
        zoom: 8,
        //icon: marker,
        disableDefaultUI: true
    });


    d3.csv(url, function(data) {
      citiesData = data;
    });


    google.maps.event.addListenerOnce(map, 'idle', function(){
        puttingMarkers(map, citiesData);


        $("#submitForm").click(function(event) {
            var lat = 44.6666;
            var long = 14.1496;



            event.preventDefault();
            var postcode = $("#postcodeInput").val()

            var city = citiesData.filter(function(el) {
               return el.zip == postcode;
            });
            if(  city.length >0  ){
              lat = parseFloat(city[0].lat) ;
              lon = parseFloat(city[0].lon) ;
            }

            $("#introduction-panel").hide();
            $(".belove").removeClass("belove")
            
            var center = new google.maps.LatLng(lat, long);
            
            map.panTo(center);
        });

    });

}







function puttingMarkers(map, citiesData) {
  

    for (var i = 0; i < citiesData.length; i++) {
        var temp_datum = citiesData[i]; 
        var temp_lat =  parseFloat(temp_datum.lat);
        var temp_lon =  parseFloat( temp_datum.lon );

        //https://developers.google.com/maps/documentation/javascript/markers
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(temp_lat,  temp_lon),
            icon: {
                url: 'static/solar_panel.svg',
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

var lowerLimit = Math.round(Math.random()*5);
var upperLimit = 5 + Math.round(Math.random()*5);
var lowerLimitSubs = 20 + Math.round(Math.random()*20);
var upperLimitSubs = 20 + Math.round(Math.random()*50);
upperLimitSubs= upperLimitSubs < (lowerLimitSubs  )? (lowerLimitSubs+10 ): upperLimitSubs; 
var operators =  Math.round(Math.random()*20);

var res =   
  '<div class="popup">' +
  '<div>' +
  '</div>' +
  '<h1  class="firstHeading">' + object.city + '</h1>' +
  '<div>' +
  
  //'<p><b>'+ object.city +'</b> ' +  
  '<div class="popup-label"> Sunny days: </div>  <div class="popup-figure"> '+ object.sunny_days + '</div>' +
  '<div class="popup-label"> ROI: </div>  <div class="popup-figure">'+ lowerLimit + "-"+ upperLimit + 'Y</div>' +
  '<div class="popup-label" title="EU, different sources"> Subsidy*: </div>  <div class="popup-figure">'+ lowerLimitSubs + "-"+ upperLimitSubs + '%</div>' +
  '<div class="popup-label"> Operators in county: </div>  <div class="popup-figure">'+ operators + '</div>' +
  '<div class="popup-label"> Interested homeowners: </div>  <div class="popup-figure">'+ 20 + '</div>' +
  '<div class="popup-label"> Job offers: </div>  <div class="popup-figure">'+ 30 + '</div>' +
  '<div class="popup-label"> People looking for jobs: </div>  <div class="popup-figure">'+ 30 + '</div>' +
  
  '</div>' +
  '</div>';
  return res;
}