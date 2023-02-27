import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { clearError, getBlogs } from "../../actions/blogAction";
import { getAllCategory } from "../../actions/categoryAction";
import { getAllUsers } from "../../actions/userAction";
import MetaData from "../../utils/MetaData";
import BlogCard from "../Blog/Card/BlogCard";
import Card from "../Blog/Card/Card";
import Container from "../Layout/Container";
import Loader from "../Layout/Loader";
import Nav from "../Navbar/Nav";
import "./Header.scss";

export default function Header() {
  const dispatch = useDispatch();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const pageValue = 1;
  const keyword = "";

  //Get data form redux state
  const { blogs, error, loading, count } = useSelector((state) => state.blogs);
  const { users, error: usersError } = useSelector((state) => state.users);
  const { category } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getBlogs(keyword, pageValue));
  }, [dispatch, keyword, pageValue]);

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
    dispatch(getAllUsers());
  }, [dispatch, error, usersError]);

  console.log(blogs);

  return (
    <div className="">
      {loading ? (
        <Loader />
      ) : (
        <div className="relative">
          <Nav />
          <MetaData title="Blog Home" description="Blog Home" />
          <Container
            component={
              <div className=" md:grid md:pt-0 mt-16 pt-4 md:mt-4 grid-cols-12 gap-3">
                {/* Top Blogs */}

                <div className="md:col-span-9  px-2 md:p-0">
                  <div className="border rounded-md p-2  bg-white">
                    {blogs && <BlogCard blog={blogs[0]} heading={true} />}
                  </div>

                  {/* Other blogs */}

                  <div className=" py-4 my-4 rounded">
                    <h2 className="text-md font-medium mb-4">Recent Blogs</h2>
                    <div className="md:grid grid-cols-2 gap-3">
                      {blogs &&
                        blogs.map((blog, index) => (
                          <div key={index} className="col-span-1 bg-white">
                            <Card blog={blog} />
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
                <div className="md:col-span-3">
                  <div className="md:fixed mt-4 px-2 md:mt-0">
                    <div className="overflow-y-auto m-h-80vh">
                      <h2 className="text-xl mb-4 font-bold">Top Blog's</h2>

                      <div className="rounded-md bg-white border px-4 ">
                        {blogs &&
                          blogs.slice(0, 5).map((blog, index) => (
                            <Link
                              to={`/blog/${blog?._id}`}
                              key={index}
                              className="flex items-center  gap-3 py-3"
                            >
                              <div className="w-10 h-10 rounded-full border-2 flex items-center content-center overflow-hidden ">
                                <img
                                  className="w-full"
                                  src={PF + blog?.user?.profilePicture}
                                  alt=""
                                />
                              </div>
                              <p className="text-sm capitalize font-medium line-shorter">
                                {blog.title}
                              </p>
                            </Link>
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
                                  className="my-2 capitalize block hover:text-indigo-500 text-sm font-normal"
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
                </div>
              </div>
            }
          />
        </div>
      )}
    </div>
  );
}
