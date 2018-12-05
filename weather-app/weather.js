const request = require('request');
const yargs = require('yargs');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: "Address to fetch weather for",
      string: true
    }
  })
  .help().alias('help', 'h')
  .version().alias('version', 'v')
  .argv;

  var encodedAddress = encodeURIComponent(argv.address);

request({
  url: `http://www.mapquestapi.com/geocoding/v1/address?key=94ADxVIe8uiGCqghI2ss5537Px2DgYCH&location=${encodedAddress}`,
  json: true
}, (err, res, body) => {
  if(err){
    console.log('Unable to connect to mapquest servers.');
  }else if(body.results[0].locations[0].street === ""){
    console.log('Unable to find the address provided.');
  }else {
    console.log(`Address: ${body.results[0].providedLocation.location}, ${body.results[0].locations[0].adminArea5}, ${body.results[0].locations[0].adminArea3} ${body.results[0].locations[0].postalCode}, ${body.results[0].locations[0].adminArea1}`);
    console.log(`Latitude: ${body.results[0].locations[0].latLng.lat}`);
    console.log(`Longitude: ${body.results[0].locations[0].latLng.lng}`);
  }
});

// https://www.mapquestapi.com/search/v4/place?key=94ADxVIe8uiGCqghI2ss5537Px2DgYCH&sort=relevance&feedback=false&q=Pizza%2075002
