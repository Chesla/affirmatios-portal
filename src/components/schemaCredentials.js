/* eslint-disable complexity */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Alert, Autocomplete } from "@material-ui/lab";
import {Chip,
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
    saveCredentialSchema,
} from "../actions/credentialAction";
const SchemaCredentials = (props) => {
    const dispatch = useDispatch();
    const profileInfo = useSelector(
        (state) => state.user.profileInfo
    );
    const savedSchema = useSelector(
        (state) => state.credential.savedSchema
    );
    const [successMessage, setSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [paramsSelected, setSelectedParams] = React.useState(savedSchema || []);
    useEffect(()=>{
        setSelectedParams(savedSchema);
    },[savedSchema])
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
        "school" : {
            params:[
                {id : "name", name : " Name"},
                {id : "roll_number", name : " Registartion Number"}, 
                {id :"completed_date" , name : "Date of Completion"},
                {id :"department", name : "Department"},
                {id :"address" , name : "Location where issued"},
                {id :"issued_date", name : "Issued On"}
            ]
        },
        "business":{
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
        "medical":{
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
                {credentails[process.env.REACT_APP_AGENT].params?.map((p) => (
                    <MenuItem key={p.id} value={`${p.id}-${p.name}`}>
                        <Checkbox color="primary" checked={paramsSelected?.indexOf(`${p.id}-${p.name}`) > -1} />
                        <ListItemText primary={p.name} />
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
        )
    }
    const saveSchema = () => {
        setSuccessMessage(true);
        dispatch(saveCredentialSchema(paramsSelected));
        window.setTimeout(()=>{
            setSuccessMessage(false);
        },2000);
    }
    const checkRequest = () => {
        if(paramsSelected?.length){
            return false
        }else{
            return true;
        }
    }
    useEffect(()=>{
        if(Object.keys(profileInfo).length === 0){
            login();
        }
        
    },[]);
  
    return (
      <div className="degree-grid-form">
        {errorMessage && <Alert severity="error">{"Some error occured. Please try again later"}</Alert>}
        {successMessage && <Alert severity="success">{"Schema saved successfully."}</Alert>}
        <Card className={"mgTop10"}>
          <CardHeader className={"mgleft10"} title={"Create Schema"}/>
          <CardContent>
            <Grid
              style={{ width: "320px", margin: "0 auto" }}
              container
              alignItems={"center"}
              spacing={2}
            >
                <Grid item xs={12} md={12}>
                    {process.env.REACT_APP_AGENT && showParams()}
                </Grid>
                {paramsSelected?.length ?
                    <Grid className={"textLeft"} item xs={12} md={12}>Fields added are:- </Grid>
                    :null
                }
                
                {paramsSelected?.map((p)=>{
                    let labelName = p.split('-')[1];
                    let id = p.split('-')[0];
                    return(
                        <Grid item xs={6} md={5} key={`chip-${id}`} className={"textLeft"}>
                            <Chip label={labelName} />
                        </Grid>
                    )
                })}
                <Grid item xs={12} md={2}>

                </Grid>
                <Grid item xs={12} md={12}>
                    <Button
                    variant="contained"
                    className="full-width"
                    onClick={saveSchema}
                    disabled={checkRequest()}
                    >
                    SAVE SCHEMA
                    </Button>
                </Grid>
            </Grid>
          </CardContent>
        </Card>
        
       </div>
    );
};

export default SchemaCredentials;


