const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer.middleware");
const {
  postService,
  getService,
  putService,
  deleteService,
} = require("../controllers/service.controller");

router.post("/", postService);
router.get("/", getService);
router.put("/:id", putService);
router.delete("/:id", deleteService);

module.exports = router;
