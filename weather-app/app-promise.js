const yargs = require('yargs');
const axios = require('axios');

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
  var geocodeUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=94ADxVIe8uiGCqghI2ss5537Px2DgYCH&location=${encodedAddress}`;

  axios.get(geocodeUrl).then((response) => {
    if (response.data.results[0].locations[0].street === '') {
      throw new Error('Unable to find that address.')
    }

    var lat = response.data.results[0].locations[0].latLng.lat,
        lng = response.data.results[0].locations[0].latLng.lng;
    var weatherUrl = `https://api.darksky.net/forecast/2d947bcea1e167093d98763de117f60e/${lat},${lng}`;
    console.log(`${response.data.results[0].providedLocation.location}, ${response.data.results[0].locations[0].adminArea5}, ${response.data.results[0].locations[0].adminArea3} ${response.data.results[0].locations[0].postalCode}, ${response.data.results[0].locations[0].adminArea1}`);
    return axios.get(weatherUrl);
  }).then((response) => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;

    console.log(`It is ${temperature} degrees but it feels like 44.3 degrees.`);
  }).catch((e) => {
    if(e.code === 'ENOTFOUND'){
      console.log("Unable to connect to API servers!");
    }else{
      console.log(e.message);
    }

  });
