import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  //add scroll listener
  const [show, handleShow] = useState(false);
  const navigate = useNavigate();
  const handleClickProfile = () => {
    // 👇️ navigate programmatically
    navigate("/profile");
  };

  const handleClickMain = () => {
    // 👇️ navigate programmatically
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
          src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
          alt="Netflix Logo"
        />
        <img
          onClick={handleClickProfile}
          className="nav_avatar"
          src="http://www.sewa.gov.ae/register.png"
          alt="Avatar Logo"
        />
      </div>
    </div>
  );
}

export default Navbar;
