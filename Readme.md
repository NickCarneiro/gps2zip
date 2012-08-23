[![build status](https://secure.travis-ci.org/NickCarneiro/gps2zip.png)](http://travis-ci.org/NickCarneiro/gps2zip)
	
# Gps2zip

Convert GPS latitude longitude pairs to a US zip code.

Runs as a server-side node API for your client-side js applications. 

# Quick Start

	npm install Gps2zip
	cd node_modules/Gps2zip/
	node demo.js

# Example usage of demo app

Start the demo app
	
	node demo.js

Access the REST API with curl:
	
	burt$ curl "localhost:4000?lat=30.2859283&lon=-97.7461031"
	{
		"zip code":"78705",
		"state abbreviation":"TX",
		"latitude":" 30.292424",
		"longitude":" -97.73856",
		"city":"Austin",
		"state":"Texas",
		"distance":0.009954520385227613
	}

Or from jQuery:

	var lat = 30.2859283;
	var lon = -97.7461031;
	$.get("/?lat=" + lat + "&lon=" + lon, function(res){
		console.log(res);
		if(res.error != undefined){
			console.log(res.error);
		} else {
			console.log(res["zip code"]);
		}
	});


Open /demo in the browser for a more user-friendly demo.

# Using gps2zip in your own application

	var gps = require('gps2zip');
	var latitude = '30.2669';
	var longitude = '97.7428';
	var response = gps.gps2zip(latitude, longitude);
	console.log(response); //78701


# Accuracy
The output is approximate. The source data is just a list of coordinates, not actual boundaries. The algorithm just finds the minimum euclidean distance between the point in question and the known points. No error checking for points outside the United States.

# Related

You can get full street addresses using the Google Maps Reverse Geocoding API:
http://code.google.com/apis/maps/documentation/javascript/geocoding.html#ReverseGeocoding

# Credit

Zip codes from The Zip Code Database Project
http://sourceforge.net/projects/zips/

# License

All other work is [The Unlicense](http://unlicense.org/) (Public Domain)

