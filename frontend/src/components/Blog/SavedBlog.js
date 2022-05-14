import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSavedBlogs } from "../../actions/blogAction";
import Card from "./Card/Card";

export default function SavedBlog() {
  const dispatch = useDispatch();
  const { blogs } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(getSavedBlogs());
  }, []);
  console.log(blogs);

  return (
    <div>
      {blogs && blogs.map((item, index) => <Card blog={item} key={index} />)}
    </div>
  );
}
