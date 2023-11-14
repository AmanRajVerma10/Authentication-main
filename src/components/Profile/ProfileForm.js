import AuthContext from "../store/auth-context";
import classes from "./ProfileForm.module.css";
import { useRef, useContext } from "react";
import {useHistory} from "react-router-dom";

const ProfileForm = () => {
  const authCtx = useContext(AuthContext);
  const history=useHistory();
  const passwordRef = useRef("");
  const submitHandler = (event) => {
    event.preventDefault();
    const newPassword = passwordRef.current.value;
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBqcpU3p6dLueO6WeEwF8iWiaYeVMCLWBk",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: newPassword,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      history.replace('/');
    });
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength="6"
          ref={passwordRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
