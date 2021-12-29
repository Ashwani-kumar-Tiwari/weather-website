const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiYnRpeGJvaiIsImEiOiJja3VobTBnNWoyZmRmMm5tb2lvMXprcW8zIn0.tixOZVOg5pKijxq-4EVAAg&limit=1";

  // request({ url: url, json: true }, (error, response) => {
  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect location services", undefined);
      // } else if (response.body.features.length === 0) {
    } else if (body.features.length === 0) {
      callback("Unable to find the location. Try another search", undefined);
    } else {
      callback(undefined, {
        // longitude: response.body.features[0].center[0],
        // latitude: response.body.features[0].center[1],
        // location: response.body.features[0].place_name,
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
