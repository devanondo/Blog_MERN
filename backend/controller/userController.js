//External Imports
const bcrypt = require("bcrypt");
var validator = require("validator");

//Internal Imports
const asyncError = require("../middleware/asyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const ErrorHandler = require("../utils/errorHandler");

//Register a user
exports.registerUser = asyncError(async (req, res, next) => {
  const { email, name, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    profilePicture: req.file.filename,
  });

  sendToken(user, 201, res);
});

//Login a user
exports.loginUser = asyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(new ErrorHandler("Please Enter Email & Password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }
  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password"));
  }
  sendToken(user, 200, res);
});

//Logout a user
exports.logoutUser = asyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged Out Successfully",
  });
});

//Get Logged in user
exports.getLoggedInUser = asyncError(async (req, res, next) => {
  let user = await User.findById(req.user.id);

  if (!user) {
    new ErrorHandler("User not found!", 500);
  } else {
    let follower = await Promise.all(
      user.followers.map((uId) => {
        return User.findById(uId);
      })
    );
    let following = await Promise.all(
      user.followings.map((uId) => {
        return User.findById(uId);
      })
    );

    user.followings = following;
    user.followers = follower;
  }
  res.status(200).json({
    success: true,
    user,
  });
});

//Get user details
exports.getUserDetails = asyncError(async (req, res, next) => {
  let user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  } else {
    let follower = await Promise.all(
      user.followers.map((uId) => {
        return User.findById(uId);
      })
    );
    let following = await Promise.all(
      user.followings.map((uId) => {
        return User.findById(uId);
      })
    );

    user.followings = following;
    user.followers = follower;
    res.status(200).json({
      success: true,
      user,
    });
  }
});

//Update Password
exports.updatePassword = asyncError(async (req, res, next) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  const user = await User.findById(req.user.id).select("password");

  const isPasswordMatched = await bcrypt.compare(oldPassword, user.password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }

  if (newPassword !== confirmPassword) {
    return next(new ErrorHandler("Password does not matched!", 400));
  }

  user.password = newPassword;

  await user.save();
  sendToken(user, 201, res);
});

//Get all users admin
exports.getAllUsers = asyncError(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});

//Get single users admin
exports.getSingleUser = asyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler(`User not found! Id ${req.params.id} `, 404));
  }
  res.status(200).json({
    success: true,
    user,
  });
});

//Update User role admin
exports.updateUserRole = asyncError(async (req, res, next) => {
  const userNewData = {
    role: req.body.role,
  };
  const user = await User.findByIdAndUpdate(req.params.id, userNewData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  if (!user) {
    return next(new ErrorHandler(`User not found! Id ${req.params.id} `, 404));
  }
  res.status(200).json({
    success: true,
  });
});

//Update User
exports.updateUser = asyncError(async (req, res, next) => {
  if (!validator.isMobilePhone(req.body.phone, ["bn-BD"])) {
    return next(new ErrorHandler(`Invalid Phone`, 404));
  }

  const user = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  if (!user) {
    return next(new ErrorHandler(`User not found! Id ${req.user.id} `, 404));
  }
  res.status(200).json({
    success: true,
  });
});

//Delete a user admin
exports.deleteUser = asyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler(`User not found! Id ${req.params.id} `, 404));
  }
  //We will remove image later

  await user.remove();
  res.status(200).json({
    success: true,
    message: "User removed successfully",
  });
});

//Saved Blogs
exports.saveBlogs = asyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    new ErrorHandler("User not found!", 500);
  }

  if (!user.savedBlogs.includes(req.params.id)) {
    await user.updateOne({
      $push: { savedBlogs: req.params.id },
    });
    res.status(200).json({
      success: true,
      isSaved: true,
    });
  } else {
    await user.updateOne({
      $pull: { savedBlogs: req.params.id },
    });
    res.status(200).json({
      success: true,
      isSaved: false,
    });
  }
});

//Follow a user
exports.followUser = asyncError(async (req, res, next) => {
  if (req.params.id === req.user.id) {
    return next(new ErrorHandler("Cannot follow itself!", 404));
  }
  const user = await User.findById(req.params.id);
  const currentUser = await User.findById(req.user.id);

  if (!user) {
    return next(new ErrorHandler("User not found!", 404));
  }
  if (!user.followers.includes(req.user.id)) {
    await user.updateOne({
      $push: { followers: req.user.id },
    });
    await currentUser.updateOne({
      $push: { followings: req.params.id },
    });

    res.status(200).json({
      success: true,
      message: "User Followed successfully",
    });
  } else {
    res.status(200).json({
      success: true,
      message: "User already UnFollowed",
    });
  }
});

//UnFollow a user
exports.unFollowUser = asyncError(async (req, res, next) => {
  if (req.params.id === req.user.id) {
    return next(new ErrorHandler("Cannot unfollow itself!", 404));
  }

  const user = await User.findById(req.params.id);
  const currentUser = await User.findById(req.user.id);
  if (!user) {
    return next(new ErrorHandler("User not found!", 404));
  }
  if (user.followers.includes(req.user.id)) {
    await user.updateOne({
      $pull: { followers: req.user.id },
    });
    await currentUser.updateOne({
      $pull: { followings: req.params.id },
    });

    res.status(200).json({
      success: true,
      message: "User UnFollowed successfully",
    });
  } else {
    next(new ErrorHandler("User not found!", 404));
  }
});
