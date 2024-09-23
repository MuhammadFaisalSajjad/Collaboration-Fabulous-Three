const express = require("express");
const router = express.Router();
const {
  postService,
  getService,
  putService,
  deleteService,
} = require("../controllers/service.controller");

router.post("/", upload.single("icon"), postService);
router.get("/", getService);
router.put("/:id", upload.single("icon"), putService);
router.delete("/:id", deleteService);

module.exports = router;
