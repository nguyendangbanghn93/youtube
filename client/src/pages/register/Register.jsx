// import axios from "axios";
import { AuthContext } from "../../context/auth/AuthContext";

import "./register.css";
// import { useHistory } from "react-router";
import useInput from "../../hooks/useInput";
import { useContext } from "react";
export default function Register() {
  const { authActions} = useContext(AuthContext);
  // const history = useHistory();
  const usernameInput = useInput((value) => value.length > 3, { label: "Username", name: "username" });
  const emailInput = useInput((value) => value.includes("@"), { label: "Email", name: "email" });
  const passwordInput = useInput((value) => value.trim().length > 5, { label: "Password", name: "password", type: "password" });
  const passwordAgainInput = useInput((value) => passwordInput.value === value, { label: "Password again", name: "passwordAgain", type: "password" });
  const input = { usernameInput, emailInput, passwordInput, passwordAgainInput };
  
  const handleClick = async (e) => {
    e.preventDefault();
    if (!(usernameInput.isValid && emailInput.isValid && passwordInput.isValid && passwordAgainInput.isValid)) {
      console.log("loi roi");
    } else {
      const user = {
        username: usernameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
      };
      try {
        authActions.registerUser(user);
        // await axios.post("/auth/register", user);
        // history.push("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Phây búc</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Phây búc.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            {Object.keys(input).map(function (key) {
              return <input
                key={key}
                className={"loginInput " + (input[key].hasError ? "err" : "")}
                placeholder={input[key].label}
                onChange={input[key].changeHandler}
                onBlur={input[key].blurHandler}
                value={input[key].value}
                type={input[key].type}
              />
            })}
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <button className="loginRegisterButton">Log into Account</button>
          </form>
        </div>
      </div>
    </div>
  );
}
