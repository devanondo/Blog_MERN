import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  clearError,
  deleteBlog,
  getBlogsAdmin,
} from "../../actions/blogAction";
import {
  BLOG_DELETE_RESET,
  UPDATE_STATUS_RESET,
} from "../../constants/blogConstants";
import { CustomNoRowsOverlay } from "./MaterialAsset/Asset";
import ToolTip from "./MaterialAsset/ToolTip";

export default function BlogsList() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [deleteId, setDeleteId] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [perPage, setPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.delete
  );
  const { success } = useSelector((state) => state.status);

  const {
    blogs,
    count,
    loading,
    error: blogError,
  } = useSelector((state) => state.blogs);

  useEffect(() => {
    if (blogError) {
      toast.error(blogError, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      dispatch(clearError());
    }
    if (deleteError) {
      toast.error(deleteError, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
    if (success) {
      toast.success("Status changed", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      dispatch({ type: UPDATE_STATUS_RESET });
    }
    if (isDeleted) {
      toast.success("Blog Deleted", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      setShow(false);
      dispatch({ type: BLOG_DELETE_RESET });
    }
    dispatch(getBlogsAdmin(keyword, page, perPage));
  }, [
    dispatch,
    deleteError,
    blogError,
    isDeleted,
    success,
    page,
    perPage,
    keyword,
    refresh,
  ]);

  const deleteOrderHandler = (e) => {
    e.preventDefault();
    if (deleteId) {
      dispatch(deleteBlog(deleteId));
    }
  };

  let newDate = function (d) {
    let date = new Date(d);
    return date.toDateString(date);
  };

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "title",
      headerName: "Blog Title",
      minWidth: 150,
      flex: 0.2,
    },
    {
      field: "category",
      headerName: "Category",
      minWidth: 270,
      flex: 0.2,
    },
    {
      field: "author",
      headerName: "Author",
      minWidth: 170,
      flex: 0.15,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 270,
      flex: 0.2,
      renderCell: (params) => {
        return (
          <div className="actions">
            <ToolTip params={params} />
          </div>
        );
      },
    },
    {
      field: "date",
      headerName: "Date",
      minWidth: 270,
      sortable: true,
      type: "number",
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

            <button
              className="mx-2 py-1 px-2 bg-red-100 text-red-700 text-xs rounded"
              onClick={function (e) {
                e.preventDefault();
                setDeleteId(params.getValue(params.id, "id"));
                setShow(true);
              }}
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];
  const rows = [];

  blogs &&
    blogs.forEach((item) => {
      rows.push({
        id: item._id,
        title: item.title,
        status: item.status,
        category: item.category,
        date: newDate(item.createdAt),
        author: item.user.name,
      });
    });

  return (
    <>
      <div className="my-4 p-4 bg-white ">
        <div className="flex items-center justify-between my-2">
          <p className="font-bold text-md">Blog's</p>
          <button
            onClick={() => setRefresh(!refresh)}
            className="rounded-sm px-2 py-1 text-white text-sm bg-indigo-500"
          >
            Refresh
          </button>
        </div>
        <DataGrid
          components={{
            NoRowsOverlay: CustomNoRowsOverlay,
            Toolbar: GridToolbar,
          }}
          rows={rows}
          columns={columns}
          pageSize={perPage}
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          onPageChange={(newPage) => {
            setPage(newPage + 1);
          }}
          paginationMode="server"
          onPageSizeChange={(newPageSize) => setPerPage(newPageSize)}
          disableSelectionOnClick
          className="productListTable"
          autoHeight
          rowCount={count}
        />
        {show && (
          <div
            className="z-50 fixed w-full flex justify-center inset-0"
            id="modal"
          >
            <div
              onClick={() => setShow(false)}
              className="w-full h-full bg-gray-900 opacity-50 z-0 absolute inset-0"
            />
            <div className="h-full w-full flex items-center justify-center">
              <div
                role="alert"
                className="container mx-auto w-11/12 md:w-2/3 max-w-lg"
              >
                <div className="relative py-8 px-8 md:px-16 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-md rounded border border-gray-400">
                  <div className="w-full flex justify-center text-green-400 mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-circle-check"
                      width={56}
                      height={56}
                      viewBox="0 0 24 24"
                      strokeWidth={1}
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <circle cx={12} cy={12} r={9} />
                      <path d="M9 12l2 2l4 -4" />
                    </svg>
                  </div>
                  <h2 className="text-center text-gray-800 dark:text-gray-100 font-lg font-bold tracking-normal leading-tight mb-4">
                    Are you sure Delete this stuff!
                  </h2>

                  <div className="flex items-center justify-center w-full">
                    <button
                      className="focus:outline-none ml-3 bg-gray-100 dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-600 transition duration-150 text-gray-600 dark:text-gray-400 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 mr-4 py-2 text-sm"
                      onClick={() => setShow(!show)}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={deleteOrderHandler}
                      className="focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-4 sm:px-8 py-2 text-xs sm:text-sm"
                    >
                      Confirm
                    </button>
                  </div>
                  <div
                    className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-500 transition duration-150 ease-in-out"
                    onClick={() => setShow(!show)}
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
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
