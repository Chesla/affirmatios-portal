/* eslint-disable complexity */
import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "../constants";
import { Typography, CssBaseline, Box, Container} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';


const Header = (props) => {
    const profileInfo = useSelector(
        (state) => state.user.profileInfo
    );
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
                {profileInfo.agentType?.toLowerCase() === "person" ?
                <Link to="/credentails" className="nav-bar-items">
                    <Typography variant="h6">Credentials</Typography>
                </Link>
                :
                <Link to="/issuecredentails" className="nav-bar-items">
                    <Typography variant="h6">Issue Credentials</Typography>
                </Link>
                }
                <Link to="/notifications" className="nav-bar-items">
                    <Typography variant="h6">Notifications</Typography>
                </Link>
                <div className="user-profile">
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={()=>props.history.push("/profile")}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
        {/* <Container>
            <Box my={2}>
            {[...new Array(12)]
                .map(
                () => `Cras mattis consectetur purus sit amet fermentum.
                    Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                    Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                    Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
                )
                .join('\n')}
            </Box>
        </Container> */}
      </ThemeProvider>
    );
};
export default Header;


