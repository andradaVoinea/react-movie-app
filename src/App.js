import React, { useEffect } from "react";
import "./App.css";
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { login, logout } from "./features/userSlice";

function App() {
  const user = null;
  const dispatch = useDispatch();
  //listen to the users's login, store it in the browser and remember you are logged in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        //is logged in
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        //logged out
        dispatch(logout);
      }
    });
    return unsubscribe; //clean-up in order to not affect performance. If the component is ever to unmount we don't want to duplicate another listener, we want to detach the old one and attach a new one
  }, [dispatch]);
  return (
    <div className="app">
      <Router>
        {!user ? (
          <LoginScreen />
        ) : (
          <Routes>
            <Route exact path="/" element={<HomeScreen />} />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
