import React from "react";
import { Link } from "react-router-dom";

export default function Card({ blog }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="border w-full rounded overflow-hidden mb-4">
      <div className=" max-h-52 overflow-hidden z-50 relative">
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
