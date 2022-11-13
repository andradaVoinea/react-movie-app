import React, { useEffect } from "react";
import "./App.css";
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./redux/userSlice";
import ProfileScreen from "./screens/ProfileScreen";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  //persistence - listen to the users's login, store it in the browser and remember you are logged in
  useEffect(() => {
    //clean-up function
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        //is logged in
        //to manipulate the state you dispatch a login/logout action
        dispatch(
          //push the user into the store
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        //logged out
        dispatch(logout());
      }
    });
    return unsubscribe; //clean-up in order to not affect performance. If the component is ever to unmount we don't want to duplicate another listener, we want to detach the old one and attach a new one
  }, [dispatch]);
  return (
    <div className="app">
      <Router>
        {/* if I don't have a user signed in, I want to render the LoginScreen, otherwise, I want to render the rest of the app */}
        {!user ? (
          <LoginScreen />
        ) : (
          <Routes>
            <Route exact path="/profile" element={<ProfileScreen />} />
            <Route exact path="/" element={<HomeScreen />} />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
