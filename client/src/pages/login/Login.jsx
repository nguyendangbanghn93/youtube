import { useContext, useState } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/auth/AuthContext";
import { CircularProgress } from "@material-ui/core";
import useInput from "../../hooks/useInput";


export default function Login() {
  const [isFetching, setIsFetching] = useState(false);
  const {authActions:{loginUser}} = useContext(AuthContext);
  const emailInput = useInput((value) => value.includes("@"), { label: "Email", name: "email" });
  const passwordInput = useInput((value) => value.trim().length > 5, { label: "Password", name: "password", type: "password" });
  const input = { emailInput, passwordInput };
  const handleClick = (e) => {
    e.preventDefault();
    setIsFetching(true);
    loginUser({ email: emailInput.value, password: passwordInput.value });
    setIsFetching(false);
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
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Log In"
              )}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Create a New Account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
