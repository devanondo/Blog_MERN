//External Imports
const multer = require("multer");
const path = require("path");

//Internal Imports

const UPLOAD_FOLDER = `${__dirname}/../public/uploads/`;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_FOLDER);
  },

  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const filename =
      file.originalname.replace(fileExt, "").toLowerCase().split(" ").join("") +
      Date.now();
    cb(null, filename + fileExt);
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only jpeg, jeg and png formate are allowed"));
    }
  },
});

module.exports = upload;
