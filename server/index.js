const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cors = require("cors");
const app = express();
const PORT = 8000;
require("dotenv").config();

app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    name: "sid",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(express.urlencoded({ extended: false }));

app.use("/", require("./routes/authRoutes"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
