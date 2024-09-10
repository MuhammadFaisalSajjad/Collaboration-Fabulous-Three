const express = require("express");
const upload = require("../middlewares/multer.middleware");
const {
  postProfile,
  getProfile,
  putProfile,
  deleteProfile,
} = require("../controllers/profile.controller");
const router = express.Router();

router.post("/", upload.single("avatar"), postProfile);
router.get("/",  getProfile);
router.put("/:id", upload.single("avatar"), putProfile);
router.delete("/:id", deleteProfile);

module.exports = router;
