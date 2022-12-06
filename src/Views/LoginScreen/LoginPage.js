import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { emailValidation } from "utils/UtilityFunctions";
import { getLoginUser } from "Api Methods/Api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { tokenState } from "Redux/AuthSlice";
const LoginPage = () => {
  const [loginFormState, setLoginFormState] = useState({
    username: "",
    password: "",
    errors: {},
  });
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const goToSignInPage = () => {
    navigate("/signin");
  };
  // validation Function  On Submit
  const validationOnSubmitForm = () => {
    const error = {};
    const { username, password } = loginFormState;
    if (username.trim() === "") {
      error.username = "Please enter username";
    } else if (!emailValidation(loginFormState.username)) {
      error.username = "invaild username";
    }
    if (password.trim() === "") {
      error.password = "please enter password";
    }
    return Object.keys(error).length === 0 ? null : error;
  };
  // validation Function  for Onchange Function
  const validationOnChange = (e) => {
    const { name, value } = e.target;
    let errorMessage = "";
    if (name === "username") {
      if (value.trim() === "") {
        errorMessage = "Please enter username";
      } else if (!emailValidation(value)) {
        errorMessage = "invaild username";
      }
    } else if (name === "password") {
      if (value.trim() === "") {
        errorMessage = "Please enter username";
      }
    }
    return errorMessage;
  };
  //subMit Form
  const submitForm = (e) => {
    e.preventDefault();
    const errorsMessage = validationOnSubmitForm();
    setLoginFormState((prev) => ({
      ...prev,
      errors: errorsMessage || {},
    }));
    if (errorsMessage !== null) {
      return;
    }
    getLoginUser({ route: "users" })
      .then((res) => {
        //without Jwt perform this functionality
        const isUserExist = res.data.find((user) => {
          return (
            user.userEmail === loginFormState.username &&
            user.password === loginFormState.password
          );
        });
        if (isUserExist !== undefined) {
          dispatch(tokenState({ token: true, curentUser: isUserExist }));
          navigate("/dashboard");
        } else {
          toast.error("Email or Password are incorect");
        }
      })
      .catch(() => {});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const errorMessage = validationOnChange(e);
    const errorsValue = { ...loginFormState.errors };
    if (errorMessage) {
      errorsValue[name] = errorMessage;
    } else {
      delete errorsValue[name];
    }
    setLoginFormState((prev) => ({
      ...prev,
      [name]: value,
      errors: errorsValue,
    }));
  };
  const { username, password, errors } = loginFormState;
  return (
    <div className="b-login-container">
      <div className="b-login-container__formSection">
        <form onSubmit={submitForm}>
          <h1 className="b-login-container__header">Login Form</h1>
          <div className="b-login-container__textField">
            <label id="username">User Name</label>
            <input
              id="username"
              value={username}
              name="username"
              onChange={handleChange}
              type="email"
            />

            <p>{errors.username}</p>
          </div>
          <div className="b-login-container__textField">
            <label id="password">Password</label>
            <input
              id="password"
              value={password}
              name="password"
              onChange={handleChange}
              type="password"
            />
            <p>{errors.password}</p>
          </div>
          <button className="b-login-container__button" type="submit">
            Login
          </button>
          <button
            className="b-login-container__button"
            type="button"
            onClick={goToSignInPage}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
