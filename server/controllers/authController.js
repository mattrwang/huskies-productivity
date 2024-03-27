const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const { hashPassword, checkPassword } = require("../helpers/auth");
const { generateCode } = require("../helpers/code");

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
    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

const logoutUser = (req, res) => {
  if (req.session) {
    req.session.destroy();
  }
  res.json({ message: "Logged out successfully" });
};

const createTeam = async (req, res) => {
  try {
    const { teamName } = req.body;
    const gen = generateCode();
    const team = await prisma.team.create({
      data: {
        code: gen,
        name: teamName,
      },
    });
    res.json({ message: "Team created successfully", team });
  } catch (error) {
    console.error(error);
  }
};

const getUser = async (req, res) => {
  if (req.session && req.session.userId) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: req.session.userId,
        },
      });
      if (user) {
        return res.json(user);
      }
      return res.status(404).send("User not found");
    } catch (error) {
      console.error("Database or server error:", error);
      return res.status(500).send("Internal server error");
    }
  }
  return res.status(401).send("Not authenticated");
};

module.exports = { signupUser, loginUser, logoutUser, createTeam, getUser };
