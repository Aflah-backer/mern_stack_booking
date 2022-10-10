import axios from "axios";
import React, {
  useContext,
  useLayoutEffect,
  useReducer,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext ";
import "./signup.scss";
function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("")
  const [password, setPassword] = useState("");

  const nameChange = (e) => {
    setName(e.target.value);
  };
  const emailChange = (e) => {
    setEmail(e.target.value);
  };
  const countryChange = (e) => {
    setCountry(e.target.value)
  }
  const cityChange = (e) => {
    setCity(e.target.value)
  }
  const mobileChange = (e) => {
    setMobile(e.target.value)
  }
  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  const INITIAL_STATE = {
    vender: null,
    loading: false,
    err: null,
  };
  const SignupReducer = (state, action) => {
    switch (action.type) {
      case "SIGNUP_START":
        return {
          vender: null,
          loading: true,
          err: null,
        };
      case "SIGNUP_SUCCESS":
        return {
          vender: action.payload,
          loading: false,
          err: null,
        };
      case "SIGNUP_FAILURE":
        return {
          vender: null,
          loading: false,
          err: action.payload,
        };
      default:
        return state;
    }
  };

  const [state, signupDispatch] = useReducer(SignupReducer, INITIAL_STATE);

  const { loading, dispatch, } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleClick = async (e) => {
    signupDispatch({ type: "SIGNUP_START" });
    try {
      const res = await axios.post("/auth/register/vender ", {
        name: name,
        email: email, 
        country: country,
        city:city,
        phone: mobile,
        password: password,
      });
      signupDispatch({ type: "SIGNUP_SUCCESS", payload: res.data });
    } catch (err) {
      signupDispatch({ type: "SIGNUP_FAILURE", payload: err.response.data });
      // console.log(err.response.data.message);
    }
  };

  useLayoutEffect(() => {
    if (state.vender) {
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: state.vender,
      });

      navigate("/");
    }
  }, [state.vender]);

  return (
    <div className="page">
      <div className="signup">
        <h2 className="rTitle">Become a Seller</h2>
        <div className="form-outline mb-4">
          <input
            type="text"
            id="form3Example1cg"
            className="lInput"
            placeholder="Vender Name"
            onChange={nameChange}
          />
        </div>

        <div className="form-outline mb-4">
          <input
            type="email"
            id="form3Example3cg"
            placeholder="Your Email"
            className="lInput"
            onChange={emailChange}
          />
        </div>

        <div className="form-outline mb-4">
          <input
            type="text"
            id="form3Example3cg"
            placeholder="Country"
            className="lInput"
            onChange={countryChange}
          />
        </div>

        <div className="form-outline mb-4">
          <input
            type="text"
            id="form3Example3cg"
            placeholder="city"
            className="lInput"
            onChange={cityChange}
          />
        </div>

        <div className="form-outline mb-4">
          <input
            type="number"
            id="form3Example3cg"
            placeholder="Mobile Number"
            className="lInput"
            onChange={mobileChange}
          />
        </div>

        <div className="form-outline mb-4">
          <input
            type="password"
            id="form3Example4cg"
            placeholder="Password"
            className="lInput"
            onChange={passwordChange}
          />
        </div>

        <div className="d-flex justify-content-center">
          <button
            disabled={loading}
            onClick={handleClick}
            type="button"
            className="lButton"
          >
            Register
          </button>
        </div>
        <Link to="/login">
          {" "}
          <p className="rLinkTo" style={{ textDecoration: "none" }}>
            Have already an account?{" "}
          </p>
        </Link>
        {/* {err && <span className="fError">{err.message}</span>} */}
      </div>
    </div>
  );
}

export default Signup;
