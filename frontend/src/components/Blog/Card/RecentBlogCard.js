import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BlogCardOption from "./BlogCardOption";

export default function RecentBlogCard({ blog }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const { user } = useSelector((state) => state.user);

  return (
    <div className="border w-full rounded overflow-hidden mb-4">
      <div className=" max-h-52 overflow-hidden z-50 relative">
        {user && user?._id === blog?.user && (
          <div className="top-5 right-5 absolute">
            <BlogCardOption id={blog._id} />
          </div>
        )}

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

        <Link to={`/blog/${blog?._id}`} className="">
          <h2 className="text-md font-semibold hover:text-indigo-400 mb-2">
            {blog?.title}
          </h2>
        </Link>
      </div>
    </div>
  );
}
