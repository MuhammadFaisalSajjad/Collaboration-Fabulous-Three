const mongoose = require("mongoose");

const profileSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: [String],
    required: true,
  },
  avatar: {
    data: Buffer,
    contentType: String,
  },
});

const Profile = new mongoose.model("profile", profileSchema);

module.exports = Profile;
