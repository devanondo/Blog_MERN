import { Link } from "react-router-dom";
import Container from "../Layout/Container";

export default function SubHeader({ blog }) {
  let newDate = function (d) {
    let date = new Date(d);
    return date.toDateString(date);
  };
  return (
    <div className="bg-indigo-100 w-full mb-4 py-10 px-2">
      <Container
        component={
          <div>
            <Link
              to="/"
              className="text-md uppercase font-bold text-indigo-600 hover:text-indigo-800"
            >
              {blog?.category}
            </Link>
            <h2 className="text-3xl font-bold my-3 ">{blog?.title}</h2>
            <h2 className="text-sm font-bold">{newDate(blog?.createdAt)}</h2>
          </div>
        }
      />
    </div>
  );
}
