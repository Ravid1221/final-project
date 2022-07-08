import { NavLink } from "react-router-dom";

const NavUser = ({ user }) => {
  return (
    <div>
      {!user && (
        <>
          <NavLink className="link" activeclassname="active" to="/login">
            Login
          </NavLink>
          <NavLink className="link" activeclassname="active" to="/signUp">
            Sign Up
          </NavLink>
        </>
      )}

      {user && (
        <div>
          {user.isAdmin && (
            <NavLink className="link" to="/">
              Admin
            </NavLink>
          )}
          <NavLink className="link" activeclassname="active" to="/logout">
            Logout
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default NavUser;
