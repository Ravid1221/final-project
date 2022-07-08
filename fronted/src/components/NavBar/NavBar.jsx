import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import NavUser from "./NavUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faBars } from "@fortawesome/free-solid-svg-icons";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const NavBar = ({ user }) => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const handleToggle = () => {
    setNavbarOpen(!navbarOpen);
  };

  useEffect(() => {
    function handleResize() {
      setNavbarOpen(false);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <nav className="header">
      <FontAwesomeIcon
        onClick={handleToggle}
        className={`hamburger ${navbarOpen ? "open" : "close"}`}
        icon={faBars}
      />
      <Logo />
      <div className={`mainLinks ${navbarOpen ? "hamburgerMenu" : ""}`}>
        <NavLink className="link" activeclassname="active" to="/">
          <FontAwesomeIcon icon={faHouse} />
          <span>Home</span>
        </NavLink>
        {user && (
          <NavLink className="link" activeclassname="active" to="/MyFavorite">
            <FontAwesomeIcon icon={faHeart} />
            <span>My Favorites</span>
          </NavLink>
        )}
        {user && (
          <NavLink className="link" activeclassname="active" to="/MyRecipes">
            <FontAwesomeIcon icon={faHeart} />
            <span>My Recipes</span>
          </NavLink>
        )}
        <NavLink className="link" activeclassname="active" to="/AboutUs">
          <FontAwesomeIcon icon={faCircleInfo} />
          <span>About Us</span>
        </NavLink>
      </div>
      <div className="navUser">
        <NavUser user={user} />
      </div>
    </nav>
  );
};

export default NavBar;
