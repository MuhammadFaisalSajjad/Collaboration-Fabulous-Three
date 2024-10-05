const express = require("express");
const authRoutes = require("./auth.route");
const skillRoutes = require("./skill.route");
const projectRoutes = require("./project.route");
const profileRoutes = require("./profile.route");
const aboutRoutes = require("./about.route");
const experienceRoutes = require("./experience.route");
const serviceRouter = require("./service.route");

// Define the router first
const router = express.Router(); // Initialize router here

// Postman testing route
const addDataRoutes = require("./test_addData.route");
router.use("/add-data", addDataRoutes);


// const router = express.Router();

router.use("/auth", authRoutes);
router.use("/skills", skillRoutes);
router.use("/projects", projectRoutes);
router.use("/profile", profileRoutes);
router.use("/about", aboutRoutes);
router.use("/experience", experienceRoutes);
router.use("/services", serviceRouter);

module.exports = router;
