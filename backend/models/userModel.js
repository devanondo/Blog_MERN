//External Imports
const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//Create a database structure
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter your Name"],
    maxLength: [30, "Name cannot exceed 30 Characters"],
    minLength: [4, "Name Should more then 4 characters"],
  },
  address: {
    type: String,
  },
  dateOfBirth: {
    type: String,
  },
  phone: {
    type: String,
    unique: true,
  },

  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please enter valid email!"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password should be grater then 8 characters!"],
    select: false,
  },
  profilePicture: {
    type: String,
    default: "avatar.png",
  },
  coverPicture: {
    type: String,
    default: "cover.png",
  },
  followers: {
    type: Array,
    default: [],
  },
  savedBlogs: {
    type: Array,
    default: [],
  },
  followings: {
    type: Array,
    default: [],
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  restPasswordExpire: Date,
});

//Hashing password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//JWT TOKEN
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

module.exports = mongoose.model("User", userSchema);
