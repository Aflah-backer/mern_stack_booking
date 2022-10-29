import "./navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext ";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faUser } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate()
  const { user, dispatch } = useContext(AuthContext);
  const logout = (e) => {
    dispatch({ type: "LOGOUT" });
  };
  
  const toProfile = () => {
    navigate("/profile")
  }
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "black", textDecoration: "none" }}>
          <span className="logo"><h4>Booking.ml</h4></span>
        </Link>
        {user ? (
          <span className="rUserName">
            <p className="dropdown-menu">
            <FontAwesomeIcon icon={faUser} />  {user.username} <FontAwesomeIcon icon={faCaretDown} />
            </p>
            <a>
              <ul>
                <li onClick={toProfile}>Profile</li>
                <li ><a href="http://localhost:3001/signup" target="black" style={{textDecoration:"none", color: "black"}}>Become a Seller</a></li>
                <li onClick={logout}>logout</li>
              </ul>
            </a>
          </span>
        ) : (
          <div className="navItems">
            <Link to="/signup">
              <button className="navButton text-dark">Register</button>
            </Link>
            <Link to="/login">
              <button className="navButton text-dark">Login</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
