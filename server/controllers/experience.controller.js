const Experience = require("../models/experience.model");

//Create
const postExperience = async (req, res) => {
  try {
    const experience = await Experience.create(req.body);
    res.status(200).json({
      message: "Experience Added Successfully",
      data: experience,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error Occured couldn't add experience",
      error: error.message,
      data: [],
    });
  }
};

//Read
const getExperience = async (req, res) => {
  try {
    const experience = await Experience.find({});
    res.status(200).json({
      message: "Experience Retrieved Successfully",
      data: experience,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error Occured couldn't retrieve experience",
      error: error.message,
      data: [],
    });
  }
};

//Update
const putExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const experience = await Experience.findByIdAndUpdate(id, req.body);
    if (!experience) {
      return res.status(404).json({
        message: "Experience Not Found",
        data: [],
      });
    }
    const updatedData = await Experience.find({});
    res.status(200).json({
      message: "Experience Updated Successfully",
      data: updatedData,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error Occured couldn't update experience",
      error: error.message,
      data: [],
    });
  }
};

//Delete
const deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const experience = await Experience.findByIdAndDelete(id);
    if (!experience) {
      return res.status(404).json({
        message: "Experience Not Found",
        data: [],
      });
    }
    const updatedData = await Experience.find({});
    res.status(200).json({
      message: "Experience Deleted Successfully",
      data: updatedData,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error Occured couldn't delete experience",
      error: error.message,
      data: [],
    });
  }
};

module.exports = {
  postExperience,
  getExperience,
  putExperience,
  deleteExperience,
};
