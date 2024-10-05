const express = require("express");
const upload = require("../middlewares/multer.middleware");
const {
  postProject,
  getProjects,
  putProject,
  deleteProject,
} = require("../controllers/project.controller");
const router = express.Router();

router.post("/", upload.single("image"), postProject);
router.get("/", getProjects);
router.put("/:id", upload.single("image"), putProject);
router.delete("/:id", deleteProject);

module.exports = router;
