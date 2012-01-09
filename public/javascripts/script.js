/* Author: Nick Carneiro

*/
//global for google map
var map;
var marker;

$(function(){

	//initialize google map
	var myOptions = {
		center: new google.maps.LatLng(-34.397, 150.644),
		zoom: 16,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
   	//initialize marker with no position
    marker = new google.maps.Marker({
      map:map
  	});

    //fill window with map
    $("#map_canvas").css("width", "100%");
    var height = $(window).height();
    $("#map_canvas").css("height", height);

    //bind listener for click
    google.maps.event.addListener(map, 'click', function(e) {
    	lookupPoint(e.latLng.Qa, e.latLng.Ra);
 	});

 	//get current position
	navigator.geolocation.getCurrentPosition( 

		function (position) {  
			var lat = position.coords.latitude;
			var lon = position.coords.longitude;
			var latlon = new google.maps.LatLng(lat, lon);
			map.setCenter(latlon);
			lookupPoint(lat, lon);
		}, 

		// next function is the error callback
		function (error){
			console.log("geolocation api error");
		}
	);
})


//get zip code for coordinates, place marker and go to location on the map
function lookupPoint(lat, lon){
	$("#latitude").html(lat);
	$("#longitude").html(lon);

	var latlon = new google.maps.LatLng(lat, lon);
	
	//place marker on current location
	marker.setPosition(latlon);
  	
	$.get("/?lat=" + lat + "&lon=" + lon, function(res){
		if(res.error != undefined){
			$("#zip").html(res.error);
		} else {
			$("#zip").html(res["zip code"]);
		}
	});
}


