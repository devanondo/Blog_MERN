import { configureStore } from "@reduxjs/toolkit";
import {
  blogReducer,
  categoryReducer,
  checkSavedBlog,
  createCommentReducer,
  deleteReducer,
  getUserBlogs,
  statusReducer,
} from "./reducers/blogReducer";
import {
  allUserReducer,
  followReducer,
  update,
  userDetails,
  userReducer,
} from "./reducers/userReducer";

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    user: userReducer,
    users: allUserReducer,
    userBlogs: getUserBlogs,
    userDetails: userDetails,
    newComment: createCommentReducer,
    delete: deleteReducer,
    follow: followReducer,
    category: categoryReducer,
    status: statusReducer,
    isBlogSave: checkSavedBlog,
    update: update,
  },
});

export default store;
