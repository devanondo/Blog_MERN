//External Imports
const router = require("express").Router();

//Internal Imports
const {
  createBlog,
  addComment,
  updateComment,
  deleteMessage,
  getAllBlogs,
  updateSingleBlog,
  getSingleBlog,
  deleteBlog,
  updateStatus,
  getAllBlogsAdmin,
  getUserBlogs,
  getSaveBlogs,
  isSavedBlogs,
  getSortings,
  nodeMail,
} = require("../controller/blogController");
const {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategory,
  getSingleCategory,
} = require("../controller/categoryController");
const { saveBlogs } = require("../controller/userController");
const { isAuthenticatedUser, authorizedRole } = require("../middleware/auth");
const upload = require("../multer/upload");

//Create a Blog
router.post("/create", upload.single("file"), isAuthenticatedUser, createBlog);

//Get all Blogs --Admin
router.get(
  "/admin/all",
  isAuthenticatedUser,
  authorizedRole("admin"),
  getAllBlogsAdmin
);

//Get all blogs user
router.get("/all", getAllBlogs);

//Get user all blogs
router.get("/user/:id", getUserBlogs);

//Get all saveBlogs
router.get("/saveblog/all", isAuthenticatedUser, getSaveBlogs);

//Checking blog in saved blogs exist or not
router.get("/issaved/:id", isAuthenticatedUser, isSavedBlogs);

//Get a Single blog
router.get("/:id", getSingleBlog);

//Update Blog  --User and Admin
router.put(
  "/:id",
  upload.single("file"),
  isAuthenticatedUser,
  updateSingleBlog
);

//Update Status --Admin
router.put(
  "/admin/status/:id",
  isAuthenticatedUser,
  authorizedRole("admin"),
  updateStatus
);

//Delete Blog
router.delete("/delete/:id", isAuthenticatedUser, deleteBlog);

//create comments
router.post("/comment/:id", isAuthenticatedUser, addComment);

//Update comments
router.put("/comment/:cid/:mid", isAuthenticatedUser, updateComment);

//delete comments
router.delete("/comment/:cid/:mid", isAuthenticatedUser, deleteMessage);

//Category create
router.post(
  "/admin/category/create",
  upload.single("file"),
  isAuthenticatedUser,
  authorizedRole("admin"),
  createCategory
);

//Category get
router.get("/category/all", getAllCategory);

//Get single Category
router.get("/category/:category", getSingleCategory);

//Category update
router.put(
  "/admin/category/:id",
  isAuthenticatedUser,
  authorizedRole("admin"),
  updateCategory
);

//Category delete
router.delete(
  "/admin/category/:id",
  isAuthenticatedUser,
  authorizedRole("admin"),
  deleteCategory
);

router.get("/sendmail/node", nodeMail);

module.exports = router;
