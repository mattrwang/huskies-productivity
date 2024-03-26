const express = require("express");
const router = express.Router();
const cors = require("cors");
const { signupUser, loginUser } = require("../controllers/authController");

router.use(cors({ credentials: true, origin: "http://localhost:3000" }));

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/auth/check", (req, res) => {
  if (req.session.userId) {
    res.json({ isLoggedIn: true });
  } else {
    res.json({ isLoggedIn: false });
  }
});
router.post("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy();
  }
  res.json({ message: "Logged out successfully" });
});

module.exports = router;
