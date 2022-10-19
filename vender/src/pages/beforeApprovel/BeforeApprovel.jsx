import { Button, CssBaseline } from "@mui/material";
import Spinner from "react-spinner-material";
import CircularProgress from "@mui/joy/CircularProgress";
import { Box, Container } from "@mui/system";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { AuthContext } from "../../context/AuthContext ";
import "./beforeApprovel.scss";

function BeforeApprovel() {
  const navigate = useNavigate();
  const { dispatch, vender } = useContext(AuthContext);
  const handleClick = (e) => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };
  return (
    <>
      <Navbar />
      <React.Fragment>
        <CssBaseline />
        <Container>
          <Box sx={{ bgcolor: "#ededed", height: "94.9vh" }}>
            <div className="spinner">
              <h1>welcome</h1>
              <h3>{vender.name}</h3>
              <Spinner radius={120} color={"#333"} stroke={9} visible={true} />
              <h3>Processing..</h3>
              <h3>Tomorrow your account will activated</h3>
              <h3>Logout and try later</h3>
              <button className="btnlogout" onClick={handleClick} >Logout</button>
            </div>
          </Box>
        </Container>
      </React.Fragment>
    </>
  );
}

export default BeforeApprovel;
