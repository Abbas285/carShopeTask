import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { emailValidation } from "utils/UtilityFunctions";
import { getLoginUser, signInNewuser } from "Api Methods/Api";
import { toast } from "react-toastify";
const SignInPage = () => {
  const [signInForm, setSignInForm] = useState({
    userName: "",
    userEmail: "",
    password: "",
    errors: {},
  });
  const navigate = useNavigate();

  const goToLoginPage = () => {
    navigate("/");
  };
  const validationOnSubmitForm = () => {
    const error = {};
    const { userName, password, userEmail } = signInForm;

    if (password.trim() === "") {
      error.password = "please enter password";
    }
    if (userName.trim() === "") {
      error.userName = "please enter user name";
    }
    if (userEmail.trim() === "") {
      error.userEmail = "Please enter user Email";
    } else if (!emailValidation(userEmail)) {
      error.userEmail = "invaild user Email";
    }
    return Object.keys(error).length === 0 ? null : error;
  };
  const validationOnChange = (e) => {
    const { name, value } = e.target;
    let errorMessage = "";
    if (name === "userEmail") {
      if (value.trim() === "") {
        errorMessage = "Please enter user email";
      } else if (!emailValidation(value)) {
        errorMessage = "invaild user email";
      }
    } else if (name === "password") {
      if (value.trim() === "") {
        errorMessage = "Please enter username";
      }
    } else if (name === "userName") {
      if (value.trim() === "") {
        errorMessage = "Please enter user name";
      }
    }
    return errorMessage;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    const errorMessage = validationOnChange(e);
    const errorsValue = { ...signInForm.errors };
    if (errorMessage) {
      errorsValue[name] = errorMessage;
    } else {
      delete errorsValue[name];
    }
    setSignInForm((prev) => ({
      ...prev,
      [name]: value,
      errors: errorsValue,
    }));
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();
    const errorsMessage = validationOnSubmitForm();
    setSignInForm((prev) => ({
      ...prev,
      errors: errorsMessage || {},
    }));
    if (errorsMessage !== null) {
      return;
    }
    getLoginUser({ route: "users" })
      .then((res) => {
        const isUserExist = res.data.find((user) => {
          return user.userEmail === signInForm.userEmail;
        });
        if (isUserExist !== undefined) {
          toast.error("User Name already exist please go to login page");
        } else {
          let data = {
            userName: signInForm.userName,
            userEmail: signInForm.userEmail,
            password: signInForm.password,
          };
          signInNewuser({
            route: "users",
            data: data,
          })
            .then(() => {
              toast("New User created Successfully please go to login page ");
            })
            .catch(() => {
              toast.error("Something went wrong !");
            });
        }
      })
      .catch(() => {
        toast.error("Something went wrong !");
      });
  };
  const { userName, userEmail, password, errors } = signInForm;
  return (
    <div className="b-signIn-container">
      <div className="b-signIn-container__formSection">
        <form onSubmit={handleSubmitForm}>
          <h1 className="b-signIn-container__header">SignIn Form</h1>
          <div className="b-signIn-container__textField">
            <label id="userName"> Name</label>
            <input
              id="userName"
              name="userName"
              value={userName}
              onChange={handleChange}
            />
            <p>{errors.userName}</p>
          </div>
          <div className="b-signIn-container__textField">
            <label id="userEmail">Email</label>
            <input
              id="userEmail"
              name="userEmail"
              value={userEmail}
              type="email"
              onChange={handleChange}
            />
            <p>{errors.userEmail}</p>
          </div>
          <div className="b-signIn-container__textField">
            <label id="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={handleChange}
            />
            <p>{errors.password}</p>
          </div>
          <button className="b-signIn-container__button" type="submit">
            Sign Up
          </button>
          <button
            className="b-login-container__button"
            type="button"
            onClick={goToLoginPage}
          >
            Back To Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
