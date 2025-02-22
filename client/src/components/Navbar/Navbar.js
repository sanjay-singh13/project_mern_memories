import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AppBar, Typography, Toolbar, Avatar, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { googleLogout } from "@react-oauth/google";
import useStyles from "./styles";
import memories from "../../images/memories.png";

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loaction = useLocation();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  // const user = null;
  console.log(user);

  useEffect(() => {
    // JWT

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [loaction]);

  const logout = () => {
    googleLogout();
    dispatch({ type: "LOGOUT" });
    navigate("/auth");
    setUser(null);
  };
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/"
          className={classes.heading}
          variant="h2"
          align="center"
        >
          Memories
        </Typography>
        <img className={classes.image} src={memories} alt="icon" height="60" />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              // alt={user.decode.result.name}
              // src={user.result.imageUrl}
              src={user.result.picture}
            >
              {user.result.name.charAt(0)}
              {/* {user.decode.name.charAt(0)} */}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
              {/* {user.decode.name} */}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
