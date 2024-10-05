const mongoose = require("mongoose");

const authSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Auth = new mongoose.model("auth", authSchema);

module.exports = Auth;
