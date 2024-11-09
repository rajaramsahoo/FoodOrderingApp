const User = require("../models/User");
const bcrypt = require("bcrypt");
const generateToken  = require("../utils/generateToken.js")
// get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(409).json({ message: `${email} Was Not Found ` });
    }
    let matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.status(401).json({ error: "Invalid password" });
    }
    const token = generateToken({ user });
    res.status(200).json({user,token});
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });  }
};
// post a new user
const createUser = async (req, res) => {
  try {
    let { name, password, email } = req.body;
    const existingUser = await User.findOne({ email: email });
    // console.log(existingUser)
    if (existingUser) {
      return res.status(302).json({ message: "User already exists" });
    }
    password = await bcrypt.hash(password, 15);
    userInfo = { name, password, email };
    const result = await User.create(userInfo);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete user
const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    // console.log(deletedUser);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get admin
const getAdmin = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await User.findOne({ email });
    console.log(user);
    // if (email !== req.decoded.email) {
    //   return res.status(403).send({ message: "forbidden access" });
    // }
    if (!user) {
      return res.status(403).send({ message: "forbidden access" });
    }

    let admin = false;

    if (user) {
      admin = user?.role === "admin";
    }

    res.status(200).json({ admin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//make admin of a user

const makeAdmin = async (req, res) => {
  const userId = req.params.id;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role: "admin" },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: `${updatedUser.email} is now an admin`,
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error. Could not update user role.",
      error: error.message,
    });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  deleteUser,
  getAdmin,
  makeAdmin,
  loginUser,
};
