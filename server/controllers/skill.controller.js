const Skill = require("../models/skill.model");

//Create
const postSkill = async (req, res) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(200).json({
      message: "Skill added successfully",
      data: skill,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding skill",
      error: error.message,
      data: [],
    });
  }
};

//Read
const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find({});
    res.status(200).json({
      message: "Skills retrieved successfully",
      data: skills,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in Fetching Data",
      error: error.message,
      data: [],
    });
  }
};

//Update
const updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const skill = await Skill.findByIdAndUpdate(id, req.body);
    if (!skill) {
      res.status(200).json({
        message: "Skill not found",
        data: [],
      });
    }
    const updatedSkill = await Skill.find({});
    res.status(200).json({
      message: "Skill updated successfully",
      data: updatedSkill,
    });
  } catch (error) {}
};

//Delete
const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const skill = await Skill.findByIdAndDelete(id, req.body);
    if (!skill) {
      res.status(200).json({
        message: "Skill not found",
        data: [],
      });
    }
    const updatedSkill = await Skill.find({});
    res.status(200).json({
      message: "Skill deleted successfully",
      data: updatedSkill,
    });
  } catch (error) {}
};

module.exports = { postSkill, getSkills, updateSkill, deleteSkill };
