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
import { getType, setProfileName } from "../constants";
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
    const credentialRequested = useSelector(
        (state) => state.credential.credentialRequested
    );
    const successRequestMessage = useSelector(
        (state) => state.credential.successRequestMessage
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
        "Degree" : {
            params:[
                {id : "name", name : " Name"},
                {id : "roll_number", name : " Registartion Number"}, 
                {id :"completed_date" , name : "Date of Completion"},
                {id :"department", name : "Department"},
                {id :"address" , name : "Location where issued"},
                {id :"issued_date", name : "Issued On"}
            ]
        },
        "experience":{
            params:[
                {id :"name" , name : "Name"},
                {id :"gender" , name : "Gender"},
                {id :"designation" , name : "Designation"},
                {id :"department" , name : "Department"},
                {id :"doj" , name : "Joining Date"},
                {id :"dol" , name : "Release Date"},
                {id :"reason" , name : "Reason"},
                {id :"remarks" , name : "Remarks"},
                {id :"issuedOn" , name : "Issued On"}
            ]
        },
        "Hospital":{
            params:[
                {id :"name" , name: "Name"},
                {id :"sex" , name: "Sex"},
                {id :"age" , name: "Age"},
                {id :"address" , name: "Address"},
                {id :"place"  , name: "Place where issued"},
                {id :"date" , name: "Issued On"}
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
                    return name ? name : option.connection_id
                }}
                id="controllable-connection"
                options={connections.filter((c)=> c.state === "active")||[]}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Connection Name" variant="outlined" />}
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
                        onChange={(e)=>{
                            setSelectedParams([]);
                            saveCertificateType(e.target.value)
                        }}
                        label="Certificate Type"
                    >
                        <MenuItem value={"Degree"}>
                                {"Provisional Certificate"}
                        </MenuItem>
                        <MenuItem value={"Hospital"}>
                                {"Covid Certificate"}
                        </MenuItem>
                        <MenuItem value={"employeer"}>
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
        let data = {
            connection_id:connectionName.connection_id,
            record_type:certificateType,
        };
        dispatch(requestCredentials(data));
    }
    const checkRequest = () => {
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
        {successRequestMessage && <Alert severity="success">{"Credentials Request sent successfully"}</Alert>}
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


