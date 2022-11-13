import React, { useRef } from "react";
import { auth } from "../firebase";

import "./SignupScreen.css";

function SignupScreen() {
  //capture what is written in the email and pass fields
  const emailRef = useRef(null); //then attach them to the coresponding input
  const passwordRef = useRef(null);
  //in order not to do a typical refresh - any time a button is inside a form, it will refresh
  const register = (e) => {
    e.preventDefault();
    //when i hit the Sign Up button, I want to create an account with user and pass
    auth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        //log them in and give me some credentials for that user
        console.log(authUser);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="signupScreen">
      <form>
        <h1>Sign In</h1>
        <input ref={emailRef} type="email" placeholder="Email" />
        <input ref={passwordRef} type="password" placeholder="Password" />
        <button type="submit" onClick={signIn}>
          Sign In
        </button>
        <h4>
          <span className="signupScreen_gray">New to Netflix? </span>
          <span className="signupScreen_link" onClick={register}>
            Sign Up now.
          </span>
        </h4>
      </form>
    </div>
  );
}

export default SignupScreen;
