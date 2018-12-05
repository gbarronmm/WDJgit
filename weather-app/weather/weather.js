const request = require('request');

module.exports.getWeather = (lat, long, callback) => {

  request({
    url: `https://api.darksky.net/forecast/2d947bcea1e167093d98763de117f60e/${lat},${long}`,
    json: true
  }, (err, res, body) => {
    if(!err && res.statusCode === 200){
      callback(undefined, `It is ${body.currently.temperature} degrees but it feels like ${body.currently.apparentTemperature}`);
    }else {
      callback('Unable to fetch weather.');
    }
  });
}
