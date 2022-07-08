import { useEffect, useState } from "react";
import MainButton from "../components/mainButton/MainButton";
import AddRecipe from "../components/Popups/AddRecipe";
import RecipesCards from "../components/Cards/RecipesCards";
import { getCards } from "../services/cardService";
import SearchBar from "../components/Cards/SearchBar";
import { getCurrentUser } from "../services/userService";
import { toast } from "react-toastify";

const HomePage = () => {
  const [addRecipeOpen, setAddRecipeOpen] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const user = getCurrentUser();

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = () => {
    getCards()
      .then(({ data }) => {
        setRecipes(data);
        setFilteredRecipes(data);
      })
      .catch((err) => {
        toast.error("Try again later");
      });
  };

  const onChange = () => {
    fetchCards();
  };

  const setFilterdRecipes = (filterd) => {
    setFilteredRecipes(filterd);
  };

  return (
    <>
      <div
        className="overAll"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), var(--dark)), url("https://images.pexels.com/photos/8844888/pexels-photo-8844888.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")`,
          objectFit: "cover",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1>The largest recipe site in the world</h1>
        <h3>Let's be impressed</h3>
      </div>
      <div className="p-5">
        <div>
          <SearchBar recipes={recipes} onChange={setFilterdRecipes} />
        </div>
        {user && (
          <div>
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
          </div>
        )}
        <AddRecipe
          isOpen={addRecipeOpen}
          onClose={() => {
            setAddRecipeOpen(false);
            fetchCards();
          }}
        />
        <RecipesCards recipes={filteredRecipes} onChange={onChange} />
      </div>
    </>
  );
};

export default HomePage;
