import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { deleteBlog } from "../../actions/blogAction";
import { getAllUsers } from "../../actions/userAction";
import { BLOG_DELETE_RESET } from "../../constants/blogConstants";
import { UPDATE_ROLE_RESET } from "../../constants/userConstants";
import { CustomNoRowsOverlay } from "./MaterialAsset/Asset";
import ChangeRollToolTip from "./MaterialAsset/ChangeRollToolTip";

export default function AuthorList() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [deleteId, setDeleteId] = useState(false);
  const [refresh, setRefresh] = useState(true);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.delete
  );
  const { success, error: roleError } = useSelector(
    (state) => state.userDetails
  );

  const {
    users,
    loading,
    error: userError,
  } = useSelector((state) => state.users);

  useEffect(() => {
    if (deleteError) {
      toast.error(deleteError, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
    if (success) {
      toast.success("Status changed", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      dispatch({ type: UPDATE_ROLE_RESET });
    }
    if (isDeleted) {
      toast.success("Blog Deleted", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      setShow(false);
      dispatch({ type: BLOG_DELETE_RESET });
    }
    dispatch(getAllUsers());
  }, [dispatch, deleteError, isDeleted, success, roleError, refresh]);

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
      headerName: "User ID",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.2,
      renderCell: (params) => {
        return (
          <div className="flex items-center justify-between gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img
                src={PF + params.getValue(params.id, "profilePicture")}
                alt=""
              />
            </div>
            <div className="text-sm font-normal">
              {params.getValue(params.id, "name")}
            </div>
          </div>
        );
      },
    },

    {
      field: "role",
      headerName: "Role",
      minWidth: 170,
      flex: 0.15,
      renderCell: (params) => {
        return (
          <div className="actions">
            <ChangeRollToolTip params={params} />
          </div>
        );
      },
    },

    {
      field: "date",
      headerName: "Date",
      minWidth: 270,
      sortable: true,
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

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        role: item.role,
        date: newDate(item.createdAt),
        profilePicture: item.profilePicture,
      });
    });

  return (
    <>
      <div className="my-4 p-4 bg-white ">
        <div className="flex items-center justify-between my-2">
          <p className="font-bold text-md">Author's</p>
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
          pageSize={10}
          disableSelectionOnClick
          className="productListTable"
          autoHeight
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
