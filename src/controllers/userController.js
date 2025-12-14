const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const register = async (req, res) => {
  try {
    const { name, username, email, password, role } = req.body;
    console.log(req.body);
    console.log(name, username, email, password, role);
    if (!name || !username || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "username or email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name,
     username,
      email,
      password: hashedPassword,
      role,
    };

    const user = new User(newUser);
    await user.save();

    res
      .status(201)
      .json({ message: "User created successfully", data: newUser });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(404).json({ message: "username not registered" });
    }

    const isMatchedPassword = await bcrypt.compare(password, user.password);

    if (!isMatchedPassword) {
      return res.status(404).json({ message: "Password is incorrect" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
       username: user.username,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_secrets,
      { expiresIn: "1d" }
    );

    res.status(200).json({ message: "Login successful", data: { token } });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const profile = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({ message: "User logged in successfully", data: user });
  } catch (error) {
    res.status(500).json(error.message);
  }
}

module.exports = { getAllUsers, register, login, profile };
