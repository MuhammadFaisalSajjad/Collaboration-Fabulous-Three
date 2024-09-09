const express = require("express");
const {
  postSkill,
  getSkills,
  updateSkill,
  deleteSkill,
} = require("../controllers/skill.controller");
const router = express.Router();

router.post("/", postSkill);
router.get("/", getSkills);
router.put("/:id", updateSkill);
router.delete("/:id", deleteSkill);

module.exports = router;
