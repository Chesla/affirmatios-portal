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
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import SchoolIcon from '@material-ui/icons/School';
import BusinessIcon from '@material-ui/icons/Business';

const Header = (props) => {
  const portalFor = () => {
    let type = process.env.REACT_APP_AGENT?.toLowerCase();
    switch(type){
            case "medical" : return "secondary";
            case "school" : return "primary";
            case "business" : return "default";
            default : return "inherit";
    }
  }
  const portalHeaderFor = () => {
    let type = process.env.REACT_APP_AGENT?.toLowerCase();
    switch(type){
            case "medical" : return (<div className={"app-header-text"}>
                                        <span>{setProfilePic()}</span> Medical
                                     </div>);
            case "school" : return (<div className={"app-header-text"}>
                                        <span>{setProfilePic()}</span> Univeristy
                                    </div>);
            case "business" : return (<div className={"app-header-text"}>
                                        <span>{setProfilePic()}</span> Business
                                    </div>);
            default : return "Affirmatios";
    }
  }
  const setProfilePic = () => {
    let type = process.env.REACT_APP_AGENT?.toLowerCase();
      switch(type){
        case "medical" : return <LocalHospitalIcon style={{ fontSize: 60 }}/>
        case "school" : return <SchoolIcon style={{ fontSize: 60 }}/>
        case "business" : return <BusinessIcon style={{ fontSize: 60 }}/>
        default : return null;
      }
  }
  const setProfileName = () => {
    let type = process.env.REACT_APP_AGENT?.toLowerCase();
      switch(type){
        case "medical" : return "Manipal Hospitals"
        case "school" : return "KIIT University"
        case "business" : return "TCS"
        default : return <AccountCircle />;
      }
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" color={portalFor()}>
        <Toolbar>
          <Link to="/" className="nav-bar-items">
            <Typography variant="h5">{portalHeaderFor()}</Typography>
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
          {process.env.REACT_APP_AGENT?.toLowerCase() !== "people" ? (
            <Link to="/requestcredentials" className="nav-bar-items">
              <Typography variant="h6">Request Credentials</Typography>
            </Link>
          ):
          null
          }
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
                {setProfileName()}
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};
export default Header;
