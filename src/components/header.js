/* eslint-disable complexity */
import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "../constants";
import { Typography, CssBaseline, Box, Container } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

const Header = (props) => {
  const profileInfo = useSelector((state) => state.user.profileInfo);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Link to="/" className="nav-bar-items">
            <Typography variant="h5">Affirmatios</Typography>
          </Link>
          <Link to="/connections" className="nav-bar-items">
            <Typography variant="h6">Connections</Typography>
          </Link>
          {process.env.REACT_APP_AGENT?.toLowerCase() === "people" ? (
            <Link to="/credentails" className="nav-bar-items">
              <Typography variant="h6">Credentials</Typography>
            </Link>
          ) : (
            <Link to="/issuecredentails" className="nav-bar-items">
              <Typography variant="h6">Issue Credentials</Typography>
            </Link>
          )}
          <Link to="/notifications" className="nav-bar-items">
            <Typography variant="h6">Notifications</Typography>
          </Link>
          <div className="user-profile">
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => props.history.push("/profile")}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};
export default Header;
