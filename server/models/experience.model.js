const mongoose = require("mongoose");

const experienceSchema = mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  project: {
    type: String
  },
  duration: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Experience = new mongoose.model("experience", experienceSchema);

module.exports = Experience;
