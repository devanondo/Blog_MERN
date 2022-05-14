import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getBlogDetails, updateBlog } from "../../actions/blogAction";
import { getAllCategory } from "../../actions/categoryAction";

export default function EditBlog() {
  const editor = useRef(null);
  const dispatch = useDispatch();
  const { category: categories } = useSelector((state) => state.category);
  const { success, error, loading, blog, isUpdate } = useSelector(
    (state) => state.blogs
  );
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [coverImage, setCoverImage] = useState("");
  const [coverImagePreview, setCoverImagePreview] = useState(
    PF + blog?.coverImage
  );
  const [title, setTitle] = useState(blog?.title);
  const [category, setCategory] = useState(blog?.category);
  const [content, setContent] = useState(blog?.description);
  const { blogid } = useParams();

  const blogDataChange = (e) => {
    //For preview avatar image
    if (e.target.name === "coverImage") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setCoverImagePreview(reader.result);
          setCoverImage(e.target.files[0]);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  console.log(isUpdate);
  useEffect(() => {
    if (success) {
      toast.success("Blog created successfully", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
    if (error) {
      toast.error(error, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
    dispatch(getAllCategory());
    dispatch(getBlogDetails(blogid));
  }, [success, dispatch, error, blogid]);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(coverImage);

    if (!title) {
      toast.error("Write Blog title", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else if (!category) {
      toast.error("Select Blog category", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      let formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("description", content);
      if (coverImage) {
        formData.append("file", coverImage);
      }
      dispatch(updateBlog(blog?._id, formData));
      // dispatch(createBlog(formData));
    }
  };

  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
    iframe: true,
    uploader: {
      insertImageAsBase64URI: true,
    },
    spellcheck: true,
  };

  return (
    <>
      <div className="px-6 min-h-fit">
        <form className="mt-5" encType="multipart/form-data">
          <div className="flex flex-col items-center justify-center max-w-fit mx-auto mb-8 rounded-lg overflow-hidden">
            {coverImagePreview ? (
              <div className="relative">
                <div
                  className="cursor-pointer rounded bg-black p-1 absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-500 transition duration-150 ease-in-out"
                  onClick={() => setCoverImagePreview("")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-label="Close"
                    className="icon icon-tabler icon-tabler-x"
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <line x1={18} y1={6} x2={6} y2={18} />
                    <line x1={6} y1={6} x2={18} y2={18} />
                  </svg>
                </div>
                <img className="h-64" src={coverImagePreview} alt="" />
              </div>
            ) : (
              <label
                htmlFor="fileUp"
                className="cursor-pointer mb-5 text-indigo-700 dark:text-indigo-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-cloud-upload"
                  width={60}
                  height={60}
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <path d="M7 18a4.6 4.4 0 0 1 0 -9h0a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1" />
                  <polyline points="9 15 12 12 15 15" />
                  <line x1={12} y1={12} x2={12} y2={21} />
                </svg>
              </label>
            )}

            <input
              type="file"
              className="hidden"
              name="coverImage"
              id="fileUp"
              onChange={blogDataChange}
            />
          </div>

          <div className="md:flex w-full items-center justify-between gap-2">
            <div className=" w-full flex flex-col">
              <label className="text-xs font-semibold leading-3 text-gray-800 dark:text-gray-100">
                Blog Title
              </label>
              <input
                name="title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Write your title here..."
                className="text-xs font-medium leading-3 text-gray-500 dark:text-gray-400 resize-none bg-gray-50 dark:bg-gray-700 border rounded-lg border-gray-200 dark:border-gray-700 focus:outline-none px-4 py-2 mt-3"
              />
            </div>

            <div className="w-full">
              <label className="text-xs font-semibold leading-3 text-gray-800 dark:text-gray-100">
                Subject
              </label>
              <div className="py-1 rounded-lg px-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-700">
                <select
                  onChange={(e) => setCategory(e.target.value)}
                  name="category"
                  required
                  value={blog?.category}
                  className="text-xs focus:outline-none font-medium leading-3 text-gray-600 dark:text-gray-100 bg-transparent w-full"
                >
                  <option defaultValue>Select a Category</option>
                  {categories &&
                    categories.map((item, index) => (
                      <option
                        className="capitalize"
                        key={index}
                        value={item.category}
                      >
                        {item.category}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>

          <div className="my-4">
            <label className="text-xs mb-2  font-semibold leading-3 text-gray-800 dark:text-gray-100">
              Description
            </label>
            <JoditEditor
              ref={editor}
              value={content}
              config={config}
              tabIndex={1} // tabIndex of textarea
              onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
              onChange={(newContent) => {}}
            />
          </div>

          <button
            className="mb-4 px-4 py-2 text-xs border rounded border-indigo-500  font-normal text-white bg-indigo-500"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
