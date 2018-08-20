const mongoose = require('mongoose');
const { Schema } = mongoose;

const LandmarkSchema = new Schema({
    landmark: {
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
    },
    belongs_to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cities',
        required: true
    },
    info: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('landmarks', LandmarkSchema);
