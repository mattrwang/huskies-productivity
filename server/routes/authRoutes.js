const express = require("express");
const router = express.Router();
const cors = require("cors");
const { signupUser, loginUser } = require("../controllers/authController");

router.use(cors({ credentials: true, origin: "http://localhost:3000" }));

router.get("/test", test);
router.post("/signup", signupUser);
router.post("/login", loginUser);

module.exports = router;
