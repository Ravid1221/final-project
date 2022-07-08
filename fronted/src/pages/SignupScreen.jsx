import React, { useState } from "react";
import Form from "../components/form/Form";
import { register, signIn } from "../services/userService";
import { Link } from "react-router-dom";

function SignupScreen(props) {
  const [validate, setValidate] = useState();

  /**
   * Sends request to add user or to sign up new one
   * @param {Fields values} user
   * @returns the response from the server if the values aren't valid
   */
  const submit = async (user) => {
    try {
      await register(user);
      delete user.name;
      await signIn(user);
      window.location.href = "http://localhost:3000/";
    } catch (error) {
      console.log(error.response.data);
      if (error.response && error.response.status === 400)
        setValidate(error.response.data);
    }
  };

  const signup = {
    submitHandle: submit,
    type: "signup",
    title: "Let's get started!",
    buttonTitle: "Sign Up",
    errorMap: {
      serverError: "Try again later",
      userAlreadyExist: "User already exist",
    },
    buttonClass: "main-button",
    fields: {
      name: {
        label: validate,
        text: "Full Name",
        id: "name",
        type: "text",
        error: false,
        mainType: "name",
      },
      email: {
        text: "Email",
        id: "mail",
        type: "text",
        error: false,
        mainType: "mail",
      },
      password: {
        text: "Password",
        id: "password",
        type: "password",
        error: false,
        mainType: "password",
      },
    },
  };

  if (props.type === "newUser") {
    delete signup.fields.mail;
    delete signup.fields.business;
  }

  return (
    <div className="p-5">
      <div className="wrapper-container">
        <div className="wrapper">
          <div className="text-container">
            <h2>
              Simply Recipes is here to help you cook delicious meals with less
              stress and more joy
            </h2>
          </div>
          <div className="form-container">
            <Form
              className="form-body"
              fields={signup.fields}
              title={signup.title}
              submitHandle={signup.submitHandle}
              type={signup.type}
              errorMap={signup.errorMap}
              button={signup.buttonTitle}
              buttonClass={signup.buttonClass}
              passwordError="Password must include at least 4 numbers, a-z, A-Z, and one special sign and at least 8 characters"
            />
            {props.type !== "newUser" && (
              <div>
                <Link className="linkto" to="/login">
                  I already have an account
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupScreen;
