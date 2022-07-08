import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <div className="rightFooter">
        <FontAwesomeIcon icon={faPhone} />
        054-8355584
        <div className="email">
          <FontAwesomeIcon icon={faEnvelope} />
          yummly@gmail.com
        </div>
      </div>
      <div className="leftFooter">
        <NavLink className="logo" activeclassname="active" to="/">
          Yummly
          <FontAwesomeIcon icon={faUtensils} />
        </NavLink>
        <div className="copyright">&copy; Ravid Azulay</div>
      </div>
    </div>
  );
};

export default Footer;
