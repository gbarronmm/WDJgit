const request = require('request');

module.exports.geocodeAddress = (address, callback) => {
  var encodedAddress = encodeURIComponent(address);

  request({
    url: `http://www.mapquestapi.com/geocoding/v1/address?key=94ADxVIe8uiGCqghI2ss5537Px2DgYCH&location=${encodedAddress}`,
    json: true
  }, (err, res, body) => {
    if (err) {
      callback('Unable to connect to mapquest servers.');
    } else if (body.results[0].locations[0].street === "") {
      callback('Unable to find the address provided.');
    } else {
      callback(undefined, {
        address: `${body.results[0].providedLocation.location}, ${body.results[0].locations[0].adminArea5}, ${body.results[0].locations[0].adminArea3} ${body.results[0].locations[0].postalCode}, ${body.results[0].locations[0].adminArea1}`,
        latitude: body.results[0].locations[0].latLng.lat,
        longitude: body.results[0].locations[0].latLng.lng
      });
    }
  });
}
