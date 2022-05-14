import React from "react";
import { Link } from "react-router-dom";
import slugify from "../../../utils/SlugGenerator";

export default function BlogCard({ blog, heading }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="bg-white">
      <div className="max-h-96 overflow-hidden">
        <img
          className="w-full rounded"
          src={PF + blog?.coverImage.trim()}
          alt=""
        />
      </div>
      {/* <img src="/uploads/cover.jpg" alt="" /> */}

      <div className="flex justify-between p-4 w-full">
        <div className="min-w-fit px-2 font-bold text-xs rounded rounded-2xl flex justify-center items-center bg-pink-100 text-pink-600 uppercase">
          politics
        </div>
        <div className="flex gap-4 font-light text-xs ">
          <div>
            View: <span className="font-bold mx-1">5.3k</span>{" "}
          </div>
          <div>
            Comment:{" "}
            <span className="font-bold mx-1">{blog?.comments.length}</span>{" "}
          </div>
          <div>
            Share: <span className="font-bold mx-1">5.3k</span>{" "}
          </div>
        </div>
      </div>
      <Link
        to={`/blog/${blog?._id}`}
        className="hading font-bold text-xl  hover:text-indigo-500"
      >
        {blog?.title}
      </Link>

      {heading && (
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full border-2 flex items-center content-center overflow-hidden ">
              <img className="w-full" src={PF + `avatar.png`} alt="" />
            </div>
            <div className="font-bold text-xs uppercase text-gray-400">
              <p>{blog?.user && blog?.user.name}</p>
              <p>Dhaka Bangladesh</p>
            </div>
          </div>
          <Link
            to={`/profile/${blog?.user && slugify(blog?.user.name)}/${
              blog?.user._id
            }`}
            className="border text-xs ease-in-out duration-500 hover:bg-indigo-500 hover:text-white border-indigo-500 bg-transparent rounded-2xl py-1 px-4 text-indigo-500"
          >
            View Profile
          </Link>
        </div>
      )}
    </div>
  );
}
