/* eslint-disable complexity */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Alert, Autocomplete } from "@material-ui/lab";
import {TextField,
        Grid,
        Card,
        CardHeader,
        CardContent,
        Button,
        FormControl,
        InputLabel,
        Select,
        MenuItem,
        Checkbox,
        ListItemText} from '@material-ui/core';
import {
    loginUser,
    loader
} from "../actions/userAction";
import {
    requestCredentials,
} from "../actions/credentialAction";
import {
    getAllConnections
} from "../actions/connectionAction";
const RequestNewCredentails = (props) => {
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
    const [connectionName, setConnectionName] = useState("");
    const [connectionInputValue, setConnectionInputValue] = useState("");
    const [certificateType, saveCertificateType] = useState("");
    const [paramsSelected, setSelectedParams] = React.useState([]);
    const setParams = (event) => {
        setSelectedParams(event.target.value);
    };
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
    const credentails = {
        "degree" : {
            params:[
                {id : "companyName", name : "College Name"}, 
                {id : "name", name : " Name"},
                {id : "registartionNo", name : " Registartion Number"}, 
                {id :"dol" , name : "Date of Completion"},
                {id :"department", name : "Department"},
                {id :"location" , name : "Location where issued"},
                {id :"issuedOn", name : "Issued On"},
                {id :"issuedBy", name : "Issued By"},
                {id : "issuedByTeam", name : "Issued By Team"}
            ]
        },
        "experience":{
            params:[
                {id :"companyName" , name : "Company Name"}, 
                {id :"name" , name : "Name"},
                {id :"gender" , name : "Gender"},
                {id :"designation" , name : "Designation"},
                {id :"department" , name : "Department"},
                {id :"doj" , name : "Date of Joining"},
                {id :"dol" , name : "Date of Leaving"},
                {id :"reason" , name : "Reason"},
                {id :"remarks" , name : "Remarks"},
                {id :"issuedOn" , name : "Issued On"},
                {id :"issuedBy" , name : "Issued By"},
                {id :"issuedByTeam" , name : "Issued By Team"}
            ]
        },
        "medical":{
            params:[
                {id :"companyName" , name: "Hospital Name"}, 
                {id :"name" , name: "Name"},
                {id :"gender" , name: "Gender"},
                {id :"age" , name: "Age"},
                {id :"address" , name: "Address"},
                {id :"location"  , name: "Location where issued"},
                {id :"issuedOn" , name: "Issued On"},
                {id :"issuedBy" , name: "Issued By"},
                {id :"issuedByTeam" , name: "Issued By Team"}
            ]
        },
    }
    const fetchAllConnections = () => {
        let param = profileInfo.DID;
        dispatch(loader(true));
        dispatch(getAllConnections(param));
    }
    const showConnections = () => {
        return (
            <Autocomplete
                value={connectionName}
                onChange={(event, newValue) => {
                    setConnectionName(newValue);
                }}
                inputValue={connectionInputValue}
                onInputChange={(event, connectionInputValue) => {
                    setConnectionInputValue(connectionInputValue);
                }}
                renderOption={(option) => (
                    <React.Fragment>
                      {option.name} ({option.identity})
                    </React.Fragment>
                )}
                getOptionLabel={(option) => option.name||""}
                id="controllable-connection"
                options={connections||[]}
                style={{ width: '100%' }}
                renderInput={(params) => <TextField {...params} label="Connection" variant="outlined" />}
            />
        )
    }
    const showCertificatesName = () => {
        return(
            <React.Fragment>
                <FormControl variant="outlined">
                    <InputLabel id="certificate-simple-select-outlined-label">Certificate Type</InputLabel>
                    <Select
                    labelId="certificate-simple-select-outlined-label"
                    id="certificate"
                    name="certificate"
                    value={certificateType||""}
                    onChange={(e)=>saveCertificateType(e.target.value)}
                    label="Certificate Type"
                    >
                        <MenuItem value={"degree"}>
                                {"Provisional Certificate"}
                        </MenuItem>
                        <MenuItem value={"medical"}>
                                {"Covid Certificate"}
                        </MenuItem>
                        <MenuItem value={"experience"}>
                                {"Experience Certificate"}
                        </MenuItem>
                    </Select>
                </FormControl>
            </React.Fragment>
        )
    }
    const showParams = () => {
        return (
            <FormControl variant="outlined">
                <InputLabel id="demo-simple-select-outlined-label">Params</InputLabel>
                <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={paramsSelected||[]}
                multiple
                onChange={setParams}
                renderValue={(selected) => selected.length+" selected" }
                label="Params"
                >
                {credentails[certificateType].params?.map((p) => (
                    <MenuItem key={p.id} value={p.id}>
                        <Checkbox color="primary" checked={paramsSelected.indexOf(p.id) > -1} />
                        <ListItemText primary={p.name} />
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
        )
    }
    const requestParams = () => {
        if(paramsSelected.length && !!certificateType && !!connectionName){
            let param = {
                did: connectionName.identity,
                certificateType:certificateType,
                paramsSelected:paramsSelected
            }
            dispatch(requestCredentials(param));
        }
    }
    const checkRequest = () => {
        console.log(paramsSelected,certificateType,connectionName);
        if(paramsSelected.length && !!certificateType && !!connectionName){
            return false
        }else{
            return true;
        }
    }
    useEffect(()=>{
        if(Object.keys(profileInfo).length === 0){
            login();
        }else{
            fetchAllConnections();
        }
        
    },[]);
    useEffect(()=>{
        if(Object.keys(profileInfo).length !== 0){
            fetchAllConnections();
        }
    },[profileInfo]);
  
    return (
      <div className="degree-grid-form">
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <Card className={"mgTop10"}>
          <CardHeader className={"mgleft10"} title={"Request Credentials"}/>
          <CardContent>
          {(connections||[]).length  ?
            <Grid
              style={{ width: "320px", margin: "0 auto" }}
              container
              alignItems={"center"}
              spacing={2}
            >
                <Grid item xs={12} md={12}>
                    {showConnections()}
                </Grid>
                <Grid item xs={12} md={12}>
                    {showCertificatesName()}
                </Grid>
                <Grid item xs={12} md={12}>
                    {certificateType && showParams()}
                </Grid>
                <Grid item xs={12} md={12}>
                    <Button
                    variant="contained"
                    className="full-width"
                    onClick={requestParams}
                    disabled={checkRequest()}
                    >
                    REQUEST
                    </Button>
                </Grid>
            </Grid>
            :
            <div>
                There is no connection to request credential from.
            </div>
            }
          </CardContent>
        </Card>
        
       </div>
    );
};

export default RequestNewCredentails;


