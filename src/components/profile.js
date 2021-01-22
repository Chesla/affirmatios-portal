/* eslint-disable complexity */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    Card,
    CardHeader,
    CardContent,
    Grid,
    TextField,
    CircularProgress,
} from "@material-ui/core";
import PersonIcon from '@material-ui/icons/Person';
import KIIT from "../images/kiitlogo.png";
import Manipal from "../images/manipallogo.jpeg";
import TCS from "../images/tcslogo.png";
import Walmart from "../images/walmart.png";


import {
  loginUser,
  loader
} from "../actions/userAction";
const Profile = (props) => {
  const dispatch = useDispatch();
  const profileInfo = useSelector(
    (state) => state.user.profileInfo
  );
  const showLoader = useSelector(
    (state) => state.user.loader
  );
  const login = () => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    if(username && password && Object.keys(profileInfo).length === 0){
        let param = {
            username,
            password,
        };
        dispatch(loader(true));
        dispatch(loginUser(param , "login"));
    }
  }
  useEffect(()=>{
    if(Object.keys(profileInfo).length === 0){
        login();
    }
  },[])
  const setProfilePic = () => {
    let type = process.env.REACT_APP_AGENT?.toLowerCase();
      switch(type){
        case "people" : return <PersonIcon style={{ fontSize: 200 }}/>
        case "medical" : return <img src={Manipal} width={230} height={160} alt="Manipal Hospitals"/>
        case "school" : return <img src={KIIT} width={230} height={160} alt="KIIT University"/>
        case "business" : return <img src={Walmart} width={230} height={160} alt="Walmart"/>
        default : return null;
      }
  }
  const setProfileName = () => {
    let type = process.env.REACT_APP_AGENT?.toLowerCase();
      switch(type){
        case "medical" : return "Manipal Hospitals"
        case "school" : return "KIIT University"
        case "business" : return "Walmart"
        default : return profileInfo.firstLastName;
      }
  }
  if(Object.keys(profileInfo).length===0){
    return null;
  }
  return (
    <React.Fragment>
      {showLoader ? (
        <div className={"loader-parent"}>
          <div className={"loader-container"}>
            <CircularProgress size={50} left={0} top={0} />
          </div>
        </div>
      ) : null}
        <Card className="layout-card">
          <CardHeader title={`Hello ${setProfileName()}`}/>
          <CardContent className="profile-grid">
            <Grid
              container
              spacing={2}
            >
                <Grid item xs={6} md={3}>
                    <div className="image-container">
                        {setProfilePic()}
                    </div>
                </Grid>
                <Grid item xs={6} md={3}>
                    <Grid
                    container
                    alignItems={"center"}
                    spacing={2}
                    >
                        <Grid item xs={12} md={12}>
                            <TextField
                            label="User Name"
                            id="username"
                            name="username"
                            defaultValue={profileInfo.DID}
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField
                            label="Email Id"
                            id="email"
                            name="email"
                            defaultValue={profileInfo.email}
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField
                            label="Mobile Number"
                            id="mobile"
                            name="mobile"
                            defaultValue={profileInfo.mobile}
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField
                            label="Roles Assigned"
                            id="roles"
                            name="roles"
                            defaultValue={(profileInfo.roles||[]).join(", ").toUpperCase()}
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="outlined"
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
          </CardContent>
        </Card>
      </React.Fragment>
  );
};

export default Profile;
