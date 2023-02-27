import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserBlogs } from "../../actions/blogAction";
import {
  clearError,
  follow,
  getUserDetails,
  loadUser,
  unFollow,
} from "../../actions/userAction";
import { FOLLOW_RESET } from "../../constants/userConstants";
import MetaData from "../../utils/MetaData";
import slugify from "../../utils/SlugGenerator";
import Container from "../Layout/Container";
import Loader from "../Layout/Loader";
import Nav from "../Navbar/Nav";
import UserContainer from "./UserContainer";

export default function UserProfile() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  let navigate = useNavigate();

  const { user, loading, error } = useSelector((state) => state.userDetails);
  console.log(user);
  const { user: loggedUser } = useSelector((state) => state.user);
  const { blogs: userBlogs, error: blogsError } = useSelector(
    (state) => state.userBlogs
  );
  const {
    message,
    success,
    error: followError,
  } = useSelector((state) => state.follow);

  useEffect(() => {
    if (followError) {
      toast.error(followError, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      dispatch(clearError());
    }
    if (success) {
      toast.success(message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      dispatch({ type: FOLLOW_RESET });
    }
    dispatch(loadUser());
  }, [followError, success, dispatch, message]);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });

      navigate("/notfound");
      dispatch(clearError());
    }

    if (blogsError) {
      toast.error(blogsError, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      dispatch(clearError());
    }

    dispatch(getUserDetails(id));
    dispatch(getUserBlogs(id));
  }, [dispatch, error, id, blogsError]);
  let followUser = loggedUser?.followings?.find((item) => item._id === id);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        user && (
          <>
            <Nav />
            <MetaData title={user?.name} />
            <Container
              component={
                <div className="flex items-center justify-center w-full">
                  {/* Card code block start */}
                  <div className="bg-white  px-2 md:px-0 dark:bg-gray-800 shadow">
                    <div className="relative">
                      <img
                        className="h-56 shadow  w-full object-cover object-center"
                        src={PF + "cover.jpg"}
                        alt=""
                      />
                      <div className="inset-0 m-auto w-32 h-32 absolute bottom-0 -mb-16 xl:ml-10 rounded-full overflow-hidden border-8 shadow border-slate-400">
                        <img
                          className="w-full h-full overflow-hidden object-cover rounded"
                          src={PF + user.profilePicture}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="px-5 pb-5 border-b">
                      <div className="flex justify-center xl:justify-end w-full pt-16 xl:pt-5">
                        {/* Rating star add wil later */}
                      </div>

                      <div className="pt-3 xl:pt-12 px-4 flex flex-col xl:flex-row items-start xl:items-center justify-between">
                        <div className="xl:pr-16 w-full xl:w-2/3">
                          <div className="text-center xl:text-left mb-3 xl:mb-0 flex flex-col xl:flex-row items-center justify-between xl:justify-start">
                            <h2 className="mb-3 xl:mb-0 xl:mr-4 text-2xl text-gray-800 dark:text-gray-100 font-medium tracking-normal">
                              {user.name}
                            </h2>
                            {loggedUser &&
                              loggedUser._id !== id &&
                              (followUser ? (
                                <div
                                  onClick={function () {
                                    dispatch(unFollow(id));
                                  }}
                                  className="text-sm bg-indigo-700 dark:bg-indigo-600 text-white px-5 py-1 font-normal rounded-full cursor-pointer"
                                >
                                  UnFollow -
                                </div>
                              ) : (
                                <div
                                  onClick={function () {
                                    dispatch(follow(id));
                                  }}
                                  className="text-sm bg-indigo-700 dark:bg-indigo-600 text-white px-5 py-1 font-normal rounded-full cursor-pointer"
                                >
                                  Follow +
                                </div>
                              ))}
                          </div>
                          <p className="text-center xl:text-left mt-2 text-sm tracking-normal text-gray-600 dark:text-gray-400 leading-5">
                            HI, I am a direct response copywriter from the US.
                            When you work with me, we have the same goal.
                            Maximizing your ROI
                          </p>
                        </div>
                        <div className="xl:px-10 xl:border-l xl:border-r w-full py-5 flex items-start justify-center xl:w-1/3">
                          <div className="mr-6 xl:mr-10">
                            <h2 className="text-gray-600 dark:text-gray-400 font-bold text-xl xl:text-2xl leading-6 mb-2 text-center">
                              {userBlogs && userBlogs.length}
                            </h2>
                            <p className="text-gray-800 dark:text-gray-100 text-sm xl:text-xl leading-5">
                              Reviews
                            </p>
                          </div>
                          <div className="mr-6 xl:mr-10">
                            <h2 className="text-gray-600 dark:text-gray-400 font-bold text-xl xl:text-2xl leading-6 mb-2 text-center">
                              {userBlogs && userBlogs.length}
                            </h2>
                            <p className="text-gray-800 dark:text-gray-100 text-sm xl:text-xl leading-5">
                              Blog's
                            </p>
                          </div>
                        </div>
                        <div className="w-full xl:w-1/2 flex-col md:flex-row justify-center xl:justify-end flex md:pl-6">
                          <div className="flex items-center justify-center xl:justify-start mt-1 md:mt-0 mb-5 md:mb-0">
                            <div className="md:ml-5 rounded-full bg-green-200 text-green-500 text-sm px-6 py-2 flex justify-center items-center">
                              Available
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Sidebar */}

                    <div className="w-full px-2 md:px-0">
                      <div className="md:grid grid-cols-5">
                        <div className="col-span-1 border-r">
                          <NavLink
                            className={({ isActive }) =>
                              `p-2 my-1 hover:bg-indigo-300 hover:text-white block w-full   ${
                                isActive && "bg-indigo-500 text-white"
                              } `
                            }
                            to={`/profile/${
                              user && slugify(user?.name)
                            }/${id}/about`}
                          >
                            About Me
                          </NavLink>
                          <NavLink
                            className={({ isActive }) =>
                              `p-2 my-1 hover:bg-indigo-300 hover:text-white block w-full   ${
                                isActive && "bg-indigo-500 text-white"
                              } `
                            }
                            to={`/profile/${
                              user && slugify(user?.name)
                            }/${id}/blogs`}
                          >
                            Blogs
                          </NavLink>
                          {loggedUser?._id === user?._id && (
                            <NavLink
                              className={({ isActive }) =>
                                `p-2 my-1 hover:bg-indigo-300 hover:text-white block w-full   ${
                                  isActive && "bg-indigo-500 text-white"
                                } `
                              }
                              to={`/profile/${
                                user && slugify(user?.name)
                              }/${id}/saved%blogs`}
                            >
                              Saved Blogs
                            </NavLink>
                          )}

                          <NavLink
                            className={({ isActive }) =>
                              `p-2 my-1 hover:bg-indigo-300 hover:text-white block w-full   ${
                                isActive && "bg-indigo-500 text-white"
                              } `
                            }
                            to={`/profile/${
                              user && slugify(user?.name)
                            }/${id}/follower`}
                          >
                            Follower
                          </NavLink>

                          {loggedUser?._id === user?._id && (
                            <NavLink
                              className={({ isActive }) =>
                                `p-2 my-1 hover:bg-indigo-300 hover:text-white block w-full   ${
                                  isActive && "bg-indigo-500 text-white"
                                } `
                              }
                              to={`/profile/${
                                user && slugify(user?.name)
                              }/${id}/create`}
                            >
                              Create Blog
                            </NavLink>
                          )}
                          <NavLink
                            className={({ isActive }) =>
                              `p-2 my-1 hover:bg-indigo-300 hover:text-white block w-full   ${
                                isActive && "bg-indigo-500 text-white"
                              } `
                            }
                            to={`/profile/${
                              user && slugify(user?.name)
                            }/${id}/following`}
                          >
                            Following
                          </NavLink>
                        </div>
                        <div className="col-span-4">
                          <UserContainer user={user} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card code block end */}
                </div>
              }
            />
          </>
        )
      )}
    </>
  );
}
