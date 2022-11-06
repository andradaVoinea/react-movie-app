import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.png";
import avatar from "../assets/avatar.png";

function Navbar() {
  //add scroll listener
  const [show, handleShow] = useState(false);
  const navigate = useNavigate();
  const handleClickProfile = () => {
    // 👇️ navigate programmatically
    navigate("/profile");
  };

  const handleClickMain = () => {
    navigate("/");
  };

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else handleShow(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => window.removeEventListener("scroll", transitionNavBar);
  }, []);

  return (
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
