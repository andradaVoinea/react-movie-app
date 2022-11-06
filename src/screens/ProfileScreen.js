import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { selectUser } from "../features/userSlice";
import { auth } from "../firebase";
import "./ProfileScreen.css";
import avatar from "../assets/avatar.png";

function ProfileScreen() {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <div className="profileScreen">
      <Navbar />
      <div className="profileScreen_body">
        <h1>Edit profile</h1>
        <div className="profileScreen_info">
          <img src={avatar} alt="Avatar logo" />
          <div className="profileScreen_details">
            <h2>{user.email}</h2>
            <div className="profileScreen_plans">
              <h3>Plans (Current Plan: premium)</h3>
              <h2>Renewal date: 11/11/2023</h2>
              <button
                onClick={handleClick}
                className="profileScreen_watchNetflix"
              >
                Watch Netflix
              </button>
              <button
                onClick={() => auth.signOut()}
                className="profileScreen_signOut"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
