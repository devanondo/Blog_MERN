import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updatePassword } from "../../actions/userAction";

export default function ChangePassword({ shown }) {
  const dispatch = useDispatch();
  const [show, setShow] = shown;
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const { success, error } = useSelector((state) => state.update);
  const handleChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }

    if (success) {
      toast.success("Update successfully", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      setShow(false);
    }
  }, [dispatch, success, error]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updatePassword(password));
  };

  return (
    <div>
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
              <div className="relative p-2 md:p-8  bg-white dark:bg-gray-800 dark:border-gray-700 shadow-md rounded border border-gray-400">
                <h3 className="text-xl font-normal">Change Password</h3>
                <form action="">
                  <div className="">
                    <label
                      htmlFor="myInput"
                      className="text-sm font-medium leading-none text-gray-800"
                    >
                      Old Password
                    </label>
                    <div className="relative flex items-center justify-center">
                      <input
                        required
                        id="myInput"
                        name="oldPassword"
                        onChange={handleChange}
                        type="password"
                        placeholder="Enter old Password"
                        className="bg-gray-200 border rounded text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <label
                      htmlFor="myInput"
                      className="text-sm font-medium leading-none text-gray-800"
                    >
                      New Password
                    </label>
                    <div className="relative flex items-center justify-center">
                      <input
                        required
                        id="myInput"
                        name="newPassword"
                        onChange={handleChange}
                        type={showNewPass ? "text" : "password"}
                        placeholder="Enter New Password"
                        className="bg-gray-200 border rounded text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                      />
                      <div
                        onClick={() => setShowNewPass(!showNewPass)}
                        className="absolute right-0 mt-2 mr-3 cursor-pointer"
                      >
                        <div id="show">
                          <svg
                            width={22}
                            height={22}
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M7.99978 2C11.5944 2 14.5851 4.58667 15.2124 8C14.5858 11.4133 11.5944 14 7.99978 14C4.40511 14 1.41444 11.4133 0.787109 8C1.41378 4.58667 4.40511 2 7.99978 2ZM7.99978 12.6667C9.35942 12.6664 10.6787 12.2045 11.7417 11.3568C12.8047 10.509 13.5484 9.32552 13.8511 8C13.5473 6.67554 12.8031 5.49334 11.7402 4.64668C10.6773 3.80003 9.35864 3.33902 7.99978 3.33902C6.64091 3.33902 5.32224 3.80003 4.25936 4.64668C3.19648 5.49334 2.45229 6.67554 2.14844 8C2.45117 9.32552 3.19489 10.509 4.25787 11.3568C5.32085 12.2045 6.64013 12.6664 7.99978 12.6667ZM7.99978 11C7.20413 11 6.44106 10.6839 5.87846 10.1213C5.31585 9.55871 4.99978 8.79565 4.99978 8C4.99978 7.20435 5.31585 6.44129 5.87846 5.87868C6.44106 5.31607 7.20413 5 7.99978 5C8.79543 5 9.55849 5.31607 10.1211 5.87868C10.6837 6.44129 10.9998 7.20435 10.9998 8C10.9998 8.79565 10.6837 9.55871 10.1211 10.1213C9.55849 10.6839 8.79543 11 7.99978 11ZM7.99978 9.66667C8.4418 9.66667 8.86573 9.49107 9.17829 9.17851C9.49085 8.86595 9.66644 8.44203 9.66644 8C9.66644 7.55797 9.49085 7.13405 9.17829 6.82149C8.86573 6.50893 8.4418 6.33333 7.99978 6.33333C7.55775 6.33333 7.13383 6.50893 6.82126 6.82149C6.5087 7.13405 6.33311 7.55797 6.33311 8C6.33311 8.44203 6.5087 8.86595 6.82126 9.17851C7.13383 9.49107 7.55775 9.66667 7.99978 9.66667Z"
                              fill="#71717A"
                            />
                          </svg>
                        </div>
                        <div id="hide" className="hidden"></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 w-full">
                    <label
                      htmlFor="myInput"
                      className="text-sm font-medium leading-none text-gray-800"
                    >
                      Confirm Password
                    </label>
                    <div className="relative flex items-center justify-center">
                      <input
                        required
                        id="myInput"
                        name="confirmPassword"
                        onChange={handleChange}
                        type={showConfirmPass ? "text" : "password"}
                        placeholder="Enter Confirm Password"
                        className="bg-gray-200 border rounded text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                      />
                      <div
                        onClick={() => setShowConfirmPass(!showConfirmPass)}
                        className="absolute right-0 mt-2 mr-3 cursor-pointer"
                      >
                        <div id="show">
                          <svg
                            width={22}
                            height={22}
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M7.99978 2C11.5944 2 14.5851 4.58667 15.2124 8C14.5858 11.4133 11.5944 14 7.99978 14C4.40511 14 1.41444 11.4133 0.787109 8C1.41378 4.58667 4.40511 2 7.99978 2ZM7.99978 12.6667C9.35942 12.6664 10.6787 12.2045 11.7417 11.3568C12.8047 10.509 13.5484 9.32552 13.8511 8C13.5473 6.67554 12.8031 5.49334 11.7402 4.64668C10.6773 3.80003 9.35864 3.33902 7.99978 3.33902C6.64091 3.33902 5.32224 3.80003 4.25936 4.64668C3.19648 5.49334 2.45229 6.67554 2.14844 8C2.45117 9.32552 3.19489 10.509 4.25787 11.3568C5.32085 12.2045 6.64013 12.6664 7.99978 12.6667ZM7.99978 11C7.20413 11 6.44106 10.6839 5.87846 10.1213C5.31585 9.55871 4.99978 8.79565 4.99978 8C4.99978 7.20435 5.31585 6.44129 5.87846 5.87868C6.44106 5.31607 7.20413 5 7.99978 5C8.79543 5 9.55849 5.31607 10.1211 5.87868C10.6837 6.44129 10.9998 7.20435 10.9998 8C10.9998 8.79565 10.6837 9.55871 10.1211 10.1213C9.55849 10.6839 8.79543 11 7.99978 11ZM7.99978 9.66667C8.4418 9.66667 8.86573 9.49107 9.17829 9.17851C9.49085 8.86595 9.66644 8.44203 9.66644 8C9.66644 7.55797 9.49085 7.13405 9.17829 6.82149C8.86573 6.50893 8.4418 6.33333 7.99978 6.33333C7.55775 6.33333 7.13383 6.50893 6.82126 6.82149C6.5087 7.13405 6.33311 7.55797 6.33311 8C6.33311 8.44203 6.5087 8.86595 6.82126 9.17851C7.13383 9.49107 7.55775 9.66667 7.99978 9.66667Z"
                              fill="#71717A"
                            />
                          </svg>
                        </div>
                        <div id="hide" className="hidden"></div>
                      </div>
                    </div>
                  </div>
                </form>

                <button
                  onClick={handleSubmit}
                  className="focus:outline-none transition mt-6 w-full duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-4 sm:px-8 py-3 text-xs sm:text-sm"
                >
                  Change Password
                </button>

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
  );
}
