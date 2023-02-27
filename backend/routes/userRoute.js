//External Imports
const router = require("express").Router();

//Internal Imports
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserDetails,
  updatePassword,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
  unFollowUser,
  followUser,
  saveBlogs,
  getLoggedInUser,
  updateUser,
} = require("../controller/userController");
const upload = require("../multer/upload");
const { isAuthenticatedUser, authorizedRole } = require("../middleware/auth");

//Register a User
router.post("/register", upload.single("file"), registerUser);

//Login user
router.post("/login", loginUser);

//Logout a user
router.get("/logout", logoutUser);

//Get a user Details
router.get("/me", isAuthenticatedUser, getLoggedInUser);

//Get other user details
router.get("/userinfo/:id", getUserDetails);

//save Blog
router.put("/save/:id", isAuthenticatedUser, saveBlogs);

//Update password
router.put("/password/update", isAuthenticatedUser, updatePassword);

//Update user
router.put("/user/update", isAuthenticatedUser, updateUser);

//Get all users --Admin
router.get("/users/all", getAllUsers);

//Get a single User --Admin
router.get(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizedRole("admin"),
  getSingleUser
);

//Update User role admin
router.put(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizedRole("admin"),
  updateUserRole
);

//Delete a user admin
router.delete(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizedRole("admin"),
  deleteUser
);

//Follow a user
router.put("/user/:id/follow", isAuthenticatedUser, followUser);

//UnFollow a user
router.put("/user/:id/unfollow", isAuthenticatedUser, unFollowUser);

module.exports = router;
