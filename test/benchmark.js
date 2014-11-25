var gps = require('../');

// adapted from yildirim's snippet
// https://github.com/NickCarneiro/gps2zip/issues/3

var latitude = 37.4292;
var longitude = -122.1381;
var dlon = 1.0;
var nn = 1000;

var hrStart = process.hrtime();

for (var i=0; i < nn; i++){
    longitude -= dlon/nn;
    var response = gps.gps2zip(latitude, longitude);
}

var hrEnd = process.hrtime(hrStart);

// seeing 3.5 - 4.5 seconds on 2011 MBP before using kd-tree. Now 5-10ms.
console.info("Execution time (hr): %ds %dms", hrEnd[0], hrEnd[1]/1000000);