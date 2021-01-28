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
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import {
    loginUser,
    loader
  } from "../actions/userAction";
  import {
    getAlreadyRequestedCertificateDetails,
    verifyCredentials
  } from "../actions/credentialAction";
import moment from "moment";

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
    const [credentialState, setCredentialState] = useState("");
    const [credentialRequestType, setCredentialRequestType] = useState("");
    const fetchRequestedCertificateDetails = () => {
        dispatch(loader(true));
        dispatch(getAlreadyRequestedCertificateDetails());
        setInterval(()=>{
            dispatch(getAlreadyRequestedCertificateDetails());
        },4000);
    }
    const verifiedCredentials = useSelector(
        (state) => state.credential.verifiedCredentials
    )
    const [acceptedData, setAcceptedData] = useState(verifiedCredentials);
    const [exchangeId, setExchangeId] = useState("");
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
    useEffect(()=>{
        if(Object.keys(verifiedCredentials||{}).length !==0){
            setAcceptedData(verifiedCredentials);
        }
    },[verifiedCredentials])
    const setCertificateType = (type) => {
        switch(type){
          case "Proof of Health" : return "COVID CERTIFICATE"
          case "Proof of Education" : return "DEGREE CERTIFICATE"
          case "Proof of Employment" : return "EXPERIENCE LETTER"
          default : return null;
        }
    }
    const setProfilePic = (type) => {
        switch(type){
          case "Proof of Health" : return <LocalHospitalIcon style={{ fontSize: 50 }}/>
          case "Proof of Education" : return <SchoolIcon style={{ fontSize: 50 }}/>
          case "Proof of Employment" : return <BusinessIcon style={{ fontSize: 50 }}/>
          default : return null;
        }
    }
    const showCredentials = () => {
        return (certificateAlreadyRequested||[]).map((c,index)=>{
            let rejected = false;
            let obj = {};
            let cs = "";
            if(c.presentation && c.presentation.requested_proof){
                if(Object.keys(c.presentation.requested_proof.unrevealed_attrs || {}).length){
                    rejected = true;
                }
                if(Object.keys(c.presentation.requested_proof.revealed_attrs || {}).length){
                    let req = c.presentation_request.requested_attributes;
                    let reveal = c.presentation.requested_proof.revealed_attrs;
                    
                    for(let i in reveal){
                        obj[req[i].name]= reveal[i].raw
                    }
                }

            }
            if(c.state=== "request_sent"){
                cs="PENDING";
            }else if(c.state=== "presentation_received" && !rejected){
                cs="VERIFY";
            }
            else if(c.state=== "presentation_received" && rejected){
                cs="REJECTED";
            }else if(c.state=== "verified"){
                cs="VERIFIED";
            }
            return(
                <Grid item xs={6} md={4} key={index}>
                    <div className="certificate-container">
                    <Grid
                        container
                        spacing={2}
                        alignItems={"center"}
                        >
                        <Grid item xs={6} md={3}>
                            <div className="image-container">
                                {setProfilePic(c.presentation_request.name)}
                            </div>
                            
                        </Grid>
                        <Grid item xs={6} md={9}>
                            <Grid
                                container
                                spacing={2}
                                alignItems={"center"}
                            >
                                <Grid item xs={12} md={12}>
                                    <div className="certificate-name">
                                        {setCertificateType(c.presentation_request.name)}
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <div className="certificate-issued-on">
                                        {`Requested on: ${moment(c.date).format("MMMM Do YYYY")}`}
                                    </div>
                                </Grid>
                                { cs === "VERIFY" || cs === "VERIFIED" ?
                                <Grid item xs={12} md={6}>
                                    <Button 
                                        onClick={()=>{
                                            setAcceptedData(obj);
                                            setCredentialRequestType(c.presentation_request.name);
                                            setShowCredentialDialog(true);
                                            setCredentialState(cs);
                                            setExchangeId(c.presentation_exchange_id);
                                        }}>
                                        VIEW CREDENTIALS
                                    </Button>
                                </Grid>
                                : null}
                                <Grid item xs={12} md={6}>
                                    {c.state=== "request_sent" ? 
                                    <Button variant="contained"
                                        className={"pending-button"}
                                    >
                                        PENDING
                                    </Button>
                                    :
                                    c.state=== "presentation_received" && !rejected ?
                                        <Button variant="contained"
                                            onClick={() => {
                                                setCredentialRequestType(c.presentation_request.name);
                                                dispatch(loader(true));
                                                dispatch(verifyCredentials({credential_exchange_id:c.presentation_exchange_id}))
                                            }}
                                        >
                                            VERIFY
                                        </Button>
                                    :
                                    c.state=== "presentation_received" && rejected ?
                                        <Button variant="contained"
                                            className={"rejected-button"}
                                            color="secondary"
                                        >
                                            REJECTED
                                        </Button>
                                    :
                                        c.state=== "verified" ?
                                            <Button variant="contained"
                                                className={"verified-button"}
                                            >
                                                VERIFIED
                                            </Button>
                                    : null
                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    </div>
                </Grid>
            )
        })
      }
    const showRequestedCredentials = () => {
        let highlight = false;
        let highlightColor = "white";
        if(credentialState === "VERIFY"){
            highlight = true;
            highlightColor = "yellow"
        }
        if(credentialState === "VERIFIED"){
            highlight = true;
            highlightColor = "white"
        }
        switch(credentialRequestType){
                case "Proof of Health" : return <Covid readFrom={acceptedData} highlight={highlight} highlightColor={highlightColor}/>;
                case "Proof of Education" : return <Degree readFrom={acceptedData}  highlight={highlight} highlightColor={highlightColor}/>;
                case "Proof of Employment" : return <Experience readFrom={acceptedData}  highlight={highlight} highlightColor={highlightColor}/>;
                default : return null;
        }
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
                            {credentialState==="VERIFY" &&
                                <div style={{color:"black",background:"yellow",display:"flex",alignItems:"center",justifyContent:"center",padding:8}}>
                                  <ErrorOutlineIcon/> <div>NOT VERIFIED</div> 
                                </div>
                            }
                            {credentialState==="VERIFIED" &&
                                <div style={{color:"black",background:"lightgreen",display:"flex",alignItems:"center",justifyContent:"center",padding:8}}>
                                  <CheckCircleOutlineIcon/> <div>VERIFIED</div> 
                                </div>
                            }
                            {showRequestedCredentials()}
                        </DialogContentText>
                        
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained"
                            onClick={() => {
                                setShowCredentialDialog(false);
                              }
                            }>
                            CLOSE
                        </Button>
                        {credentialState==="VERIFY" ?
                        <Button variant="contained"
                            onClick={() => {
                                dispatch(loader(true));
                                dispatch(verifyCredentials({credential_exchange_id:exchangeId}))
                                setShowCredentialDialog(false);
                            }
                            }>
                            VERIFY
                        </Button>
                        :
                        null
                        }
                    </DialogActions>
                </Dialog>
      </React.Fragment>
    );
};

export default RequestCredentials;


