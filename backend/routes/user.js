const express = require("express");
const {
  sendOtp,
  verifyOtp,
  createPartialUser,
  authenticateUser,
  createCompleteUser,
} = require("../controllers/user");

const router = express.Router();
// verification and authentication
router.post("/sendotp", sendOtp);
router.post("/verifyotp", verifyOtp);
router.post("/authenticate", authenticateUser);

// crud of user
router.post("/", createPartialUser);
router.post("/complete", createCompleteUser);

module.exports = router;
