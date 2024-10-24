const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../model/user/userModel");
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    JWT_SECRET, 
    { expiresIn: "1h" } 
  );
};



const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).send({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ error: "Invalid email or password" });
    }

    const token = generateToken(user);

    res.status(200).send({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send({ error: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1]; 
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (error) {
    res.status(400).send({ error: "Invalid token" });
  }
};

const protectedRoute = async (req, res) => {
  try {
    res.status(200).send({
      message: "You have accessed a protected route",
      user: req.user,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {loginUser, authMiddleware, protectedRoute };
