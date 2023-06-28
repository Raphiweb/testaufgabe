import { useEffect, useState } from "react";
import UserInput from "../addtodos/UserInput";
import Button from "../button/Button";
import classes from "./Login.module.css";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isValidUsername, setIsValidUsername] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);

  const [usernameHasError, setUsernameHasError] = useState(false);
  const [passwordHasError, setPasswordHasError] = useState(false);

  useEffect(() => {
    checkValidity();
  }, [username, password]);

  const onInputChangeHandler = (event) => {
    if (event.target.id === "username") {
      setUsername(event.target.value);
    } else if (event.target.id === "password") {
      setPassword(event.target.value);
    }
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (isValidUsername && isValidPassword) {
      setUsername("");
      setPassword("");

      setUsernameHasError(false);
      setPasswordHasError(false);

      setIsValidUsername(false);
      setIsValidPassword(false);

      props.onLoginHandler();
      console.log("valid");
    } else {
      if (!isValidUsername) {
        setUsernameHasError(true);
      }
      if (!isValidPassword) {
        setPasswordHasError(true);
      }
    }
  };

  const checkValidity = () => {
    if (username.length >= 1) {
      setIsValidUsername(true);
      setUsernameHasError(false);
    } else {
      setIsValidUsername(false);
    }

    if (password.length >= 1) {
      setIsValidPassword(true);
      setPasswordHasError(false);
    } else {
      setIsValidPassword(false);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className={classes.loginForm}>
      <UserInput
        title="Username"
        id="username"
        description="Test: >= 1 Zeichen"
        onChangeHandler={onInputChangeHandler}
        hasError={usernameHasError}
      ></UserInput>
      <UserInput
        title="Password"
        id="password"
        description="Test: >= 1 Zeichen"
        onChangeHandler={onInputChangeHandler}
        hasError={passwordHasError}
      ></UserInput>
      <Button>Login</Button>
    </form>
  );
};

export default Login;
