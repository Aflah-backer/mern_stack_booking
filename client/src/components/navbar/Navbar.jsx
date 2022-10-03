import "./navbar.scss";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext ";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";


// const navigate = useNavigate()
const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const toVender =e =>{
    axios.get("http://localhost:3002")
    console.log("hello");
    // navigate("/")
  }
  const logout = (e) => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "black", textDecoration: "none" }}>
          <span className="logo"><h4>Booking.ml</h4></span>
        </Link>
        {user ? (
          <span className="rUserName">
            <h4 className="dropdown-menu">
              hello..{user.username} <FontAwesomeIcon icon={faCaretDown} />
            </h4>
            <a>
              <ul>
                <li>Profile</li>
                <li onClick={toVender}>become seller</li>
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
