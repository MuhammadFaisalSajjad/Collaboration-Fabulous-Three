const Profile = require("../models/profile.model");

//Create
const postProfile = async (req, res) => {
  try {
    const { user } = req.body;
    const avatar = {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    };
    const profile = await Profile.create({ user, avatar });
    res.status(200).json({
      message: "Profile created Successfully",
      data: profile,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating profile",
      error: error.message,
      data: [],
    });
  }
};

//Read
const getProfile = async (req, res) => {
  try {
    const profile = await Profile.find({});
    const formattedData = profile.map((profile) => {
      const imageBase64 = profile.avatar.data.toString("base64");
      return {
        ...profile._doc,
        avatar: `data:${profile.avatar.contentType};base64,${imageBase64}`,
      };
    });
    res.status(200).json({
      message: "Profile fetched Successfully",
      data: formattedData,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching profile",
      error: error.message,
      data: [],
    });
  }
};

//Update
const putProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req.body;
    const updatedData = { user };
    if (req.file) {
      updatedData.avatar = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }
    const profile = await Profile.findByIdAndUpdate(id, updatedData);
    if (!profile) {
      return res.status(404).json({
        message: "Profile not found",
        data: [],
      });
    }
    const updatedProfileList = await Profile.find({});
    res.status(200).json({
      message: "Profile updated Successfully",
      data: updatedProfileList,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating profile",
      error: error.message,
      data: [],
    });
  }
};

//Delete
const deleteProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await Profile.findByIdAndDelete(id);
    if (!profile) {
      res.status(404).json({
        message: "Profile not found",
        data: [],
      });
    }
    const updatedProfileList = await Profile.find({});
    res.status(200).json({
      message: "Profile deleted Successfully",
      data: updatedProfileList,
    });
  } catch (error) {}
};

module.exports = { postProfile, getProfile, putProfile, deleteProfile };
