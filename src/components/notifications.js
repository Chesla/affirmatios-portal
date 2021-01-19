/* eslint-disable complexity */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Alert } from "@material-ui/lab";
import {
    Card,
    CardHeader,
    CardContent,
    Grid,
    Button,
    CircularProgress,
} from "@material-ui/core";
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import SchoolIcon from '@material-ui/icons/School';
import BusinessIcon from '@material-ui/icons/Business';
import {
  loginUser,
  loader
} from "../actions/userAction";
import {
    getAllNotifications,
    actionOnNotification
} from "../actions/notificationActions";
const Notifications = (props) => {
  const dispatch = useDispatch();
  const profileInfo = useSelector(
    (state) => state.user.profileInfo
  );
  const notifications = useSelector(
    (state) => state.notification.notifications
  );
  const showLoader = useSelector(
    (state) => state.user.loader
  );
  const errorMessage = useSelector(
    (state) => state.notification.errorMessage
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
  const fetchAllNotifications = () => {
    let param = profileInfo.DID;
    dispatch(loader(true));
    dispatch(getAllNotifications(param));
  }
  useEffect(()=>{
    if(Object.keys(profileInfo).length === 0){
        login();
    }else{
        fetchAllNotifications();
    }
  },[]);
  useEffect(()=>{
    if(Object.keys(profileInfo).length !== 0){
        fetchAllNotifications();
    }
  },[profileInfo]);
  const setProfilePic = (type) => {
    type = type?.toLowerCase();
      switch(type){
        case "medical" : return <LocalHospitalIcon style={{ fontSize: 40 }}/>
        case "school" : return <SchoolIcon style={{ fontSize: 40 }}/>
        case "business" : return <BusinessIcon style={{ fontSize: 40 }}/>
        default : return null;
      }
  }
  const notificationAction = (e) => {
        let  notificationid = e.currentTarget.getAttribute("notificationid")
        let modifiedNotification = notifications.filter((f)=>{
          return f.requesterId !== notificationid
        })
        dispatch(loader(true));
        dispatch(actionOnNotification(modifiedNotification));
  }
  const showNotifications = () => {
    return (notifications||[]).map((n)=>{
        return(
            <Grid
              container
              spacing={2}
              alignItems={"center"}
              key={n.requesterId}
              className={"notifications-border"}
            >
                <Grid item xs={4} md={1}>
                    <div className="image-container">
                        {setProfilePic(n.requesterType)}
                    </div>
                </Grid>
                <Grid item xs={4} md={9}>
                    <Grid
                        container
                        spacing={2}
                        alignItems={"center"}
                    >
                        <Grid item xs={12} md={12}>
                            <div className="requester-name">
                                {n.requesterName}
                            </div>
                        </Grid> 
                        <Grid item xs={12} md={12}>
                            <div className="requester-info">
                                {n.requestedData && n.requestedData.message ? n.requestedData.message : ""}
                            </div>
                        </Grid> 
                        <Grid item xs={12} md={12}>
                            <div className="requester-time">
                                {`Requested on: ${n.requestedTime}`} 
                            </div>
                        </Grid> 
                    </Grid>
                </Grid>
                <Grid item xs={4} md={1}>
                    <Button
                        variant="contained"
                        className="full-width"
                        name="approve"
                        notificationid={n.requesterId}
                        onClick={notificationAction}
                    >
                        APPROVE
                    </Button>
                </Grid>
                <Grid item xs={4} md={1}>
                    <Button
                        variant="contained"
                        className="full-width"
                        name="reject"
                        notificationid={n.requesterId}
                        onClick={notificationAction}
                    >
                        REJECT
                    </Button>
                </Grid>
            </Grid>
        )
    })
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
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <Card className="layout-card">
          <CardHeader title={"Notifications"}/>
          <CardContent className="certificate-grid">
            {notifications === null || notifications.length === 0? 
            <div>No Notifications Available.</div>
            :
            showNotifications()}
          </CardContent>
        </Card>
    </React.Fragment>
  );
};

export default Notifications;
