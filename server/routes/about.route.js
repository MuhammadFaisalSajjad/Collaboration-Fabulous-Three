const express = require("express");
const {
  postAbout,
  getAbout,
  putAbout,
  deleteAbout,
} = require("../controllers/about.controller");
const router = express.Router();

router.post("/", postAbout);
router.get("/", getAbout);
router.put("/:id", putAbout);
router.delete("/:id", deleteAbout);

module.exports = router;
