import React, { useEffect, useState } from "react";
import { getCard } from "../services/cardService";
import { useParams } from "react-router-dom";
import LikesIndicator from "../components/LikesIndicator/LikesIndicator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import MainButton from "../components/mainButton/MainButton";
import { getCurrentUser } from "../services/userService";
import AddRecipe from "../components/Popups/AddRecipe";
import ConfirmModal from "../components/Popups/ConfirmModal";
import { deleteCard } from "../services/cardService";
import { toast } from "react-toastify";

const Recipe = (props) => {
  const user = getCurrentUser();
  const [details, setDetails] = useState({});
  const [isMyCard, setIsMyCard] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [addRecipeOpen, setAddRecipeOpen] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetchCard();
  }, []);

  useEffect(() => {
    setIsMyCard((user && user?._id === details?.user_id) ?? false);
  }, [details]);

  const fetchCard = () => {
    getCard(id)
      .then(({ data }) => {
        setDetails(data);
      })
      .catch(() => {
        toast.error("Try again later");
      });
  };

  const renderSteps = (step, index) => {
    return (
      <div className="step">
        <span className="index">{`${index + 1}.`}</span>
        <span>{step}</span>
      </div>
    );
  };

  const renderIngredients = (ingredient) => {
    return (
      <div className="ingredient">
        <FontAwesomeIcon className="ingredientDot" icon={faCircle} />
        <span>{ingredient}</span>
      </div>
    );
  };

  const deleteRecipe = async (confirm) => {
    if (confirm) {
      try {
        await deleteCard(details._id);
        toast.success("The recipe deleted successfully");
        setTimeout(() => {
          window.location.href = "http://localhost:3000/";
        }, 1500);
      } catch (error) {
        toast.error("Try again later");
      }
    }
    setIsConfirmModalOpen(false);
  };

  const hasEditAccess = () => {
    return isMyCard || user?.isAdmin;
  };

  const recipeString = () => {
    return `Hey! I am sharing with you a recipe%0D%0D${details?.title}:%0D${
      details?.description
    }%0D%0DIngredients:%0D-  ${details.ingredients?.join(
      "%0D-  "
    )}%0D%0DSteps:%0D${details.steps?.join("%0D")}%0D%0D
    `;
  };

  const getImg = (url) => {
    const linkRegex = /\b(https?:\/\/.*?\.[a-z]{2,4}\/[^\s]*\b)/g;
    if (url?.match(linkRegex)) {
      return url;
    }

    return "https://images.pexels.com/photos/8844888/pexels-photo-8844888.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
  };

  const date = new Date(details.createdAt);
  return (
    <div className={"recipeContainer p-5"}>
      <img src={getImg(details.image?.url)} alt={details.image?.alt} />
      <div className="main">
        <div className="recipeHeader">
          <h2>{details.title}</h2>
          <span>{date.toLocaleDateString()}</span>
          <LikesIndicator likes={details.likes ?? []} id={details._id} />
          {hasEditAccess() && (
            <MainButton
              key={"edit"}
              isDisabled={false}
              content={"Edit"}
              buttonClass={"edits main-button"}
              containerClass={"form-action"}
              icon={"edit"}
              callback={() => {
                setAddRecipeOpen(true);
              }}
            />
          )}
          {hasEditAccess() && (
            <MainButton
              key={"delete"}
              isDisabled={false}
              content={"Delete"}
              buttonClass={"edits main-button"}
              containerClass={"form-action"}
              icon={"delete"}
              callback={() => {
                setIsConfirmModalOpen(true);
              }}
            />
          )}
          <a
            href={`mailto:?body=${recipeString()}&subject=Recipe from yummly`}
            target="_blank"
          >
            <MainButton
              key={"share"}
              isDisabled={false}
              content={"Share"}
              buttonClass={"edits main-button"}
              containerClass={"form-action"}
              icon={"share"}
              callback={() => {}}
            />
          </a>
        </div>
        <h3>{details.description}</h3>
        <div className="info">
          {details.ingredients?.length > 0 && (
            <div className="ingredients">
              <h3 className="ingridientHeader">Ingredients</h3>
              {details.ingredients?.map(renderIngredients)}
            </div>
          )}
        </div>
        {details.steps?.length > 0 && (
          <div className="steps">
            <h3 className="stepHeader">Steps</h3>
            {details.steps?.map(renderSteps)}
          </div>
        )}
      </div>
      <AddRecipe
        isOpen={addRecipeOpen}
        edit={true}
        recipe={{
          title: details?.title ?? "",
          description: details?.description ?? "",
          ingredients: details?.ingredients ?? [],
          steps: details?.steps ?? [],
          image: details.image?.url ?? "",
        }}
        _id={details._id}
        onClose={() => {
          setAddRecipeOpen(false);
          fetchCard();
        }}
      />
      <ConfirmModal submit={deleteRecipe} isOpen={isConfirmModalOpen} />
    </div>
  );
};

export default Recipe;
