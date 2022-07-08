import React from "react";
import RecipeCard from "./RecipeCard";

const RecipesCards = (props) => {
  const renderRecipes = () => {
    return props.recipes?.map((card) => (
      <RecipeCard key={card._id} {...card} onChange={props.onChange} />
    ));
  };

  const renderNoRecipes = () => {
    return <div>No recipes</div>;
  };

  return (
    <div className="recipesCards">
      {props.recipes?.length === 0 ? renderNoRecipes() : renderRecipes()}
    </div>
  );
};

export default RecipesCards;
