import { configureStore } from "@reduxjs/toolkit";
import {
  blogReducer,
  categoryReducer,
  createCommentReducer,
  deleteReducer,
  getUserBlogs,
  statusReducer,
} from "./reducers/blogReducer";
import {
  allUserReducer,
  followReducer,
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
  },
});

export default store;
