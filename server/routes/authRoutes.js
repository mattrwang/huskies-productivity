const express = require("express");
const router = express.Router();
const cors = require("cors");
const {
  signupUser,
  loginUser,
  logoutUser,
  authCheck,
  createTeam,
} = require("../controllers/authController");

router.use(cors({ credentials: true, origin: "http://localhost:3000" }));

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/create", createTeam);
router.get("/auth/check", authCheck);

module.exports = router;
