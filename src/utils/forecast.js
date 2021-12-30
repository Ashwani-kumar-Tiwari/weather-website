const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=3228032132dd4afca8ba367e5111bc7b&query=" +
    latitude +
    "," +
    longitude +
    "&units=f";

  // request({ url: url, json: true }, (error, response) => {
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect weather services", undefined);
      // } else if (response.body.error) {
    } else if (body.error) {
      callback("Location is not found", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ". It is currently " +
          body.current.temperature +
          " degress out. It feelslike " +
          body.current.feelslike +
          " degrees out. The humidity is " +
          body.current.humidity +
          "%."
      );
    }
  });
};

module.exports = forecast;
