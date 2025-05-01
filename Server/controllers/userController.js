const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");

const register = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);
  try {
    if (!username || !email || !password) {
      return res.status(403).json({
        success: false,
        message: "All field is required",
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(403).json({
        success: false,
        message: "User already registerd",
      });
    }

    const hasedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hasedPassword,
    });
    return res.status(201).json({
      success: true,
      message: "User Created Successfully",
    });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "All field is required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(409).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(409).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    const token = await jsonwebtoken.sign(
      { _id: user._id, email: user.email, role: user.role },
      process.env.SECRET_KEY_TOKEN,
      { expiresIn: "1d" }
    );
    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        path: "/",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        message: "login successfully",
        token,
        user: {
          _id: user._id,
          email: user.email,
          role: user.role,
          username: user.username,
          profileImage: user.profileImage,
          bio: user.bio,
          profession: user.profession,
        },
      });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).send({
    message: "Logged out successfully",
  });
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).send({ message: "User Not Found" });
    }
    res.status(200).send({ message: "User Delete Successfully" });
  } catch (error) {
    console.log("Error deleting user", error);
    res.status(500).send({ message: "Error deleting user" });
  }
};

const allUsers = async (req, res) => {
  try {
    const users = await User.find({}, "id email role").sort({ createdAt: -1 });
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ message: "Error Users fetching", error });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const user = await User.findByIdAndUpdate(id, { role }, { new: true });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send({ message: "User role updated successfully", user });
  } catch (error) {
    res.status(500).send({ message: "Error Users updating", error });
  }
};

const editProfile = async (req, res) => {
  try {
    const { userId, username, profileImage, bio, profession } = req.body;
    if (!userId) {
      return res.status(400).send({ message: "User Id is required" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).send({ message: "User Not found" });
    }

    if (username !== undefined) user.username = username;
    if (profileImage !== undefined) user.profileImage = profileImage;
    if (bio !== undefined) user.bio = bio;
    if (profession !== undefined) user.profession = profession;

    await user.save();
    res.status(200).send({
      message:"Profile updated successfully",user:{
        _id: user._id,
        email: user.email,
        username: user.username,
        profileImage: user.profileImage,
        bio: user.bio,
        profession: user.profession,
      }
    })
  } catch (error) {
    res.status(500).send({ message: "Error updating user profile" });
  }
};

module.exports = { register, login, logout, deleteUser, allUsers, updateUser,editProfile };
