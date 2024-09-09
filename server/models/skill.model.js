const mongoose = require("mongoose");

const skillSchema = mongoose.Schema({
  skill: {
    type: String,
  },
  
});

const Skill = new mongoose.model("skill", skillSchema);

module.exports = Skill;
