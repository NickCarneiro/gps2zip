
# Gps2zip
Convert GPS latitude longitude pairs to a US zip code.

Runs as a server-side node API for your client-side js applications. 

# Example usage
Command line:
	
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

From jQuery:

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


See /demo for an example using jQuery in the browser.

# Quick Start

	npm install gps2zip
	node server.js

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

