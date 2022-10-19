import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext ";
import { Button, Popover, Typography } from "@mui/material";

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const { vender } = useContext(AuthContext)
  const handleClike =(e)=> {
     dispatch({ type: "TOGGLE" })
  }
  const logoutClick = (e) => {
    dispatch ({type: "LOGOUT"})
  }
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
        <div className="items">
          <div className="item">
            <Brightness4Icon className="icon"
            onClick={handleClike}/> 
          </div>
          <div className="item">
            <FullscreenExitOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <ListOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="avatar"
              {...bindTrigger(popupState)}
            />
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Typography sx={{ p: 2 }}>{vender.name}</Typography>
          </Popover>
        </div>
      )}
    </PopupState>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
