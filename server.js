//load zip csv into memory into a format we can easily iterate over
//executed when gps2zip is required
var fs = require('fs');
var zips = [];
try {
	var data = fs.readFileSync(__dirname + '/zips.json', 'ascii');

	//zips is a global defined up top
	zips = JSON.parse(data);
}
catch (err) {
	console.error("There was an error opening the zip code file:");
	console.log(err);
}

exports.gps2zip = function(lat, lon){	

	var min_distance = -1;
	var min_distance_index = -1;
	for(var i = 0; i < zips.length; i++){
		//compute euclidean distance
		//assumes earth is flat.
		var distance = Math.sqrt(Math.pow(lat - zips[i].latitude, 2) + Math.pow(lon - zips[i].longitude, 2));
		//console.log(distance);
		
		if(distance < min_distance || min_distance === -1){
			min_distance = distance;
			min_distance_index = i;
		}
	}
	if(min_distance_index != -1){
		zips[min_distance_index].distance = min_distance;
		return zips[min_distance_index];
	} else{
		return {error: "Could not find a valid zip code."}
	}
	return zips[5];
}
