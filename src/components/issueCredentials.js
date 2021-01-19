/* eslint-disable complexity */
import React, { useEffect, useState } from "react";
import DegreeForm from './degreeForm';
import CovidForm from './covidForm';
import ExperienceForm from './experienceForm';
import Degree from './degree';
import Covid from './covid';
import Experience from './experience';
import { useSelector, useDispatch } from "react-redux";
import { Alert, Autocomplete } from "@material-ui/lab";
import {TextField,
        Grid,
        Dialog,
        DialogContent,
        DialogContentText,
        DialogActions,
        Button} from '@material-ui/core';
import {
    loginUser,
    loader
} from "../actions/userAction";
import {
    issueCredential,
    initCredentialsDetails
} from "../actions/credentialAction";
import {
    getAllConnections
} from "../actions/connectionAction";
import { getType, setProfileName } from "../constants";

const Certificate = (props) => {
    const dispatch = useDispatch();
    const profileInfo = useSelector(
        (state) => state.user.profileInfo
    );
    const errorMessage = useSelector(
        (state) => state.credential.errorMessage
    );
    const connections = useSelector(
        (state) => state.connection.connections
    );
    const credentialIssued = useSelector(
        (state) => state.credential.credentialIssued
    );
    const credentialIssuedAlready = useSelector(
        (state) => state.credential.credentialIssuedAlready
    );
    const [showCredentialDialog, setShowCredentialDialog] = useState(false);
    const [showCredentialDetails, setShowCredentialDetails] = useState(false);
    const [connectionName, setConnectionName] = useState("");
    const [connectionInputValue, setConnectionInputValue] = useState("");
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
    const fetchAllConnections = () => {
        dispatch(loader(true));
        dispatch(getAllConnections());
    }
    const showConnections = () => {
        
        return (
            <Autocomplete
                value={connectionName}
                onChange={(event, newValue) => {
                    console.log("newValue",newValue);
                    setConnectionName(newValue);
                }}
                inputValue={connectionInputValue}
                onInputChange={(event, connectionInputValue) => {
                    
                    setConnectionInputValue(connectionInputValue);
                }}
                renderOption={(option) => {
                    let type = getType(option.their_label || "");
                    let name = setProfileName(type) || option.connection_id;
                    return (
                        <React.Fragment>
                            {name} ({option.connection_id})
                        </React.Fragment>
                    )
                }
                }
                getOptionLabel={(option) => {
                    let type = getType(option.their_label || "");
                    let name = setProfileName(type) || "";
                    return name || option.connection_id
                }}
                id="controllable-connection"
                options={connections.filter((c)=> c.state === "active")||[]}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Connection Name" variant="outlined" />}
            />
        )
    }
    useEffect(()=>{
        if(Object.keys(profileInfo).length === 0){
            login();
        }else{
            fetchAllConnections();
        }
        return () => {
            dispatch(initCredentialsDetails());
        };
    },[]);
    useEffect(()=>{
        if(Object.keys(profileInfo).length !== 0){
            fetchAllConnections();
        }
    },[profileInfo]);
    useEffect(()=>{
        setShowCredentialDialog(credentialIssuedAlready);
    },[credentialIssuedAlready]);
    const showCertificate = () => {
        let type = process.env.REACT_APP_AGENT?.toLowerCase();
        let nametype = getType(connectionName.their_label || "");
        let name = setProfileName(nametype) || connectionName.connection_id;
        let param = {
            connection_id: connectionName.connection_id
        }
        switch(type){
                case "medical" : return <CovidForm
                                            connectionName={name}
                                            profileName={profileInfo.firstLastName}
                                            submitCredentialForm={((credentialParam)=>{
                                                dispatch(loader(true));
                                                param["credential"]=credentialParam;
                                                dispatch(issueCredential(param, "medical"))
                                            })}/>;
                case "school" : return <DegreeForm 
                                            connectionName={name}
                                            profileName={profileInfo.firstLastName}
                                            submitCredentialForm={((credentialParam)=>{
                                                dispatch(loader(true));
                                                param["credential"]=credentialParam;
                                                dispatch(issueCredential(param, "school"))
                                            })}/>;
                case "business" : return <ExperienceForm
                                            connectionName={name}
                                            profileName={profileInfo.firstLastName}
                                            submitCredentialForm={((credentialParam)=>{
                                                dispatch(loader(true));
                                                param["credential"]=credentialParam;
                                                dispatch(issueCredential(param, "business"))
                                            })}/>;
                default : return null;
        }
    }
    const showIssuedCredentials = () => {
        let type = process.env.REACT_APP_AGENT?.toLowerCase();
        switch(type){
                case "medical" : return <Covid/>;
                case "school" : return <Degree/>;
                case "business" : return <Experience/>;
                default : return null;
        }
    }
    return (
      <div className="degree-grid-form">
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        {credentialIssued && <Alert severity="success">Credential Issued Successfully</Alert>}
        <Grid
            container
            justify="center"
            alignItems="center"
            className={"issue-certificate-to-container"}
        >
            <div style={{ paddingRight: 20 }}>
                Issue certificate to:
            </div>
            {(connections||[]).length  ?
                <div>{showConnections()}</div>
                :
                <div>
                    There is no connection to issue credential.
                </div>
            }
        </Grid>
        {connectionName && connectionName.connection_id ?
            showCertificate()
        :   null
        }
        <Dialog
            open={showCredentialDialog||false}
            onClose={() => setShowCredentialDialog(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {!showCredentialDetails ?
                        <div>
                            Credential already issued to this connection. Click on continue to see the issued credential.
                        </div>
                        :
                        showIssuedCredentials()
                    }
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="contained"
                    onClick={() => {
                        setShowCredentialDialog(false)
                        setShowCredentialDetails(false);}
                    }>
                    {!showCredentialDetails ? "Cancel" : "Close" }
                </Button>
                {!showCredentialDetails ?
                    <Button variant="contained"
                        onClick={()=>{
                            setShowCredentialDetails(true);
                        }}>
                        Confirm
                    </Button>
                    :
                    null
                }
                
            </DialogActions>
        </Dialog>
      </div>
    );
};

export default Certificate;


