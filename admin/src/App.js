import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext ";
import {
  hotelColumns,
  roomColumns,
  userColumns,
  vendersColumns,
} from "./datatablesource";
import NewHotel from "./pages/newHotel/NewHotel";
import NewRoom from "./pages/newRoom/NewRoom";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const ProductedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
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
            <Route path="venders">
              <Route
                index
                element={
                  <ProductedRoute>
                    <List columns={vendersColumns} />
                  </ProductedRoute>
                }
              />
              <Route
                path=":venderId"
                element={
                  <ProductedRoute>
                    <Single />
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
                path=":productId"
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
                path=":productId"
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
