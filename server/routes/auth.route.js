const express = require("express");
const {
  postAuth,
  getAuths,
  putAuth,
  deleteAuth,
} = require("../controllers/auth.controller");
const router = express.Router();

router.post("/", postAuth);
router.get("/", getAuths);
router.put("/:id", putAuth);
router.delete("/:id", deleteAuth);

module.exports = router;
