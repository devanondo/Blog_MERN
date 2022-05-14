//Internal Imports
const asyncError = require("../middleware/asyncError");
const Category = require("../models/categoryModel");
const Blog = require("../models/blogModel");
const ErrorHandler = require("../utils/errorHandler");
var fs = require("fs");

//Create Category --Admin
exports.createCategory = asyncError(async (req, res, next) => {
  const category = await Category.findOne({ category: req.body.category });
  if (category) {
    // removed image
    fs.unlinkSync(
      `${__dirname}/../public/uploads/${category.coverImage?.trim()}`
    );
    return next(new ErrorHandler("Category already exists", 409));
  }
  await Category.create({
    user: req.user._id,
    category: req.body.category.toLowerCase().trim(),
    coverImage: req.file?.filename,
    description: req.body.description,
  });

  res.status(200).json({
    success: true,
    message: "Category Added successfully",
  });
});

//Update Category --Admin
exports.updateCategory = asyncError(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (!category) return next(new ErrorHandler("Category not found!", 404));

  //We will add image later

  category.category = req.body.category;
  await category.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "Category Updated successfully",
  });
});

//Get all category
exports.getAllCategory = asyncError(async (req, res, next) => {
  const category = await Category.find();

  res.status(200).json({
    success: true,
    category,
  });
});
//Get all category
exports.getSingleCategory = asyncError(async (req, res, next) => {
  const category = await Category.findOne({ category: req.params.category });

  if (!category) return next(new ErrorHandler("Category not found!", 404));

  let blog = await Promise.all(
    category.blogs.map((id) => {
      return Blog.findById(id);
    })
  );
  category.blogs = blog;

  res.status(200).json({
    success: true,
    category,
  });
});

//Update Category --Admin
exports.updateCategory = asyncError(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (!category) return next(new ErrorHandler("Category not found!", 404));

  //We will add image later

  category.category = req.body.category;
  await category.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "Category Updated successfully",
  });
});

//Delete Category --Admin
exports.deleteCategory = asyncError(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (!category) return next(new ErrorHandler("Category not found!", 404));

  // removed image
  fs.unlinkSync(
    `${__dirname}/../public/uploads/${category.coverImage?.trim()}`
  );

  await category.remove();
  res.status(200).json({
    success: true,
    message: "Category removed successfully",
  });
});
