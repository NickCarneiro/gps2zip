var test = require('tape');

var g = require('../');

test('spot check results for a handful of zip codes', function(t) {
    var austin = g.gps2zip(30.2859283, -97.7461031);
    t.equal(austin['zip_code'], 78705);

    var sanFrancisco = g.gps2zip(37.7833, -122.4167);
    t.equal(sanFrancisco['zip_code'], 94102);

    var chicago = g.gps2zip(41.8369, -87.6847);
    t.equal(chicago['zip_code'], 60608);

    var boston = g.gps2zip(42.3581, -71.0636);
    t.equal(boston['zip_code'], 02108);

    var seattle = g.gps2zip(47.6097, -122.3331);
    t.equal(seattle['zip_code'], 98101);

    var marfa = g.gps2zip(30.3119, -104.0247);
    t.equal(marfa['zip_code'], 79843);

    var roundRock = g.gps2zip(30.5086, -97.6789);
    t.equal(roundRock['zip_code'], 78664);

    t.end();
});

