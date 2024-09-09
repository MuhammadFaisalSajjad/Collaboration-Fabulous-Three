const express = require("express");
const {
  postExperience,
  getExperience,
  putExperience,
  deleteExperience,
} = require("../controllers/experience.controller");

const router = express.Router();

router.post("/", postExperience);
router.get("/", getExperience);
router.put("/:id", putExperience);
router.delete("/:id", deleteExperience);

module.exports = router;
