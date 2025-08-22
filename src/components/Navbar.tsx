import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { AuthContext, type IAuthContext } from "../App";
import { useContext } from "react";

function Navbar() {
  const { isAuth, setAuthState } = useContext<IAuthContext>(AuthContext);

  const logoutHandler = () => {
    localStorage.removeItem("accessToken");
    window.location.reload();
  };

  return (
    
      <AppBar position="static" sx={{ backgroundColor: "#183b1bff" }}>
       <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Find.com
        </Typography>
  
        <Button color="inherit" component={NavLink} to="/">
          Home
        </Button>
        <Button color="inherit" component={NavLink} to="/about">
              About Us
            </Button>
    
        {isAuth ? (
          <>
            <Button color="inherit" component={NavLink} to="/profile">
              Profile
            </Button>
            <Button color="inherit" component={NavLink} to="/questionset/list">
              QuestionSet
            </Button>
            
            <Button color="inherit" onClick={logoutHandler}>Logout</Button>
          </>
        ) : (
          <> 
          <Button color="inherit" component={NavLink} to="/register">
              Register
            </Button>
            <Button color="inherit" component={NavLink} to="/login">
              Login
            </Button>
          </>
        )}
        </Toolbar>
      </AppBar>
    
  );
}

export default Navbar;
