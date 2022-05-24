import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Container from "../Layout/Container";
import AccountMenu from "./AccountMenu";

function Header() {
  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <div className="">
      <Container
        component={
          <div className="flex py-4 px-2 justify-between">
            <div className="">
              <Link className="logo" to="/">
                Blog
              </Link>
            </div>
            <div className="flex gap-3">
              <ul className="flex gap-3 ">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">ABOUT US</Link>
                </li>
                <li>
                  <Link to="/contact">CONTACT US</Link>
                </li>
                <li>{!isAuthenticated && <Link to="/login">LOGIN</Link>}</li>
              </ul>
              <ul className="profileUl">
                <li>{<AccountMenu />}</li>
              </ul>
            </div>
          </div>
        }
      />
    </div>
  );
}

export default Header;
