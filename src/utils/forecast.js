const request = require('request');

const forecast = (latitue, longitute, callback) => {
    const url = "w..." + latitue + " ? " + longitute + "..com";

    request({ url, json: true }, (error, { body }) => {

        if (error) {
            callback("Unable to connect to the server.")
        } else if (body.error) {
            callback("Unable to find the location.")
        } else {
            callback(undefined, {
                temperature: body.currently.temperature,
                precipProbability: body.currently.precipProbability,
                summary: body.daily.data[0].summary
            })
        }
    })
}



module.exports = forecast;