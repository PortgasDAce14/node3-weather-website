const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiYXB1cnZtIiwiYSI6ImNrZWF5eWpidzAzNWYzMW10NThsZ3oyNmEifQ.2gKmd8s-s40VpFiJykQcig&limit=1";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location", undefined);
    } else {
      const data = {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      };

      callback(undefined, data);
    }
  });
};

module.exports = geocode;
