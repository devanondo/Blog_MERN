const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, "Please Enter Category Title"],
      unique: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    coverImage: {
      type: String,
    },
    blogs: {
      type: Array,
      default: [],
    },
    description: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("Category", categorySchema);
