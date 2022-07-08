import React, { useState, useEffect } from "react";
import FormField from "../formField/FormField";
import MainButton from "../mainButton/MainButton";
import validate from "../../helpers/validationHelper";
import { toast } from "react-toastify";

function Form(props) {
  const [fields, setFields] = useState(props.fields);
  const [mainError, setMainError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setFields(props.fields);
    }
  }, [props.fields]);

  const setValue = (key, value, isMultiple = false) => {
    const fieldsTemp = { ...fields };

    fieldsTemp[key].value = value;
    fieldsTemp[key].error = !validate(fieldsTemp[key].mainType, true, value);

    setFields(fieldsTemp);
  };

  const submit = async () => {
    let data = {};
    const fieldsTmp = { ...fields };
    let validationRes = true;

    for (let key in fields) {
      data[key] = {};
      data[key].value = fields[key].value;
      data[key].type = fields[key].mainType;

      if (fields[key].mainType === "hidden") {
        continue;
      }
      let isValid = validate(fields[key].mainType, true, fields[key].value);
      if (!isValid) {
        fieldsTmp[key].error = true;
        validationRes = false;
      } else {
        fieldsTmp[key].error = false;
      }
    }
    if (!validationRes) {
      setFields(fieldsTmp);
      return;
    }
    setIsLoading(true);

    for (let key in data) {
      data[key] = data[key].value;
    }

    try {
      const responseData = await props.submitHandle(data);
      if (responseData) {
        const invalidFields = responseData.errors;
        if (invalidFields) {
          for (let field in fieldsTmp) {
            fieldsTmp[field].error = false;
          }
          for (let errorField of invalidFields) {
            fieldsTmp[errorField].error = true;
          }
          setFields(fieldsTmp);
        }
        setMainError(props.errorMap[responseData.serverError]);
      }
    } catch (error) {
      toast.error("Try again later");
    }

    setIsLoading(false);
  };

  const fieldsComponents = [];
  for (let fieldKey in fields) {
    const content = fields[fieldKey];
    let error;
    if (content.error) {
      if (content.id === "password" && props.passwordError) {
        error = props.passwordError;
      } else {
        error = `Invalid ${content.id}`;
      }
    }

    let comp;
    if (content.type === "button") {
      comp = (
        <MainButton
          key={content.id}
          isDisabled={content.isDisabled}
          content={content.text}
          buttonClass={content.isDisabled ? "disabled" : content.buttonClass}
          containerClass={"form-action"}
          callback={() => {
            content.submit();
          }}
        />
      );
    } else {
      comp = (
        <FormField
          isDisabled={content.isDisabled || false}
          min={content.min}
          errorText={error}
          text={content.text}
          type={content.type}
          label={content.label || ""}
          value={content.value || ""}
          key={`${props.type}${content.id}`}
          callback={(e) => setValue(fieldKey, e.target.value)}
        />
      );

      fieldsComponents.push(comp);
    }
  }

  return (
    <div className="form-body">
      <h2>{props.title}</h2>
      <h3>{props.text}</h3>
      <div className="fields">
        <div>{fieldsComponents}</div>
      </div>
      <div className="button-wrapper">
        <MainButton
          content={props.button}
          buttonClass={props.buttonClass}
          isLoading={isLoading}
          callback={() => submit()}
        />
      </div>
      <div className="server-error">
        <span>{mainError}</span>
      </div>
    </div>
  );
}

export default Form;
