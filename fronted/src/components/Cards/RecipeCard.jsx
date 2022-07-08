import { Link } from "react-router-dom";
import LikesIndicator from "../LikesIndicator/LikesIndicator";

const RecipeCard = ({ title, image, likes, _id, onChange }) => {
  const getImg = (url) => {
    const linkRegex = /\b(https?:\/\/.*?\.[a-z]{2,4}\/[^\s]*\b)/g;
    if (url?.match(linkRegex)) {
      return url;
    }

    return "https://images.pexels.com/photos/8844888/pexels-photo-8844888.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
  };
  return (
    <div className="recipeCard">
      <Link to={`/recipe/${_id}`}>
        <h3>{title}</h3>
      </Link>
      <img
        src={getImg(image?.url)}
        alt={image?.alt}
        // style={{
        //   backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.002), var(--darker)), url(${getImg(
        //     image?.url
        //   )})`,
        //   objectFit: "cover",
        //   backgroundSize: "cover",
        //   backgroundPosition: "center",
        // }}
      />
      <div className="LikesConteiner">
        <LikesIndicator
          color={"white"}
          likes={likes}
          id={_id}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default RecipeCard;
