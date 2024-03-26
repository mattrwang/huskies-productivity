const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const { hashPassword, checkPassword } = require("../helpers/auth");

const prisma = new PrismaClient();

const signupUser = async (req, res) => {
  try {
    const { name, username, password, code } = req.body;
    const exist = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (exist) {
      return res.json({ error: "Username already taken." });
    }
    const team = await prisma.team.findUnique({
      where: {
        code,
      },
    });
    if (!team) {
      return res.json({ error: "Team not found." });
    }
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        username,
        name,
        password: hashedPassword,
        teamId: team.id,
      },
    });
    return res.json({ message: "User created successfully", user });
  } catch (error) {
    console.error(error);
    return res.json({
      error: "An error occurred during the registration process.",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!password) {
      return res.json({ error: "Password is required." });
    }
    if (!username) {
      return res.json({ error: "Username is required." });
    }
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (!user) {
      return res.json({ error: "User not found." });
    }
    const match = await checkPassword(password, user.password);
    if (!match) {
      return res.json({ error: "Incorrect password." });
    }
    req.session.userId = user.id;
    return res.json({ message: "Logged in successfully" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { signupUser, loginUser };
