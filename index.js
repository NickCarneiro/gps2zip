//load zip csv into memory into a format we can easily iterate over
//executed when gps2zip is required
var fs = require('fs');
var kdt = require('kdt');
var zips = [];
try {
	// zip code data is sorted by ascending latitude
	// From the Puerto Rico to Alaska
	var data = fs.readFileSync(__dirname + '/zip_codes_sorted.json', 'ascii');

	//zips is a global defined up top
	zips = JSON.parse(data);
	var distance = function(a, b){
		return Math.pow(a.latitude - b.latitude, 2) +  Math.pow(a.longitude - b.longitude, 2);
	};
	var tree = kdt.createKdTree(zips, distance, ['latitude', 'longitude']);
} catch (err) {
	console.error("There was an error opening the zip code file:");
	console.log(err);
}

exports.gps2zip = function(latitude, longitude){
	// we've already constructed the kd-tree. Just find the nearest location
	var results =  tree.nearest({'latitude': latitude, 'longitude': longitude}, 1);
	var firstResult = results[0];
	var zipCode = firstResult[0];
	return zipCode;
};
