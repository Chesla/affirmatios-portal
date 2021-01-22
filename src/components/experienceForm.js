/* eslint-disable complexity */
import {
    Card,
    CardHeader,
    CardContent,
    Grid,
    CardActions,
    Button,
   TextField
} from "@material-ui/core";
import React, {useState} from "react";
import TCS from "../images/tcslogo.png";
import PropTypes from "prop-types";

const ExperienceForm = (props) => {
    const [experienceParam ,setExperienceParam] = useState({
        "name": props.connectionName,
        "employee_id": "",
        "joining_date": "",
        "department": "",
        "role": "",
        "issued_date": "",
        "relieving_date": ""
    })
    const [experienceParamError ,setExperienceParamError] = useState({
        "name": false,
        "employee_id": false,
        "joining_date": false,
        "department": false,
        "role": false,
        "issued_date": false,
        "relieving_date": false
    })
    const setExperienceCredentials = (e) => {
        setExperienceParam({ ...experienceParam, ...{ [e.target.name]: e.target.value } });
    }
    const issueCertificate = () => {
        let param = {};
        let passCheck = true;
        for(let i in experienceParam){
            if(!!experienceParam[i]){
                param[i]= false;
            }else{
                passCheck = false;
                param[i]= true;
            }
        }
        setExperienceParamError(param);
        if(passCheck){
            console.log("experienceParam",experienceParam);
            props.submitCredentialForm(experienceParam);
        }
    }
    return (
        <React.Fragment>
        <Card>
          <CardHeader 
            title={<img src={TCS} className={"office-logo"} alt={props.profileName}/>}/>
          <CardContent className="degree-grid-form">
            <Grid
              container
              spacing={2}
              justify="flex-end"
              alignItems="center"
              style={{textAlign:"right"}}
            >
               <Grid item xs={6} md={4}>
                    <TextField 
                        id="employee_id" 
                        name="employee_id"
                        value={experienceParam.employee_id}
                        onChange={setExperienceCredentials}
                        placeholder={"eg: TCS/EMP/834930"}
                        error={experienceParamError.employee_id}
                        helperText={
                            experienceParamError.employee_id ? "Please enter employee no." : ""
                        }/> 
               </Grid>
            </Grid>
            <Grid
              container
              spacing={2}
              justify="center"
              alignItems="center"
            >
               <Grid item xs={12} md={12}>
               <Grid item xs={12} md={12} >
                    <div className={"degree-certificate-name"}>
                        <b> {"SERVICE CERTIFICATE"} </b>
                    </div>
               </Grid>
               </Grid>
            </Grid>
            <Grid
              container
              spacing={2}
              justify="flex-start"
              alignItems="center"
              style={{textAlign:"left"}}
            >
               <Grid item xs={12} md={12}>
                   This is to certify that <b>{props.connectionName}</b> was employed by us  
               </Grid>
               <Grid item xs={12} md={12}>
                    <Grid
                        container
                        spacing={2}
                        justify="flex-start"
                        alignItems="center"
                        >
                           <Grid item xs={6} md={4}>
                               1. Name
                            </Grid> 
                            <Grid item xs={6} md={8}>
                                <b>{props.connectionName}</b>
                            </Grid> 
                    </Grid>
               </Grid>
               <Grid item xs={12} md={12}>
                    <Grid
                        container
                        spacing={2}
                        justify="flex-start"
                        alignItems="center"
                        >
                           <Grid item xs={6} md={4}>
                               2. Designation
                            </Grid> 
                            <Grid item xs={6} md={8}>
                                <TextField 
                                    id="role" 
                                    name="role"
                                    onChange={setExperienceCredentials}
                                    value={experienceParam.role}
                                    error={experienceParamError.role}
                                    helperText={
                                        experienceParamError.role ? "Please enter designation." : ""
                                    }
                                    placeholder={"eg: CSIS"}/>
                            </Grid> 
                    </Grid>
               </Grid>
               <Grid item xs={12} md={12}>
                    <Grid
                        container
                        spacing={2}
                        justify="flex-start"
                        alignItems="center"
                        >
                           <Grid item xs={6} md={4}>
                               3. Department
                            </Grid> 
                            <Grid item xs={6} md={8}>
                                <TextField 
                                    id="department" 
                                    name="department"
                                    onChange={setExperienceCredentials}
                                    value={experienceParam.department}
                                    error={experienceParamError.department}
                                    helperText={
                                        experienceParamError.department ? "Please enter department name." : ""
                                    }
                                    placeholder={"eg: CSIS"}/>
                            </Grid> 
                    </Grid>
               </Grid>
               <Grid item xs={12} md={12}>
                    <Grid
                        container
                        spacing={2}
                        justify="flex-start"
                        alignItems="center"
                        >
                           <Grid item xs={6} md={4}>
                               4. Date of Joining
                            </Grid> 
                            <Grid item xs={6} md={8}>
                                <TextField 
                                    id="joining_date" 
                                    name="joining_date"
                                    onChange={setExperienceCredentials}
                                    value={experienceParam.joining_date}
                                    error={experienceParamError.joining_date}
                                    helperText={
                                        experienceParamError.joining_date ? "Please enter date of joining." : ""
                                    }
                                    placeholder={"eg: 06/16/2014"}/>
                            </Grid> 
                    </Grid>
               </Grid>
               <Grid item xs={12} md={12}>
                    <Grid
                        container
                        spacing={2}
                        justify="flex-start"
                        alignItems="center"
                        >
                           <Grid item xs={6} md={4}>
                               5. Date of Leaving
                            </Grid> 
                            <Grid item xs={6} md={8}>
                                <TextField 
                                    id="relieving_date" 
                                    name="relieving_date"
                                    onChange={setExperienceCredentials}
                                    value={experienceParam.relieving_date}
                                    error={experienceParamError.relieving_date}
                                    helperText={
                                        experienceParamError.relieving_date ? "Please enter date of leaving." : ""
                                    }
                                    placeholder={"eg: 09/11/2015"}/>
                            </Grid> 
                    </Grid>
               </Grid>
               <Grid item xs={12} md={12}>
                    <Grid
                        container
                        spacing={2}
                        justify="flex-start"
                        alignItems="center"
                        >
                           <Grid item xs={6} md={4}>
                               6. Reason of Leaving
                            </Grid> 
                            <Grid item xs={6} md={4}>
                                <b>:{"Resigned"}</b>
                            </Grid> 
                    </Grid>
               </Grid>
               <Grid item xs={12} md={12}>
                    <Grid
                        container
                        spacing={2}
                        justify="flex-start"
                        alignItems="center"
                        >
                           <Grid item xs={6} md={4}>
                               7. Remarks
                            </Grid> 
                            <Grid item xs={6} md={4}>
                                <b>:{"-"}</b>
                            </Grid>
                    </Grid>
               </Grid>
               <Grid item xs={12} md={12}>
                    <Grid
                        container
                        spacing={2}
                        justify="flex-start"
                        alignItems="center"
                    >
                        <Grid item xs={6} md={4}>
                            Dated
                        </Grid> 
                        <Grid item xs={6} md={8}>
                         <TextField 
                                id="issued_date" 
                                name="issued_date"
                                value={experienceParam.issued_date}
                                onChange={setExperienceCredentials}
                                placeholder={"eg: 12/14/2020"}
                                error={experienceParamError.issued_date}
                                helperText={
                                    experienceParamError.issued_date ? "Please enter issued on date." : ""
                                }/>
                    </Grid> 
                    </Grid>
               </Grid>
            </Grid>
            <Grid
              container
              spacing={2}
              justify="flex-end"
              alignItems="center"
              style={{textAlign:"right"}}
            >
               <Grid item xs={12} md={12}>
                {"Ritu Kumar"}
               </Grid>
               <Grid item xs={12} md={12}>
                  {"Recruitment Head"}
               </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button
                variant="contained"
                className="full-width"
                onClick={issueCertificate}
            >
                Issue certificate
            </Button>
          </CardActions>
        </Card>
    </React.Fragment>
    );
};

export default ExperienceForm;


ExperienceForm.propTypes = {
    connectionName: PropTypes.string,
    profileName: PropTypes.string,
    submitCredentialForm: PropTypes.func
  };