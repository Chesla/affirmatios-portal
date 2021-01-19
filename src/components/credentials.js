/* eslint-disable complexity */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Alert } from "@material-ui/lab";
import {
    Card,
    CardHeader,
    CardContent,
    Grid,
    CircularProgress,
    Button
} from "@material-ui/core";
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import SchoolIcon from '@material-ui/icons/School';
import BusinessIcon from '@material-ui/icons/Business';
import {
  loginUser,
  loader
} from "../actions/userAction";
import {
    getAllCredentials,
    acceptCredential
} from "../actions/credentialAction";
import moment from "moment";
const Credentials = (props) => {
  const dispatch = useDispatch();
  const profileInfo = useSelector(
    (state) => state.user.profileInfo
  );
  const certificates = useSelector(
    (state) => state.credential.certificates
  );
  const showLoader = useSelector(
    (state) => state.user.loader
  );
  const errorMessage = useSelector(
    (state) => state.credential.errorMessage
  );
  const credentialAccepted = useSelector(
    (state) => state.credential.credentialAccepted
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
  const fetchAllCredentials = () => {
    dispatch(loader(true));
    dispatch(getAllCredentials());
  }
  useEffect(()=>{
    if(Object.keys(profileInfo).length === 0){
        login();
    }else{
        fetchAllCredentials();
    }
  },[]);
  useEffect(()=>{
    if(Object.keys(profileInfo).length !== 0){
        fetchAllCredentials();
    }
  },[profileInfo]);
  const setProfilePic = (type) => {
      type = type?.toLowerCase();
      switch(type){
        case "medical" : return <LocalHospitalIcon style={{ fontSize: 50 }}/>
        case "school" : return <SchoolIcon style={{ fontSize: 50 }}/>
        case "business" : return <BusinessIcon style={{ fontSize: 50 }}/>
        default : return null;
      }
  }
  const setCertificateType = (type) => {
    type = type?.toLowerCase();
    switch(type){
      case "medical" : return "COVID CERTIFICATE"
      case "school" : return "DEGREE CERTIFICATE"
      case "business" : return "EXPERIENCE LETTER"
      default : return null;
    }
  }
  const showCertificates = () => {
    return (certificates||[]).map((c)=>{
        return(
            <Grid item xs={6} md={4} key={c.id} style={{cursor:`${c.accept ? "pointer" : "none"}`}} 
                  onClick={()=>{
                    if(c.accept){
                      window.open(`/credentails/${c.id}/${c.type}`,'_blank')}
                    }
                  }>
                <div className="certificate-container">
                <Grid
                    container
                    spacing={2}
                    alignItems={"center"}
                    >
                    <Grid item xs={6} md={4}>
                        <div className="image-container">
                            {setProfilePic(c.type)}
                        </div>
                        {!c.accept ?
                                <Button variant="contained"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    dispatch(loader(true));
                                    dispatch(acceptCredential(c.credential_exchange_id));
                                  }}>
                                  ACCEPT
                                </Button>
                              :
                              null
                          }
                    </Grid>
                    <Grid item xs={6} md={8}>
                        <Grid
                            container
                            spacing={2}
                            alignItems={"center"}
                        >
                            <Grid item xs={6} md={12}>
                                <div className="certificate-issuer">
                                    {c.name}
                                </div>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <div className="certificate-name">
                                    {setCertificateType(c.type)}
                                </div>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <div className="certificate-issued-on">
                                    {`Issued on: ${moment(c.date).format("MMMM Do YYYY")}`}
                                </div>
                            </Grid>
                            
                        </Grid>
                    </Grid>
                </Grid>
                </div>
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
        {credentialAccepted &&  <Alert severity="success">Credential Accepted Successfully</Alert>}
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <Card className="layout-card">
          <CardHeader title={"Credentials"}/>
          <CardContent className="certificate-grid">
          {certificates === null || certificates.length === 0? 
            <div>No Credentials Available.</div>
            :
            <Grid
              container
              spacing={2}
              alignItems={"center"}
              justify="flex-start"
            >
                {showCertificates()}
            </Grid>
          }
          </CardContent>
        </Card>
    </React.Fragment>
  );
};

export default Credentials;
