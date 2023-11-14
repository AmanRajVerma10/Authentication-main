import { useState, useRef, useContext } from "react";
import {useHistory} from 'react-router-dom';

import classes from "./AuthForm.module.css";
import AuthContext from "../store/auth-context";

const AuthForm = () => {
  const history=useHistory();
  const authCtx=useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    setIsLoading(true);
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBqcpU3p6dLueO6WeEwF8iWiaYeVMCLWBk";
    } else {
      url="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBqcpU3p6dLueO6WeEwF8iWiaYeVMCLWBk";
    }
      fetch(
        url,
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication Failed";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          })
        }
      }).then(data=>{
        authCtx.login(data.idToken);
        history.replace('/');
      }).catch(err=>{
        alert(err.message);
      })
    }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passwordRef} />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Loading...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
