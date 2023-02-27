import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { saveBlog } from "../../../actions/blogAction";
import { loadUser } from "../../../actions/userAction";

export default function Card({ blog }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const dispatch = useDispatch();
  const { isSaved, error } = useSelector((state) => state.isBlogSave);
  const { user } = useSelector((state) => state.user);

  const isSavedBlog = user?.savedBlogs.includes(blog?._id);

  useEffect(() => {
    if (isSaved) {
      dispatch(loadUser());
    }
  }, [dispatch, error, isSaved]);

  const handleBookmark = (e) => {
    e.preventDefault();

    dispatch(saveBlog(blog?._id));
  };

  return (
    <div className="w-full rounded overflow-hidden mb-4">
      <div className=" max-h-52 overflow-hidden z-10 relative">
        <Link to={`/blog/${blog?._id}`} className="">
          <img className="w-full" src={PF + blog?.coverImage} alt="" />
        </Link>
      </div>

      <div className="px-2">
        <Link
          to={`/category/${blog?.category}`}
          className="text-xs font-bold text-blue-500 capitalize"
        >
          {blog?.category}
        </Link>

        <div className="flex gap-2 justify-between items-center">
          <Link to={`/blog/${blog?._id}`} className="flex gap-2">
            <h2 className="text-sm capitalize font-medium hover:text-indigo-400 mb-2">
              {blog?.title}
            </h2>
          </Link>
          {isSavedBlog ? (
            <button onClick={handleBookmark}>
              <BookmarkAddedIcon />
            </button>
          ) : (
            <button onClick={handleBookmark}>
              <BookmarkAddIcon />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
