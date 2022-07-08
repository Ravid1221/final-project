import { useEffect, useState } from "react";
import RecipesCards from "../components/Cards/RecipesCards";
import { getMyCards } from "../services/cardService";
import MainButton from "../components/mainButton/MainButton";
import AddRecipe from "../components/Popups/AddRecipe";
import { toast } from "react-toastify";

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [addRecipeOpen, setAddRecipeOpen] = useState(false);

  useEffect(() => {
    fetchCards();
  }, []);

  const onChange = () => {
    fetchCards();
  };

  const fetchCards = () => {
    getMyCards()
      .then(({ data }) => {
        setRecipes(data);
      })
      .catch((err) => {
        toast.error("Try again later");
      });
  };

  return (
    <>
      <div
        className="overAll overPages"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), var(--dark)), url("https://images.pexels.com/photos/8844888/pexels-photo-8844888.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")`,
          objectFit: "cover",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1>My recipes</h1>
      </div>
      <div className="p-5">
        <MainButton
          key={"addNew"}
          isDisabled={false}
          content={"Add Recipe"}
          buttonClass={"spacial-button"}
          containerClass={"addNewButton"}
          callback={() => {
            setAddRecipeOpen(true);
          }}
          icon="plus"
        />
        <AddRecipe
          isOpen={addRecipeOpen}
          onClose={() => {
            setAddRecipeOpen(false);
            fetchCards();
          }}
        />
        <RecipesCards recipes={recipes} onChange={onChange} />
      </div>
    </>
  );
};

export default MyRecipes;
