const mongoose = require('mongoose');
const { Schema } = mongoose;

const CountrySchema = new Schema({
    country: {
        type: String,
        required: true
    },
    geolocation: {
        type: Array,
        required: true
    },
    picture_url: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('countries', CountrySchema);
