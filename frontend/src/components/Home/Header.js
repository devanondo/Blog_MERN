import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { clearError, getBlogs } from "../../actions/blogAction";
import { getAllCategory } from "../../actions/categoryAction";
import { getAllUsers } from "../../actions/userAction";
import MetaData from "../../utils/MetaData";
import BlogCard from "../Blog/Card/BlogCard";
import RecentBlogCard from "../Blog/Card/RecentBlogCard";
import Container from "../Layout/Container";
import Loader from "../Layout/Loader";
import Navbar from "../Navbar/Navbar";

export default function Header() {
  const dispatch = useDispatch();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  //Get data form redux state
  const { blogs, error, loading } = useSelector((state) => state.blogs);
  const { users, error: usersError } = useSelector((state) => state.users);
  const { category, error: categoryError } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      dispatch(clearError());
    }
    if (usersError) {
      toast.error(error, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      dispatch(clearError());
    }
    dispatch(getAllCategory());
    dispatch(getBlogs());
    dispatch(getAllUsers());
  }, [dispatch, error, usersError]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Navbar />
          <MetaData title="Blog Home" description="Blog Home" />
          <Container
            component={
              <div className="relative md:grid grid-cols-12 gap-3">
                <div className="col-span-9">
                  <div className=" rounded-md p-2 bg-white">
                    {blogs && (
                      <BlogCard blog={blogs[blogs.length - 1]} heading={true} />
                    )}
                  </div>

                  {/* Other blogs */}

                  <div className=" border p-4 my-4 rounded">
                    <h2 className="text-md font-medium mb-4">Recent Blogs</h2>
                    <div className="md:grid grid-cols-3 gap-3">
                      {blogs &&
                        blogs.slice(0, 7).map((blog, index) => (
                          <div key={index} className="col-span-1">
                            <RecentBlogCard blog={blog} />
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                {/* Top Blogs */}

                <div className="col-span-3 ">
                  <h2 className="text-xl mb-4 font-bold">Top Blog's</h2>

                  <div className=" rounded-md bg-white  px-4 ">
                    {blogs &&
                      blogs.map((blog, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between gap-3 py-3"
                        >
                          <div className="w-10 h-10 rounded-full border-2 flex items-center content-center overflow-hidden ">
                            <img
                              className="w-full"
                              src={PF + blog.user.profilePicture}
                              alt=""
                            />
                          </div>
                          <p className="text-sm font-bold">{blog.title}</p>
                        </div>
                      ))}
                  </div>
                  <div className="my-4 rounded-md bg-white p-4 ">
                    <h2 className="text-xl mb-4 font-bold">
                      <span className="">Top</span> Author's
                    </h2>
                    <div className="flex flex-wrap  gap-3">
                      {users &&
                        users.map((user, index) => (
                          <div
                            key={index}
                            className="w-10 h-10 rounded-full border-2 flex items-center overflow-hidden "
                          >
                            <img
                              className="w-full"
                              src={PF + user.profilePicture}
                              alt=""
                            />
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="">
                    <div className="categories my-4 p-4 bg-white">
                      <h2 className="font-bold">Categories</h2>

                      <div className="text-xs mt-4 text-gray-400">
                        {category &&
                          category.map((item, index) => (
                            <Link
                              to={`/category/${item.category}`}
                              className="capitalize block hover:text-indigo-500 text-sm font-normal"
                              key={index}
                            >
                              {item.category}
                            </Link>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
          />
        </div>
      )}
    </>
  );
}
