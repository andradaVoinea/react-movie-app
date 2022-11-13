import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.png";
import avatar from "../assets/avatar.png";

function Navbar() {
  //add scroll listener
  //useSatet hook - the easy way of defining a variable inside React - knows when to re-render
  const [show, handleShow] = useState(false);

  const navigate = useNavigate();

  const handleClickProfile = () => {
    // 👇️ navigate programmatically to specfic page
    navigate("/profile");
  };

  const handleClickMain = () => {
    navigate("/");
  };

  //display black Navbar only after scrolling 100px
  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else handleShow(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    //clean-up fuction
    return () => window.removeEventListener("scroll", transitionNavBar);
  }, []);
  //empty dependency brakets - the code will only run when the components mounts - only once

  return (
    //only render the nav_black (add the nav_black class) when the show variable is true
    <div className={`nav ${show && "nav_black"}`}>
      <div className="nav_contents">
        <img
          onClick={handleClickMain}
          className="nav_logo"
          src={logo}
          alt="Netflix Logo"
        />
        <img
          onClick={handleClickProfile}
          className="nav_avatar"
          src={avatar}
          alt="Avatar Logo"
        />
      </div>
    </div>
  );
}

export default Navbar;
