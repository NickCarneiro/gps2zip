//{
//    "zip code": "35004",
//    "state abbreviation": "AL",
//    "latitude": " 33.606379",
//    "longitude": " -86.50249",
//    "city": "Moody",
//    "state": "Alabama"
//},

var fs = require('fs');
var zips = [];
try {
    var data = fs.readFileSync(__dirname + '/zip_codes_sorted.json', 'ascii');

    //zips is a global defined up top
    zips = JSON.parse(data);
}
catch (err) {
    console.error("There was an error opening the zip code file:");
    console.log(err);
}

var newLocationList = [];
zips.forEach(function(location) {
    var newLocation = {};
    for (var key in location) {
        var newKey = key.replace(' ', '_');
        newLocation[newKey] = location[key];
    }
    newLocationList.push(newLocation)
});

function compare(loc1, loc2) {
    return loc1['latitude'] < loc2['latitude'] ? -1 : 1;
}

newLocationList.sort(compare);

fs.writeFileSync('sorted_locations.json', JSON.stringify(newLocationList, null, 4));