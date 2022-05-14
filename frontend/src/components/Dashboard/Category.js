import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  clearError,
  createCategory,
  getAllCategory,
} from "../../actions/categoryAction";
import { CustomNoRowsOverlay } from "./MaterialAsset/Asset";

export default function Category() {
  const dispatch = useDispatch();
  const [popup, setPopup] = useState(false);
  const [coverImage, setCoverImage] = useState("");
  const [coverImagePreview, setCoverImagePreview] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { category, loading, error, success } = useSelector(
    (state) => state.category
  );

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!coverImage) {
      toast.error("Select blog Picture", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      let formData = new FormData();
      formData.append("file", coverImage);
      formData.append("category", title);
      formData.append("description", description);

      dispatch(createCategory(formData));
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      dispatch(clearError());
    }
    if (success) {
      toast.success("Category Added ", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      setPopup(false);
    }

    dispatch(getAllCategory());
  }, [dispatch, success, error]);

  const columns = [
    {
      field: "category",
      headerName: "Category",
      minWidth: 270,
      flex: 0.2,
      renderCell: (params) => {
        return (
          <div className="flex items-center my-1 gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img
                className="object-cover h-8 w-8"
                src={PF + params.getValue(params.id, "coverImage")}
                alt=""
              />
            </div>
            <p className=" text-indigo-700 text-xs capitalize">
              {params.getValue(params.id, "category")}
            </p>
          </div>
        );
      },
    },
    {
      field: "blogs",
      headerName: "Blogs",
      type: "number",
      minWidth: 270,
      flex: 0.2,
    },
    {
      field: "actions",
      flex: 0.4,
      headerName: "Actions",
      type: "number",
      minWidth: 150,
      sortable: false,
      renderCell: (params) => {
        return (
          <div className="actions">
            <Link
              className="mx-2 py-1 px-2  bg-indigo-100 text-indigo-700 text-xs rounded"
              to={`/dashboard/blog/${params.getValue(params.id, "id")}/edit`}
            >
              Edit
            </Link>

            <button className="mx-2 py-1 px-2 bg-red-100 text-red-700 text-xs rounded">
              Delete
            </button>
          </div>
        );
      },
    },
  ];
  const rows = [];

  category &&
    category.forEach((item) => {
      rows.push({
        id: item._id,
        category: item.category,
        coverImage: item.coverImage,
        blogs: item.blogs.length,
      });
    });

  return (
    <div className="my-4 p-4 bg-white ">
      <div className="mb-3 rounded flex justify-between items-center bg-white w-full">
        <h className="text-md">Category</h>
        <button
          onClick={() => setPopup(true)}
          className="rounded bg-indigo-500 text-white py-2 px-3 text-xs "
        >
          Add Category
        </button>
      </div>
      <DataGrid
        components={{
          NoRowsOverlay: CustomNoRowsOverlay,
          Toolbar: GridToolbar,
        }}
        rows={rows}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        className="productListTable"
        autoHeight
      />
      {popup && (
        <div
          id="popup"
          className="z-50 fixed w-full flex justify-center inset-0"
        >
          <div
            onClick={() => setPopup(false)}
            className="w-full h-full bg-gray-900 opacity-50 z-0 absolute inset-0"
          />
          <div className="mx-auto">
            <div className="flex items-center justify-center h-full w-full px-4 sm:px-0 ">
              <div className="bg-white rounded-md shadow max-w-4xl w-full fixed z-20  ">
                <div className="bg-gray-100 w-full rounded-tl-md rounded-tr-md p-4 flex items-center justify-between">
                  <p className="text-base font-semibold">Create Category</p>
                  <button
                    onClick={() => setPopup(false)}
                    className="focus:outline-none"
                  >
                    <svg
                      width={28}
                      height={28}
                      viewBox="0 0 28 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21 7L7 21"
                        stroke="#A1A1AA"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7 7L21 21"
                        stroke="#A1A1AA"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
                <div className="px-6 overflow-y-auto h-96">
                  <p className="my-2">Cover Image</p>
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
                          <img
                            className="h-64"
                            src={coverImagePreview}
                            alt=""
                          />
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
                        required
                        className="hidden"
                        name="coverImage"
                        id="fileUp"
                        onChange={blogDataChange}
                      />
                    </div>

                    <div className="mt-4 flex flex-col">
                      <label className="text-xs font-semibold leading-3 text-gray-800 dark:text-gray-100">
                        Category Title
                      </label>
                      <input
                        name="title"
                        required
                        onBlur={(e) => setTitle(e.target.value)}
                        type="text"
                        placeholder="Write your title here..."
                        className="text-xs font-medium leading-3 text-gray-500 dark:text-gray-400 resize-none bg-gray-50 dark:bg-gray-700 border rounded-lg border-gray-200 dark:border-gray-700 focus:outline-none px-4 py-3 mt-2"
                      />
                    </div>
                    <div className="mt-4 flex flex-col">
                      <label className="text-xs font-semibold leading-3 text-gray-800 dark:text-gray-100">
                        Category Description
                      </label>
                      <textarea
                        required
                        name="description"
                        onBlur={(e) => setDescription(e.target.value)}
                        type="text"
                        placeholder="Write your description here..."
                        className="h-20 text-xs font-medium leading-3 text-gray-500 dark:text-gray-400 resize-none bg-gray-50 dark:bg-gray-700 border rounded-lg border-gray-200 dark:border-gray-700 focus:outline-none px-4 py-3 mt-2"
                      ></textarea>
                    </div>

                    <div className="mt-4">
                      <button
                        className="mb-4 px-4 font-normal py-2 text-xs border rounded border-indigo-500"
                        color="secondary"
                        onClick={() => setPopup(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="mb-4 px-4 py-2 text-xs ml-4 border rounded border-indigo-500  font-normal text-white bg-indigo-500"
                        onClick={handleSubmit}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
