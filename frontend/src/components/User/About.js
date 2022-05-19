import React, { useState } from "react";
import ChangePassword from "./ChangePassword";

export default function About() {
  const [show, setShow] = useState(false);

  return (
    <>
      <form className="w-full bg-white">
        <h2
          role="heading"
          aria-label="enter Personal data"
          className="text-xl font-semibold leading-7 text-gray-800"
        >
          Personal Info
        </h2>
        <p className="text-sm font-light leading-none text-gray-600 mt-0.5">
          Your details and place of birth
        </p>
        <div className="mt-8 md:flex items-center">
          <div className="flex flex-col">
            <label className="mb-3 text-sm leading-none text-gray-800">
              Full name
            </label>
            <input
              type="name"
              tabIndex={0}
              aria-label="Enter first name"
              className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200"
              placeholder="Enter your name ..."
            />
          </div>
          <div className="flex flex-col md:ml-12 md:mt-0 mt-8">
            <label className="mb-3 text-sm leading-none text-gray-800">
              Phone number
            </label>
            <input
              type="number"
              tabIndex={0}
              aria-label="Enter phone number"
              className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200"
              placeholder="Enter your number ..."
            />
          </div>
        </div>
        <div className="mt-8 md:flex items-center">
          <div className="flex flex-col">
            <label className="mb-3 text-sm leading-none text-gray-800">
              Email Address
            </label>
            <input
              type="email"
              tabIndex={0}
              aria-label="Enter email Address"
              className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200"
              placeholder="@gmail.com"
            />
          </div>
          <div className="flex flex-col md:ml-12 md:mt-0 mt-8">
            <label className="mb-3 text-sm leading-none text-gray-800">
              Place of birth
            </label>
            <input
              type="text"
              tabIndex={0}
              aria-label="Enter place of birth"
              className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200"
              placeholder="Enter place of birth"
            />
          </div>
        </div>
        <div className="mt-8 md:flex items-end">
          <div className="flex flex-col">
            <label className="mb-3 text-sm leading-none text-gray-800">
              Date of birth
            </label>
            <input
              type="date"
              tabIndex={0}
              aria-label="Enter date of birth"
              className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200"
              defaultValue="28.03.1997"
            />
          </div>
          <button
            onClick={function (e) {
              e.preventDefault();
              setShow(true);
            }}
            className="flex flex-col text-white bg-indigo-500 rounded-sm md:ml-12 md:mt-0 mt-8 py-2 px-4"
          >
            Change Password
          </button>
        </div>

        <button
          role="button"
          aria-label="Next step"
          className="flex items-center justify-center py-2 px-7 focus:outline-none bg-white border rounded border-gray-400 mt-6 md:mt-8 hover:bg-gray-100  focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
        >
          <span className="text-sm font-medium text-center text-gray-800 capitalize">
            Next Step
          </span>
          <svg
            className="mt-1 ml-3"
            width={12}
            height={8}
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8.01 3H0V5H8.01V8L12 4L8.01 0V3Z" fill="#242731" />
          </svg>
        </button>
      </form>
      <ChangePassword shown={[show, setShow]} />
    </>
  );
}
