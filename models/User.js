const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    picture_url: {
        type: String
    },
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    visitedLandmarks: {
        type: Array,
        items: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'landmarks'},
        required: true
    }
});

module.exports = mongoose.model('users', UserSchema);
