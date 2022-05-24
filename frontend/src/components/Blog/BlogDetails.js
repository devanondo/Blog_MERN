import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Dialog, DialogContent, Popover } from "@mui/material";
import parse from "html-react-parser";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  clearError,
  createComment,
  deleteComment,
  getBlogDetails,
  getUserBlogs,
} from "../../actions/blogAction";
import {
  COMMENT_DELETE_RESET,
  COMMENT_RESET,
} from "../../constants/blogConstants";
import MetaData from "../../utils/MetaData";
import Container from "../Layout/Container";
import Loader from "../Layout/Loader";
import Navbar from "../Navbar/Navbar";
import SubHeader from "../SubHeader/SubHeader";
import FollowCard from "./Follower/FollowCard";

export default function BlogDetails() {
  let { blog, error, loading } = useSelector((state) => state.blogs);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { success, error: commentError } = useSelector(
    (state) => state.newComment
  );

  const { isDeleted, error: deleteError } = useSelector(
    (state) => state.delete
  );

  const { blogs: userBlogs, error: blogsError } = useSelector(
    (state) => state.userBlogs
  );

  const [anchorEl, setAnchorEl] = useState(null);
  const [dialog, setDialog] = useState(false);
  const [comment, setComment] = useState("");
  const [commentId, setCommentId] = useState("");

  const { id } = useParams();
  const dispatch = useDispatch();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const popId = open ? "simple-popover" : undefined;

  useEffect(() => {
    if (commentError) {
      toast.error(commentError, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      dispatch(clearError());
    }
    if (success) {
      toast.success("Comment Added successfully", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      setAnchorEl(null);
      dispatch({ type: COMMENT_RESET });

      setComment("");
    }

    if (isDeleted) {
      toast.success("Comment deleted successfully", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      setAnchorEl(null);
      dispatch({ type: COMMENT_DELETE_RESET });
    }
  }, [success, commentError, dispatch, isDeleted]);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      dispatch(clearError());
    }

    dispatch(getBlogDetails(id));
  }, [dispatch, error, id, success, isDeleted]);

  useEffect(() => {
    if (blogsError) {
      toast.error(blogsError, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      dispatch(clearError());
    }
    if (blog?.user._id) {
      dispatch(getUserBlogs(blog?.user._id));
    }
  }, [dispatch, blog?.user._id, blogsError]);

  const submitCommentToggle = () => {
    setDialog(!dialog);
  };

  let data = {
    message: comment,
  };
  const commentSubmitHandler = (e) => {
    e.preventDefault();

    if (comment) {
      dispatch(createComment(id, data));

      console.log(blog);
      setDialog(false);
    }
  };

  const handleDeleteComment = (mid) => {
    dispatch(deleteComment(id, mid));
    blog = blog.comments.filter((item) => item._id !== mid);
  };

  return (
    <div className="">
      {loading ? (
        <Loader />
      ) : (
        <div>
          {blog && (
            <div>
              <Navbar />
              <MetaData
                title={"Blog Details"}
                description={blog?.description}
              />
              <SubHeader blog={blog} />
              <Container
                component={
                  <div className="md:grid grid-cols-12 gap-3 px-2">
                    <div className="col-span-9">
                      <div className="max-h-96 overflow-hidden rounded-md">
                        <img
                          src={PF + blog.coverImage}
                          alt="fingerprint recognition"
                          className="w-full rounded-md"
                        />
                      </div>
                      <div className="mt-4">
                        <div className="flex justify-between p-4 w-full">
                          <div className="min-w-fit px-2 font-bold text-xs  rounded-2xl flex justify-center items-center bg-pink-100 text-pink-600 uppercase">
                            5 min read
                          </div>
                          <div className="flex gap-4 font-light text-xs ">
                            <div>
                              View: <span className="font-bold mx-1">5.3k</span>{" "}
                            </div>
                            <div>
                              Comment:{" "}
                              <span className="font-bold mx-1">
                                {blog.comments?.length}
                              </span>{" "}
                            </div>
                            <div>
                              Share:{" "}
                              <span className="font-bold mx-1">5.3k</span>{" "}
                            </div>
                          </div>
                        </div>

                        <p className="text-base leading-6 text-justify text-gray-600 mt-2">
                          {parse(blog.description)}
                        </p>

                        {/* comments */}

                        <div className="my-2 p-4 ">
                          <h2 className="font-semibold text-md mb-2">
                            Comment's
                          </h2>

                          {blog
                            ? blog.comments.map((comment, index) => (
                                <div
                                  key={index}
                                  className="border my-2 p-2 w-full md:max-w-lg"
                                >
                                  <div className="flex  items-center justify-between">
                                    <div className="flex  items-center gap-2">
                                      <div className="w-10 h-10 rounded-full overflow-hidden">
                                        <img
                                          className="w-full"
                                          src={PF + comment.profilePicture}
                                          alt=""
                                        />
                                      </div>
                                      <p className="text-xs font-bold">
                                        {comment.name}
                                      </p>
                                    </div>
                                    <div className="text-xs">
                                      <div
                                        aria-describedby={id}
                                        variant="contained"
                                        onClick={function (event) {
                                          setAnchorEl(event.currentTarget);
                                          if (user._id === comment.user) {
                                            setCommentId(comment._id);
                                            console.log(true);
                                          } else {
                                            setCommentId("");
                                          }
                                        }}
                                      >
                                        <MoreHorizIcon className="cursor-pointer" />
                                      </div>
                                      <Popover
                                        id={popId}
                                        open={open}
                                        anchorEl={anchorEl}
                                        onClose={handleClose}
                                        anchorOrigin={{
                                          vertical: "bottom",
                                          horizontal: "center",
                                        }}
                                        transformOrigin={{
                                          vertical: "top",
                                          horizontal: "center",
                                        }}
                                      >
                                        <div className="p-2">
                                          <p className="text-xs hover:text-indigo-500 mb-2 cursor-pointer font-normal">
                                            View Profile
                                          </p>
                                          {commentId &&
                                            user._id === comment.user && (
                                              <button
                                                onClick={() =>
                                                  handleDeleteComment(commentId)
                                                }
                                                className="text-xs hover:text-indigo-500 cursor-pointer font-normal"
                                              >
                                                Delete Comment
                                              </button>
                                            )}
                                        </div>
                                      </Popover>
                                    </div>
                                  </div>

                                  {/* Comment Message */}

                                  <div className="p-2 max-w-xl rounded  ">
                                    <p
                                      className={`bg-indigo-200 w-fit p-2 rounded-md text-xs`}
                                    >
                                      {comment.message}
                                    </p>
                                  </div>
                                </div>
                              ))
                            : "Please Login to access comment"}
                          {isAuthenticated && (
                            <div className="px-2">
                              <button
                                className="mx-auto focus:outline-none bg-indigo-700 dark:bg-indigo-600 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-6 py-2 text-sm"
                                onClick={submitCommentToggle}
                              >
                                Write Comment
                              </button>
                            </div>
                          )}

                          <Dialog
                            className=""
                            open={dialog}
                            onClose={submitCommentToggle}
                            aria-describedby="alert-dialog-slide-description"
                          >
                            <div className="w-96">
                              <h2 className="mt-4 ml-4">Write Comment</h2>
                              <DialogContent className="p-0">
                                <textarea
                                  placeholder="Write your comment about this product."
                                  className="border w-full p-2 h-36"
                                  value={comment}
                                  onChange={(e) => setComment(e.target.value)}
                                ></textarea>
                              </DialogContent>
                              <div className="action">
                                <button
                                  className="mb-4 px-4 font-normal py-2 text-xs ml-4 border rounded border-indigo-500"
                                  color="secondary"
                                  onClick={submitCommentToggle}
                                >
                                  Cancel
                                </button>
                                <button
                                  className="mb-4 px-4 py-2 text-xs ml-4 border rounded border-indigo-500  font-normal text-white bg-indigo-500"
                                  onClick={commentSubmitHandler}
                                >
                                  Submit
                                </button>
                              </div>
                            </div>
                          </Dialog>
                        </div>
                      </div>
                    </div>

                    {/* -------------------------------------- */}

                    {/* -------------------------------------- */}

                    <div className="col-span-3">
                      <FollowCard follower={blog?.user} show={true} />

                      <div className="my-4 border rounded p-4">
                        <div className="flex justify-between items-center">
                          <h2 className="text-sm">Blogs</h2>
                          <Link
                            to="/"
                            className="border text-xs ease-in-out duration-500 hover:bg-indigo-500 hover:text-white border-indigo-500 bg-transparent rounded-2xl py-1 px-2 text-indigo-500"
                          >
                            More
                          </Link>
                        </div>
                        <div className="text-sm">
                          {userBlogs &&
                            userBlogs.slice(0, 6).map((item, index) => (
                              <Link to={`/blog/${item._id}`} key={index}>
                                <p className="font-bold my-2 line-shorter hover:text-indigo-400 ">
                                  {index + 1}. {item.title}
                                </p>
                              </Link>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                }
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
