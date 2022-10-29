import * as React from "react";
import Card from "@mui/material/Card";
import { Container } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext ";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Profile() {
  const [img, setImg] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [country, setCountry] = useState();
  const [city, setCity] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);

  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "upload");
      fetch("https://api.cloudinary.com/v1_1/dnjk3wwxu/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setImg(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
    }
  };
  const alldatas = { img, email, country, username, city, phone };
  const editButton = async () => {
    try {
      console.log(alldatas);
      const data = await axios.put(`/users/${user._id}`, alldatas);

      await dispatch({ type: "LOGOUT" });
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AppBar
        sx={{
          backgroundColor: "rgb(43, 48, 48)",
          width: "100%",
          height: "15vh",
        }}
      ></AppBar>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          height: "100vh",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <Card sx={{ maxWidth: 845 }}>
          <CardMedia
            component="img"
            height="140"
            image={user.img}
            alt="no images"
          />
          <CardContent>
            <div>
              <input
                type="file"
                p={1.5}
                accept="image/*"
                onChange={(e) => postDetails(e.target.files[0])}
              />
            </div>
            <label>User Name</label>
            <div>
              <input
                placeholder={user.username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <label>Email Address</label>
            <div>
              <input
                type="email"
                placeholder={user.email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <label>Mobile</label>
            <div>
              <input
                placeholder={user.phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <label>Country</label>
            <div>
              <input
                placeholder={user.country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <label>City</label>
            <div>
              <input
                placeholder={user.city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={editButton}>
              Edit
            </Button>
          </CardActions>
        </Card>
      </Container>
    </>
  );
}
