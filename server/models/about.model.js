const mongoose = require("mongoose");

const aboutSchema = mongoose.Schema({
  aboutMe: {
    type: String,
    required: true,
  },
});

const About = new mongoose.model("about", aboutSchema);

module.exports = About;
