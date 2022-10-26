import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import SingleHotel from "./pages/singleHotel/SingleHotel";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext ";
import { hotelColumns, roomColumns, userColumns } from "./datatablesource";
import NewHotel from "./pages/newHotel/NewHotel";
import NewRoom from "./pages/newRoom/NewRoom";
import Signup from "./pages/signup/Signup";
import BeforeApprovel from "./pages/beforeApprovel/BeforeApprovel";
import SingleRoom from "./pages/singleRoom/SingleRoom";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const ProductedRoute = ({ children }) => {
    const { vender } = useContext(AuthContext);
    if (!vender) {
      return <Navigate to="/login" />;
    }
    if (!vender.isAproved) {
      return <Navigate to="/beforeApproved" />;
    }
    return children;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="beforeApproved" element={<BeforeApprovel />} />
            <Route
              index
              element={
                <ProductedRoute>
                  <Home />
                </ProductedRoute>
              }
            />
            <Route path="users">
              <Route
                index
                element={
                  <ProductedRoute>
                    <List columns={userColumns} />
                  </ProductedRoute>
                }
              />
              <Route
                path=":userId"
                element={
                  <ProductedRoute>
                    <Single />
                  </ProductedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProductedRoute>
                    <New inputs={userInputs} title="Add New User" />
                  </ProductedRoute>
                }
              />
            </Route>
            <Route path="hotels">
              <Route
                index
                element={
                  <ProductedRoute>
                    <List columns={hotelColumns} />
                  </ProductedRoute>
                }
              />
              <Route
                path=":dataId"
                element={
                  <ProductedRoute>
                    <SingleHotel />
                  </ProductedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProductedRoute>
                    <NewHotel />
                  </ProductedRoute>
                }
              />
            </Route>
            <Route path="rooms">
              <Route
                index
                element={
                  <ProductedRoute>
                    <List columns={roomColumns} />
                  </ProductedRoute>
                }
              />
              <Route
                path=":dataId"
                element={
                  <ProductedRoute>
                    <SingleRoom />
                  </ProductedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProductedRoute>
                    <NewRoom />
                  </ProductedRoute>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
