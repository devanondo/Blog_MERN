import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearError, register } from "../../actions/userAction";
import MetaData from "../../utils/MetaData";
import Container from "../Layout/Container";

export default function Register() {
  const [showpass, setShowPass] = useState(false);
  const [avatar, setAvatar] = useState("https://i.ibb.co/3CY8BNT/profile1.png");

  const [avatarPreview, setAvatarPreview] = useState(
    "https://i.ibb.co/3CY8BNT/profile1.png"
  );

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let location = useLocation();

  const redirect = location.search ? location.search.split("=")[1] : "/account";
  const { error, isAuthenticated, loading } = useSelector(
    (state) => state.user
  );

  const { name, email, password } = user;

  const handleLogin = (e) => {
    e.preventDefault();

    if (!avatar) {
      toast.error("Select Profile Picture", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
    let formData = new FormData();
    formData.append("file", avatar);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    if (email && password && name && avatar) {
      dispatch(register(formData));
    }
  };
  const registerDataChange = (e) => {
    //For preview avatar image
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(e.target.files[0]);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      dispatch(clearError());
    }
    if (isAuthenticated) {
      toast.success("Login Success", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      navigate(redirect);
    }
  }, [dispatch, error, isAuthenticated, navigate, redirect]);

  return (
    <Container
      component={
        <div>
          <MetaData title="User Login" description="User Login" />
          <div className="bg-indigo-50">
            <div className="px-4 md:py-12 py-9 2xl:mx-auto 2xl:container md:flex items-center justify-center">
              <div className="xl:w-1/3 md:w-1/2 lg:ml-16 ml-8 md:mt-0 mt-6">
                <div className="flex items-start mt-8">
                  <p className="sm:text-2xl text-xl leading-7 text-gray-600 pl-2.5">
                    Generating random paragraphs can be an excellent way for
                    writers to get their creative flow going at the beginning of
                    the day. The writer has no idea what topic the random
                    paragraph will be about when it appears
                  </p>
                </div>
                <div className="flex items-center pl-8 mt-10">
                  <div className="w-8 h-8">
                    <img
                      src="https://i.ibb.co/xLtZCRT/Mask-Group.png"
                      alt="profile picture"
                      className="w-full h-full"
                    />
                  </div>
                  <div className="ml-2">
                    <p className="text-sm font-medium leading-none text-gray-800">
                      Anita Jane
                    </p>
                    <p className="text-sm font-medium leading-none text-gray-600 mt-1 cursor-pointer hover:underline">
                      See profile
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white shadow-lg rounded xl:w-1/3 lg:w-5/12 md:w-1/2 w-full sm:px-6 sm:py-10 px-2 py-6">
                <p
                  tabIndex={0}
                  className="focus:outline-none py-4 text-2xl font-extrabold leading-6 text-gray-800"
                >
                  Register to your account
                </p>

                <form encType="multipart/form-data">
                  <div>
                    <label
                      htmlFor="avatar"
                      className="text-sm font-medium leading-none text-gray-800"
                    >
                      <div className="w-20 h-20 rounded-full">
                        <img src={avatarPreview} alt="" />
                      </div>
                    </label>
                    <input
                      required
                      id="avatar"
                      type="file"
                      name="avatar"
                      onChange={registerDataChange}
                      className="bg-gray-200 border rounded text-xs font-medium leading-none placeholder-gray-800 text-gray-800 py-3 w-full pl-3 mt-2"
                      placeholder="enter your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="name"
                      className="text-sm font-medium leading-none text-gray-800"
                    >
                      Name
                    </label>
                    <input
                      required
                      id="name"
                      type="text"
                      value={name}
                      name="name"
                      onChange={registerDataChange}
                      className="bg-gray-200 border rounded text-xs font-medium leading-none placeholder-gray-800 text-gray-800 py-3 w-full pl-3 mt-2"
                      placeholder="enter your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="text-sm font-medium leading-none text-gray-800"
                    >
                      Email
                    </label>
                    <input
                      required
                      id="email"
                      type="email"
                      name="email"
                      value={email}
                      onChange={registerDataChange}
                      className="bg-gray-200 border rounded text-xs font-medium leading-none placeholder-gray-800 text-gray-800 py-3 w-full pl-3 mt-2"
                      placeholder="enter email"
                    />
                  </div>
                  <div className="mt-6 w-full">
                    <label
                      htmlFor="myInput"
                      className="text-sm font-medium leading-none text-gray-800"
                    >
                      Password
                    </label>
                    <div className="relative flex items-center justify-center">
                      <input
                        required
                        id="myInput"
                        value={password}
                        name="password"
                        onChange={registerDataChange}
                        type={showpass ? "text" : "password"}
                        className="bg-gray-200 border rounded text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                      />
                      <div
                        onClick={() => setShowPass(!showpass)}
                        className="absolute right-0 mt-2 mr-3 cursor-pointer"
                      >
                        <div id="show">
                          <svg
                            width={16}
                            height={16}
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
                  <p
                    tabIndex={0}
                    className="focus:outline-none text-sm mt-4 font-medium leading-none text-gray-500"
                  >
                    Dont have account?
                    <Link
                      to="/login"
                      className="hover:text-gray-500 focus:text-gray-500 focus:outline-none focus:underline hover:underline text-sm font-medium leading-none text-gray-800 cursor-pointer"
                    >
                      Sign in here
                    </Link>
                  </p>
                  <div className="mt-8">
                    <button
                      onClick={handleLogin}
                      role="button"
                      className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full"
                      disabled={loading ? true : false}
                    >
                      Register my account
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
}
