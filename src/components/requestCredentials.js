/* eslint-disable complexity */
import React, { useEffect, useState } from "react";
import Degree from './degree';
import Covid from './covid';
import Experience from './experience';
import { useSelector, useDispatch } from "react-redux";
import { Alert } from "@material-ui/lab";
import {
    Card,
    CardHeader,
    CardContent,
    Grid,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from "@material-ui/core";
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import SchoolIcon from '@material-ui/icons/School';
import BusinessIcon from '@material-ui/icons/Business';
import {
    loginUser,
    loader
  } from "../actions/userAction";
  import {
    getAlreadyRequestedCertificateDetails
  } from "../actions/credentialAction";
const RequestCredentials = (props) => {
    const dispatch = useDispatch();
    const profileInfo = useSelector(
        (state) => state.user.profileInfo
    );
    const errorMessage = useSelector(
        (state) => state.credential.errorMessage
    );
    const certificateAlreadyRequested  = useSelector(
        (state) => state.credential.certificateAlreadyRequested
    )
    const [showCredentialDialog, setShowCredentialDialog] = useState(false);
    const [credentialDataByAgent, setCredentialDataByAgent] = useState({});
    const [certificateType, setFetchedCertificateType] = useState("");
    const fetchRequestedCertificateDetails = () => {
        let param = {
            DID: profileInfo.DID,
            credentialId: props.match.params.identity
        }
        dispatch(loader(true));
        dispatch(getAlreadyRequestedCertificateDetails(param));
    }
    const credentialRequested = useSelector(
        (state) => state.credential.credentialRequested
    )
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
        }else{
            fetchRequestedCertificateDetails();
        }
    },[]);
    useEffect(()=>{
        if(Object.keys(profileInfo).length !== 0){
            fetchRequestedCertificateDetails();
        }
    },[profileInfo]);
    
    const showRequestedCredentials = () => {
        let type = certificateType;
        switch(type){
                case "medical" : return <Covid readFrom={credentialDataByAgent[type]}/>;
                case "school" : return <Degree readFrom={credentialDataByAgent[type]}/>;
                case "business" : return <Experience readFrom={credentialDataByAgent[type]}/>;
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
    const setProfilePic = (type) => {
        type = type?.toLowerCase();
        switch(type){
          case "medical" : return <LocalHospitalIcon style={{ fontSize: 50 }}/>
          case "school" : return <SchoolIcon style={{ fontSize: 50 }}/>
          case "business" : return <BusinessIcon style={{ fontSize: 50 }}/>
          default : return null;
        }
    }
    const setCredentialData = (type) =>{
        let credential  = credentialRequested["people"] || [];
        let obj = {};
        let certificateType ;
        if(type === "medical"){
            certificateType = "medical"
        }else if(type === "business"){
            certificateType = "experience"
        }else{
            certificateType = "degree"
        }
        for(let i=0;i<credential.length;i++){
            if(Object.keys(credential[i])[0] === certificateType){
                for(let j=0; j<Object.values(credential[i])[0].params.length;j++){
                    let param = Object.values(credential[i])[0].params[j];
                    if(credential[i][certificateType]){
                        for(let k=0 ;k<certificateAlreadyRequested?.length ;k++){
                            if(certificateAlreadyRequested[k].type === type){
                                obj[param] = certificateAlreadyRequested[k][param];
                            }
                        }
                    }
                }
            }
        }
        setCredentialDataByAgent({[type]:obj});
    }
    const showCredentials = () => {
        return (certificateAlreadyRequested||[]).map((c,index)=>{
            return(
                <Grid item xs={6} md={4} key={index} 
                        onClick={()=>{
                          setCredentialData(c.type);
                          setShowCredentialDialog(true);
                          setFetchedCertificateType(c.type);
                        }
                        }>
                    <div className="certificate-container">
                    <Grid
                        container
                        spacing={2}
                        alignItems={"center"}
                        >
                        <Grid item xs={6} md={3}>
                            <div className="image-container">
                                {setProfilePic(c.type)}
                            </div>
                        </Grid>
                        <Grid item xs={6} md={9}>
                            <Grid
                                container
                                spacing={2}
                                alignItems={"center"}
                            >
                                <Grid item xs={6} md={12}>
                                    <div className="certificate-issuer">
                                        {c.ownerName}
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <div className="certificate-name">
                                        {setCertificateType(c.type)}
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <div className="certificate-issued-on">
                                        {`Requested on: ${c.requestedOn}`} <div>(MM/DD/YYYY)</div>
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
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        
            <Card className="layout-card">
                <CardHeader title={` Details of ${props.match.params.name?.toUpperCase()}`}/>
                <CardContent className="certificate-grid">
                {certificateAlreadyRequested === null || certificateAlreadyRequested?.length === 0? 
                    <div>No Credentials Available.</div>
                    :
                    <Grid
                    container
                    spacing={2}
                    alignItems={"center"}
                    justify="flex-start"
                    >
                        {showCredentials()}
                    </Grid>
                }
                </CardContent>
                </Card>
                <Dialog
                    open={showCredentialDialog||false}
                    onClose={() => setShowCredentialDialog(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {showRequestedCredentials()}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained"
                            onClick={() => {
                                setShowCredentialDialog(false);
                                setCredentialDataByAgent({});
                                setFetchedCertificateType("");
                              }
                            }>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
      </React.Fragment>
    );
};

export default RequestCredentials;


