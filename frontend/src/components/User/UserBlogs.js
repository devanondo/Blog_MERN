import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { clearError, getUserBlogs } from "../../actions/blogAction";
import RecentBlogCard from "../Blog/Card/RecentBlogCard";

export default function UserBlogs() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [activeStatus, setActiveStatus] = useState(1);
  const [status, setStatus] = useState("approved");

  const { user: loadUser } = useSelector((state) => state.user);
  const { blogs: userBlogs, error: blogsError } = useSelector(
    (state) => state.userBlogs
  );

  useEffect(() => {
    if (blogsError) {
      toast.error(blogsError, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      dispatch(clearError());
    }

    dispatch(getUserBlogs(id));
  }, [dispatch, id, blogsError]);

  let filteredBlogs =
    userBlogs &&
    userBlogs.reduce((acc, cur) => {
      if (cur.status === status) {
        acc.push(cur);
      }

      return acc;
    }, []);

  return (
    <div className="col-span-4">
      <div className="w-full xl:mx-0 h-12 bg-white shadow rounded">
        <ul className="flex -b px-5">
          <li
            //   onClick={() => setActiveStatus(1)}
            onClick={function (e) {
              e.preventDefault();
              setActiveStatus(1);
              setStatus("approved");
            }}
            className={
              activeStatus === 1
                ? "text-sm border-indigo-700 pt-3 rounded-t text-indigo-700 mr-12"
                : "text-sm text-gray-600 py-3 flex items-center mr-12 hover:text-indigo-700 cursor-pointer"
            }
          >
            <div className="flex items-center mb-3">
              <span className="ml-1 font-normal">Approved</span>
            </div>
            {activeStatus === 1 && (
              <div className="w-full h-1 bg-indigo-700 rounded-t-md" />
            )}
          </li>

          {loadUser._id === id && (
            <li
              onClick={function (e) {
                e.preventDefault();
                setActiveStatus(2);
                setStatus("pending");
              }}
              className={
                activeStatus === 2
                  ? "text-sm border-indigo-700 pt-3 rounded-t text-indigo-700 mr-12"
                  : "text-sm text-gray-600 py-3 flex items-center mr-12 hover:text-indigo-700 cursor-pointer"
              }
            >
              <div className="flex items-center mb-3">
                <span className="ml-1 font-normal">Pending</span>
              </div>
              {activeStatus === 2 && (
                <div className="w-full h-1 bg-indigo-700 rounded-t-md" />
              )}
            </li>
          )}
          {loadUser._id === id && (
            <li
              onClick={function (e) {
                e.preventDefault();
                setActiveStatus(3);
                setStatus("decline");
              }}
              className={
                activeStatus === 3
                  ? "text-sm border-indigo-700 pt-3 rounded-t text-indigo-700 mr-12"
                  : "text-sm text-gray-600 py-3 flex items-center mr-12 hover:text-indigo-700 cursor-pointer"
              }
            >
              <div className="flex items-center mb-3">
                <span className="ml-1 font-normal">Decline</span>
              </div>
              {activeStatus === 3 && (
                <div className="w-full h-1 bg-indigo-700 rounded-t-md" />
              )}
            </li>
          )}
        </ul>
      </div>

      <div className="grid md:grid-cols-3 my-4 gap-2">
        {filteredBlogs &&
          filteredBlogs.map((blog, index) => (
            <div key={index} className="col-span-1">
              <RecentBlogCard blog={blog} />
            </div>
          ))}
      </div>
      <Outlet />
    </div>
  );
}
