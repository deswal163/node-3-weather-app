const request = require('request');

const geocode = (address, callback) => {
    
    const url = "www.." + encodeURIComponent(address) + " ..com";

    request({ url: url, json: true }, (error, { feature, body } = {}) => {
        if (error) {
            callback("Unable to connect to the server.", undefined);
        } else if (feature.length === 0) {
            callback("Invaid Location!", undefined)
        } else {
            callback(undefined, {
                longitude: body.longitude,
                latitude: body.latitude,
                location: body.location
            })
        }
    })
};


module.exports = geocode;