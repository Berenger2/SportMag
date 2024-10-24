const bcrypt = require("bcryptjs");
const mongoose = require('mongoose');
const User = require("../../model/user/userModel");

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ error: "Invalid user ID" });
        }

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }

        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!password) {
      return res.status(400).send({ error: "Password is required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ error: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      ...req.body,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).send(user.name + " registered successfully");
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = { ...req.body, updatedAt: Date.now() };

        if (updates.email) {
            const emailExists = await User.findOne({ email: updates.email });
            if (emailExists && emailExists._id.toString() !== id) {
                return res.status(400).send({ error: "Email already in use" });
            }
        }

        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }

        const user = await User.findByIdAndUpdate(id, updates, { new: true });

        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }

        res.status(200).send(user);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ error: "Invalid user ID" });
        }

        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }

        res.status(200).send({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

module.exports = { registerUser, getAllUsers, updateUser, deleteUser, getUserById };
