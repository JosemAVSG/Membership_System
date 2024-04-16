const jwt = require("jsonwebtoken");
const bcrypts = require("bcryptjs");
const gereateToken = require("../libs/jwt");
const userModel = require("../Models/userModel");
const TOKEN_SECRET = process.env.TOKEN_SECRET;

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Missing fields" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ error: "Password must be at least 6 characters" });
  }
  const passhash = bcrypts.hash(password);

  try {
    const user = await userModel.findOne({ email: email });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }
    const newUser = new userModel({
      name,
      email,
      password: passhash,
      fechaRegistro: Date.now(),
      estado: true,
    });

    const insertedUser = await newUser.save();
    const token = gereateToken({ id: insertedUser._id });
    res.cookie("token", token);
    res.status(201).json({
      _id: insertedUser._id,
      name: insertedUser.name,
      email: insertedUser.email,
      createAt: insertedUser.createAt,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await userModel.findOne({ email: email });
    if (!userFound) {
      return res.status(400).json({ error: "User not found" });
    }
    const passCompare = await bcrypts.compare(password, userFound.password);
    if (!passCompare) {
      return res.status(400).json({ error: "Invalid password" });
    }
    const token = gereateToken({ id: userFound._id });
    res.cookie("token", token);
    res.status(200).json({
      _id: userFound._id,
      name: userFound.name,
      email: userFound.email,
      createAt: userFound.createAt,
      estado: userFound.estado,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const logout = async (req, res) => {
  res.cookie = ("token", "", { expires: new Date(0) });
  res.sendStatus(200);
};
const verifyToken = async (req, res) => {
  if (!req.cookies.token) {
    return res.status(401).json({ error: "No token provided" });
  }
  const { token } = req.cookies;
  jwt.verify(token, TOKEN_SECRET, async (err, decoded) => {
    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ error: "Invalid token" });
    }

    if (!user.estado) {
      return res.status(401).json({ error: "User not active" });
    }
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      createAt: user.createAt,
      estado: user.estado,
    });
  });
};
const getUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login, logout, verifyToken, getUsers};
