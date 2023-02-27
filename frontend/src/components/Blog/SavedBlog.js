import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSavedBlogs } from "../../actions/blogAction";
import Card from "./Card/Card";

export default function SavedBlog() {
  const dispatch = useDispatch();
  const { blogs } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(getSavedBlogs());
  }, [dispatch]);

  return (
    <div className="grid md:grid-cols-2 gap-2">
      {blogs &&
        blogs.map((item, index) => (
          <div className="col-span-1 bg-white">
            <Card blog={item} key={index} />
          </div>
        ))}
    </div>
  );
}
