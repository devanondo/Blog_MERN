//External Imports

//Internal Imports
const asyncError = require("../middleware/asyncError");
const Blog = require("../models/blogModel");
const User = require("../models/userModel");
const Category = require("../models/categoryModel");
const ErrorHandler = require("../utils/errorHandler");
const ApiFeatures = require("../utils/ApiFeatures");
var fs = require("fs");

//create Blog
exports.createBlog = asyncError(async (req, res, next) => {
  const { title, category, description } = req.body;

  let categoryData = await Category.findOne({ category: category });
  if (!categoryData) {
    return next(new ErrorHandler("Category not found!", 404));
  }

  let newBlog = await Blog.create({
    user: req.user._id,
    title,
    category,
    description,
    coverImage: req.file.filename,
  });

  categoryData.blogs.push(newBlog._id);

  await categoryData.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "Blog created successfully",
    newBlog,
    categoryData,
  });
});

//Get all product and search
exports.getAllBlogs = asyncError(async (req, res, next) => {
  const resultPerPage = 9;

  const apiFeatures = new ApiFeatures(
    Blog.find({ status: "approved" }).populate("user"),
    req.query
  )
    .search()
    .categorySearch()
    .pagination(resultPerPage);

  const blogs = await apiFeatures.query;
  res.status(200).json({
    success: true,
    blogs,
  });
});

//Get all Blogs --Admin
exports.getAllBlogsAdmin = asyncError(async (req, res, next) => {
  const blogs = await Blog.find();
  if (!blogs) {
    return next(new ErrorHandler("Blog not found!", 404));
  }
  res.status(200).json({
    success: true,
    blogs,
  });
});

//Get Single Blog
exports.getSingleBlog = asyncError(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id).populate("user");
  if (!blog) {
    return next(new ErrorHandler("Blog not found!", 404));
  }

  res.status(200).json({
    success: true,
    blog,
  });
});

//GET Saved Blogs
exports.getSaveBlogs = asyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    new ErrorHandler("User not found!", 500);
  }
  let blogs = await Promise.all(
    user.savedBlogs.map((id) => {
      return Blog.findById(id);
    })
  );

  res.status(200).json({
    success: true,
    blogs,
  });
});

//Get users all Blogs
exports.getUserBlogs = asyncError(async (req, res, next) => {
  const blogs = await Blog.find({ user: req.params.id });
  if (!blogs) {
    return next(new ErrorHandler("Blog not found!", 404));
  }
  res.status(200).json({
    success: true,
    blogs,
  });
});

//Update a Blog --user && Admin
exports.updateSingleBlog = asyncError(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    return next(new ErrorHandler("Blog not found!", 404));
  }

  if (req.file) {
    // removed image
    fs.unlinkSync(`${__dirname}/../public/uploads/${blog.coverImage?.trim()}`);
    blog.coverImage = req.file.filename;
  }

  //update image later
  blog.description = req.body.description;
  blog.status = "pending";
  await blog.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    isUpdate: true,
  });
});

//Update blog status --Admin
exports.updateStatus = asyncError(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    return next(new ErrorHandler("Blog not found!", 404));
  }

  if (blog.status === req.body.status) {
    return next(new ErrorHandler(`Blog already ${req.body.status}!`, 404));
  } else {
    blog.status = req.body.status;
    await blog.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
      blog,
    });
  }
});

//Delete a Blog --user
exports.deleteBlog = asyncError(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    return next(new ErrorHandler("Blog not found!", 404));
  }
  const category = await Category.findOne({ category: blog.category });

  if (!category) {
    return next(new ErrorHandler("Internal server Error", 404));
  }

  await category.updateOne({
    $pull: { blogs: blog._id },
  });

  // removed image
  fs.unlinkSync(`${__dirname}/../public/uploads/${blog.coverImage?.trim()}`);
  await blog.remove();

  res.status(200).json({
    isDeleted: true,
    message: "Blog deleted successfully!",
  });
});

//Create comment
exports.addComment = asyncError(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return next(new ErrorHandler("Blog not found!", 404));
  }
  if (!req.body.message) {
    return next(new ErrorHandler("Please write your message", 404));
  }
  let commentData = {
    user: req.user._id,
    profilePicture: req.user.profilePicture,
    name: req.user.name,
    message: req.body.message,
  };
  blog.comments.push(commentData);
  await blog.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

//Update a comment user
exports.updateComment = asyncError(async (req, res, next) => {
  const blog = await Blog.findById(req.params.cid);
  if (!blog) return next(new ErrorHandler("Blog not found!", 404));

  blog.comments.reduce((acc, cur) => {
    if (cur._id == req.params.mid) {
      cur.message = req.body.message;
    }
    acc.push(cur);
    return acc;
  }, []);

  await blog.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

//Delete a message user
exports.deleteMessage = asyncError(async (req, res, next) => {
  const blog = await Blog.findById(req.params.cid);
  if (!blog) return next(new ErrorHandler("Blog not found!", 404));

  let newComments = blog.comments.reduce((acc, cur) => {
    if (cur._id.toString() !== req.params.mid.toString()) {
      acc.push(cur);
    }
    return acc;
  }, []);

  await Blog.findByIdAndUpdate(
    req.params.cid,
    {
      comments: newComments,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    isDeleted: true,
  });
});
