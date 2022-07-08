import Form from "../components/form/Form";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { resetPassword } from "../services/userService";

function ResetPasswordScreen(props) {
  const [validate, setValidate] = useState();
  const [isFormSubmitted, setFormSubmitted] = useState(false);

  /**
   * Sends request to reset the password
   * @param {mail} data
   * @returns the response if the mail is invalid
   */
  const submit = async (data) => {
    try {
      await resetPassword(data);
      window.location.href = "http://localhost:3000/login";
    } catch (error) {
      if (error.response && error.response.status === 400)
        setValidate(error.response.data);
    }
  };

  const reset = {
    submitHandle: submit,
    type: "forgot",
    title: "Reset Password",
    errorMap: {
      serverError: "Try again later",
    },
    buttonTitle: "Reset My Password",
    buttonClass: "main-button",
    fields: {
      email: {
        label: validate,
        text: "Email",
        id: "mail",
        error: false,
        mainType: "mail",
      },
      password: {
        text: "Old Password",
        id: "password",
        error: false,
        mainType: "password",
        type: "password",
      },
      newPassword: {
        text: "New Password",
        id: "new_password",
        error: false,
        mainType: "password",
        type: "password",
      },
    },
  };

  var formClasses = "form-container login small";

  /**
   * @returns the content of the page, depending on whether the form was submitted successfully.
   */
  const getPageContent = () => {
    if (isFormSubmitted) {
      return (
        <div className="successful-operation">
          <h2>Link to reset your password sent to your mail!</h2>
          <Link className="linkto" to="/login">
            Go to login
          </Link>
        </div>
      );
    } else {
      return (
        <div className="form-box">
          <Form className="form-body" button={reset.buttonTitle} {...reset} />
          <div className="links">
            <Link className="linkto" to="/signup">
              Create new account
            </Link>
            <Link className="linkto" to="/login">
              Back to login
            </Link>
          </div>
        </div>
      );
    }
  };

  return (
    <dic className="p-5">
      <div className="box-wrapper">
        <div className={formClasses}>{getPageContent()}</div>
      </div>
    </dic>
  );
}

export default ResetPasswordScreen;
