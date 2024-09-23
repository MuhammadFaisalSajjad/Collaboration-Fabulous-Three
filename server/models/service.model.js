const mongoose = require("mongoose");

const serviceSchema = mongoose.Schema({
  icon: {
    type: Buffer,
    contentType: String,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Service = new mongoose.model("service", serviceSchema);

module.exports = Service;
