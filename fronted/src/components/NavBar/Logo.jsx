import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";

const Logo = (props) => {
  return (
    <div className="logo">
      <NavLink className="logoHeader" activeclassname="active" to="/">
        Yummly
        <FontAwesomeIcon icon={faUtensils} />
      </NavLink>
    </div>
  );
};

export default Logo;
