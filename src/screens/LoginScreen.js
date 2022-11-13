import React, { useState } from "react";
import "./LoginScreen.css";
import SignupScreen from "./SignupScreen";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import logo from "../assets/logo.png";

function LoginScreen() {
  const [signIn, setSignIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const { email, password } = formValues;
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) navigate("/");
  });

  return (
    <div className="loginScreen" showPassword={showPassword}>
      <div className="loginScreen_background">
        <img className="loginScreen_logo" src={logo} alt="Netflix logo" />
        <button onClick={() => setSignIn(true)} className="loginScreen_button">
          Sign In
        </button>
        <div className="loginScreen_gradient"></div>
      </div>
      <div className="loginScreen_body">
        {signIn ? (
          <SignupScreen />
        ) : (
          <>
            <h1>Unlimited films, TV programmes and more.</h1>
            <h2>Watch anywhere. Cancel at any time</h2>
            <h3>
              Ready to watch? Enter your e-mail to create or restart your
              membership
            </h3>
            <div className="loginScreen_input">
              <form>
                <input
                  type="email"
                  placeholder="Email address"
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      [e.target.name]: e.target.value,
                    })
                  }
                  name="email"
                  value={formValues.email}
                />
                {showPassword && (
                  <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        [e.target.name]: e.target.value,
                      })
                    }
                    name="password"
                    value={formValues.password}
                  />
                )}
                {!showPassword && (
                  <button
                    className="loginScreen_getStarted"
                    onClick={() => setShowPassword(true)}
                  >
                    Get Started
                  </button>
                )}
              </form>
              <button className="loginScreen_logIn" onClick={handleSignIn}>
                Sign Up
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default LoginScreen;
