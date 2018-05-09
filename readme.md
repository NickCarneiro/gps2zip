#  [![NPM version][npm-image]][npm-url][![Build Status](https://travis-ci.org/NickCarneiro/gps2zip.svg)](https://travis-ci.org/NickCarneiro/gps2zip)

# Gps2zip

Convert GPS latitude longitude pairs to a US zip code.

# Quick Start

  npm install gps2zip

# Usage

  var gps = require('gps2zip');
  var latitude = 30.2669;
  var longitude = 97.7428;
  gps.gps2zip(latitude, longitude);
  // returns 78701

# Unit tests

  node test/basic.js

# Accuracy
The output is approximate. The source data is just a list of coordinates, not actual boundaries. The algorithm just finds the minimum euclidean distance between the point in question and the known points. No error checking for points outside the United States.


# Related

You can get full street addresses using the Google Maps Reverse Geocoding API:
http://code.google.com/apis/maps/documentation/javascript/geocoding.html#ReverseGeocoding

# Credit

Zip codes from US Census Bureau (Census.gov › Geography › Maps & Data › Gazetteer Files › 2017 U.S. Gazetteer Files)
http://www.census.gov/geo/maps-data/data/gazetteer2017.html
