const mongoose = require('mongoose');
const { Schema } = mongoose;

const PhotoSchema = new Schema({
    belongs_to_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    belongs_to_city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cities',
        required: true
    },
    belongs_to_landmark: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'landmarks',
        required: true
    },
    firebase_url: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('photos', PhotoSchema);
