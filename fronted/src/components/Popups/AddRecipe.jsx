import React, { useEffect, useState } from "react";
import Popup from "./Popup";
import { createCard, editCard } from "../../services/cardService";
import { isMobileWidth } from "../../helpers/screenHelper";
import { toast } from "react-toastify";

const AddRecipe = (props) => {
  const [validate, setValidate] = useState();
  const getInitForm = () => {
    if (props.edit) {
      return props.recipe;
    }

    return {
      title: "",
      description: "",
      ingredients: [""],
      steps: [""],
      image: "",
    };
  };

  const [form, setForm] = useState(getInitForm());

  useEffect(() => {
    setForm(getInitForm());
  }, [props.recipe]);

  const modalStyle = {
    width: isMobileWidth() ? "100vw" : 400,
    height: isMobileWidth() ? "100vh" : 600,
    boxShadow: "none",
    transition: "all 0.5s ease",
  };

  const handleIngredient = (e, i) => {
    const ingredientsClone = [...form.ingredients];

    ingredientsClone[i] = e.target.value;

    setForm({
      ...form,
      ingredients: ingredientsClone,
    });
  };

  const handleIngredientCount = () => {
    setForm({
      ...form,
      ingredients: [...form.ingredients, ""],
    });
  };

  const initForm = () => {
    setForm(getInitForm());
  };

  const isEmpty = (array) => {
    return array.every((element) => element === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.title ||
      !form.description ||
      !form.ingredients?.length > 0 ||
      isEmpty(form.ingredients) ||
      !form.steps?.length > 0 ||
      isEmpty(form.steps) ||
      !form.image
    ) {
      alert("Please fill out all fields");
      return;
    }

    try {
      if (props.edit) {
        await editCard({ ...form, _id: props._id });
        toast.success("The recipe edited successfully");
      } else {
        await createCard(form);
        toast.success("The recipe added successfully");
      }
      props.onClose();
      initForm();
    } catch (error) {
      console.log(error.response.data);
      console.log(error.response.status);
      if (error.response && error.response.status === 400)
        setValidate(error.response.data);
    }
  };

  const handleStep = (e, i) => {
    const stepsClone = [...form.steps];
    stepsClone[i] = e.target.value;
    setForm({
      ...form,
      steps: stepsClone,
    });
  };

  const handleStepCount = () => {
    setForm({
      ...form,
      steps: [...form.steps, ""],
    });
  };

  const onClose = () => {
    initForm();
    props.onClose();
  };

  return (
    <Popup
      isOpen={props.isOpen}
      className="AddRecipe"
      borderRadius="16px"
      style={modalStyle}
    >
      <div className="popupContent">
        <h2>{props.edit ? "Edit recipe" : "Add a new recipe"}</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Image Url</label>
            <input
              type="text"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              type="text"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>Ingredients</label>
            {form.ingredients.map((ingredient, i) => (
              <input
                type="text"
                key={i}
                value={ingredient}
                onChange={(e) => handleIngredient(e, i)}
              />
            ))}
            <button type="button" onClick={handleIngredientCount}>
              Add ingredient
            </button>
          </div>

          <div className="form-group">
            <label>Steps</label>
            {form.steps.map((step, i) => (
              <textarea
                type="text"
                key={i}
                value={step}
                onChange={(e) => handleStep(e, i)}
              />
            ))}
            <button type="button" onClick={handleStepCount}>
              Add step
            </button>
          </div>

          <span className="validateForm">{validate}</span>
          <div className="buttons">
            <button type="submit">Submit</button>
            <button type="button" className="remove" onClick={onClose}>
              Close
            </button>
          </div>
        </form>
      </div>
    </Popup>
  );
};

export default AddRecipe;
