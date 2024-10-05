const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

// Example model for adding data
const User = mongoose.model('User', new mongoose.Schema({ name: String }));

// Define the `/add-data` route
router.get("./test_addData.route", async (req, res) => {
  const { name } = req.query;
  
  if (!name) {
    return res.status(400).send("Name is required");
  }
  
  try {
    const user = new User({ name });
    await user.save();
    res.status(200).send(`User ${name} added successfully`);
  } catch (error) {
    res.status(500).send("Error adding user to the database");
  }
});

module.exports = router;
