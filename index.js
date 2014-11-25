//load zip csv into memory into a format we can easily iterate over
//executed when gps2zip is required
var fs = require('fs');
var kd = require('kdtree');
var zips = [];
try {
	// zip code data is sorted by ascending latitude
	// From the Puerto Rico to Alaska
	var data = fs.readFileSync(__dirname + '/zip_codes_sorted.json', 'ascii');

	//zips is a global defined up top
	zips = JSON.parse(data);

	var tree = new kd.KDTree(2);
	for (var i = 0; i < zips.length; i++){
		tree.insert(zips[i].latitude, zips[i].longitude, i);
	}
} catch (err) {
	console.error("There was an error opening the zip code file:");
	console.log(err);
}

exports.gps2zip = function(lat, lon){

	var result = tree.nearest(lat, lon);
	var nearestIndex = result[2];
	return zips[nearestIndex];

};
