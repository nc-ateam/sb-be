const mongoose = require("mongoose");
const { Schema } = mongoose;

const PhotoSchema = new Schema({
  belongs_to_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  belongs_to_city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "city",
    required: true
  },
  belongs_to_landmark: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "landmark",
    required: true
  },
  firebase_url: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("photo", PhotoSchema);
