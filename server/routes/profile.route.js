const express = require("express");
const upload = require("../middlewares/multer.middleware");
const {
  postProfile,
  getProfile,
  putProfile,
  deleteProfile,
} = require("../controllers/profile.controller");
const router = express.Router();

router.get("/", upload.single("image"), getProfile);
router.post("/", postProfile);
router.put("/:id", upload.single("image"), putProfile);
router.delete("/:id", deleteProfile);

module.exports = router;
