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
    }
});

module.exports = mongoose.model('users', UserSchema);
