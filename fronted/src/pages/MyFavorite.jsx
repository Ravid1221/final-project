import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import RecipesCards from "../components/Cards/RecipesCards";
import { getLikedCards } from "../services/cardService";

const MyFavorite = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = () => {
    getLikedCards()
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
        <h1>My Favorites</h1>
      </div>
      <div className="p-5">
        <RecipesCards recipes={recipes} onChange={fetchCards} />
      </div>
    </>
  );
};

export default MyFavorite;
