//Requiring external library
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const helmet = require("helmet");

//Internal Imports
const connectDatabase = require("./database/database");
const errorMiddleware = require("./middleware/errorMiddleware");

//Routing Imports
const userRouter = require("./routes/userRoute");
const blogRouter = require("./routes/blogRoute");

app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

//configuration
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(helmet());

//Dotenv config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

//Routes
app.use("/api/blog", userRouter);
app.use("/api/blog", blogRouter);

//Connect Database
connectDatabase();

// Error Handling Middleware
app.use(errorMiddleware);

//Connect server
const server = app.listen(process.env.PORT, () => {
  console.log(`Server Running on port ${process.env.PORT}`);
});
