import { useState } from "react";
import Form from "../components/form/Form";
import { Link } from "react-router-dom";
import { signIn } from "../services/userService";

function Login(props) {
  const [validate, setValidate] = useState();

  const submit = async (user) => {
    try {
      await signIn(user);
      window.location.href = "http://localhost:3000/";
    } catch (error) {
      if (error.response && error.response.status === 400)
        setValidate(error.response.data);
    }
  };

  const login = {
    submitHandle: submit,
    type: "signin",
    title: "Welcome Back!",
    buttonTitle: "Log In",
    buttonClass: "main-button",
    errorMap: {
      serverError: "Try again later",
      IncorrectMailOrPassword: "Incorrect mail or password",
    },
    fields: {
      email: {
        label: validate,
        text: "Email",
        id: "mail",
        error: false,
        mainType: "mail",
        type: "text",
      },
      password: {
        text: "Password",
        id: "password",
        error: false,
        mainType: "password",
        type: "password",
      },
    },
  };

  var formClasses = "form-container login small";

  return (
    <div className="p-5">
      <div className="box-wrapper">
        <div className={formClasses}>
          <Form
            className="form-body"
            fields={login.fields}
            title={login.title}
            submitHandle={login.submitHandle}
            type={login.type}
            errorMap={login.errorMap}
            button={login.buttonTitle}
            buttonClass={login.buttonClass}
          />
          <div className="links">
            <Link className="linkto" to="/signup">
              I don't have an account
            </Link>
            <Link className="linkto" to="/resetPassword">
              Forgot password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
