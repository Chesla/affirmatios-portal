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
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import SchoolIcon from '@material-ui/icons/School';
import BusinessIcon from '@material-ui/icons/Business';
import {
  loginUser,
  loader
} from "../actions/userAction";
const Profile = (props) => {
  const dispatch = useDispatch();
  // const roles = ["issuer", "holder", "verifier"];
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
  const setProfilePic = (type) => {
     type = type?.toLowerCase();
      switch(type){
        case "person" : return <PersonIcon style={{ fontSize: 200 }}/>
        case "medical" : return <LocalHospitalIcon style={{ fontSize: 200 }}/>
        case "school" : return <SchoolIcon style={{ fontSize: 200 }}/>
        case "business" : return <BusinessIcon style={{ fontSize: 200 }}/>
        default : return null;
      }
    
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
          <CardHeader title={`Hello ${profileInfo.firstLastName}`}/>
          <CardContent className="profile-grid">
            <Grid
              container
              spacing={2}
            >
                <Grid item xs={6} md={3}>
                    <div className="image-container">
                        {setProfilePic(profileInfo.type)}
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
                            value={profileInfo.DID}
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
                            value={profileInfo.email}
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
                            value={profileInfo.mobile}
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
                            value={(profileInfo.roles||[]).join(", ").toUpperCase()}
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
