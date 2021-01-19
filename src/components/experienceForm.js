/* eslint-disable complexity */
import {
    Card,
    CardHeader,
    CardContent,
    Grid,
    CardActions,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
    TextField
} from "@material-ui/core";
import React, {useState} from "react";
import TCS from "../images/tcslogo.png";
import PropTypes from "prop-types";

const ExperienceForm = (props) => {
    const [experienceParam ,setExperienceParam] = useState({
        ownerName: props.profileName,
        verificationId:"",
        certificateName:"",
        name:props.connectionName,
        designation:"",
        department:"",
        doj:"",
        dol:"",
        gender:"",
        reason:"",
        remarks:"",
        location:"",
        issuedOn:"",
        issuedBy:"",
        issuedByTeam:""
    })
    const [experienceParamError ,setExperienceParamError] = useState({
        ownerName: false,
        verificationId:false,
        certificateName:false,
        name:false,
        designation:false,
        department:false,
        doj:false,
        dol:false,
        gender:false,
        reason:false,
        remarks:false,
        location:false,
        issuedOn:false,
        issuedBy:false,
        issuedByTeam:false
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
                        id="verificationId" 
                        name="verificationId"
                        value={experienceParam.verificationId}
                        onChange={setExperienceCredentials}
                        placeholder={"eg: TCS/EMP/834930"}
                        error={experienceParamError.verificationId}
                        helperText={
                            experienceParamError.verificationId ? "Please enter employee no." : ""
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
                        <TextField 
                            id="certificateName" 
                            name="certificateName"
                            onChange={setExperienceCredentials}
                            value={experienceParam.certificateName}
                            error={experienceParamError.certificateName}
                            helperText={
                                experienceParamError.certificateName ? "Please enter certificate name." : ""
                            }
                            placeholder={"eg: Service Certificate"}/>
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
                   This is to certify that <b>{props.connectionName}</b> was employed by us and 
                   <FormControl>
                        <InputLabel id="demo-gender-label">Gender</InputLabel>
                            <Select
                                labelId="demo-gender-label"
                                id="gender"
                                name="gender"
                                value={experienceParam.gender}
                                onChange={setExperienceCredentials}
                                >
                                <MenuItem value={"M"}>Male</MenuItem>
                                <MenuItem value={"F"}>Female</MenuItem>
                            </Select>
                    </FormControl>
                   {experienceParamError.gender && <FormHelperText>Please select gender.</FormHelperText>}
                   {experienceParam.gender==="F" ? " her " : " his "} 
                   particulars of service are as under:
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
                                    id="designation" 
                                    name="designation"
                                    onChange={setExperienceCredentials}
                                    value={experienceParam.designation}
                                    error={experienceParamError.designation}
                                    helperText={
                                        experienceParamError.designation ? "Please enter designation." : ""
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
                                    id="doj" 
                                    name="doj"
                                    onChange={setExperienceCredentials}
                                    value={experienceParam.doj}
                                    error={experienceParamError.doj}
                                    helperText={
                                        experienceParamError.doj ? "Please enter date of joining." : ""
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
                                    id="dol" 
                                    name="dol"
                                    onChange={setExperienceCredentials}
                                    value={experienceParam.dol}
                                    error={experienceParamError.dol}
                                    helperText={
                                        experienceParamError.dol ? "Please enter date of leaving." : ""
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
                            <Grid item xs={6} md={8}>
                                <TextField 
                                    id="reason" 
                                    name="reason"
                                    onChange={setExperienceCredentials}
                                    value={experienceParam.reason}
                                    error={experienceParamError.reason}
                                    helperText={
                                        experienceParamError.reason ? "Please enter reason." : ""
                                    }
                                    placeholder={"eg: Resigned"}/>
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
                            <Grid item xs={6} md={8}>
                                <TextField 
                                    id="remarks" 
                                    name="remarks"
                                    onChange={setExperienceCredentials}
                                    value={experienceParam.remarks}
                                    error={experienceParamError.remarks}
                                    helperText={
                                        experienceParamError.remarks ? "Please enter remarks." : ""
                                    }
                                    placeholder={"eg: Remarks"}/>
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
                                id="issuedOn" 
                                name="issuedOn"
                                value={experienceParam.issuedOn}
                                onChange={setExperienceCredentials}
                                placeholder={"eg: 12/14/2020"}
                                error={experienceParamError.issuedOn}
                                helperText={
                                    experienceParamError.issuedOn ? "Please enter issued on date." : ""
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
               <Grid item xs={6} md={4}>
                    <TextField 
                            id="issuedBy" 
                            name="issuedBy"
                            value={experienceParam.issuedBy}
                            onChange={setExperienceCredentials}
                            placeholder={"Issuer name"}
                            error={experienceParamError.issuedBy}
                            helperText={
                                experienceParamError.issuedBy ? "Please enter issuer name." : ""
                            }/>
                </Grid>
            </Grid>
            <Grid
              container
              spacing={2}
              justify="flex-end"
              alignItems="center"
              style={{textAlign:"right"}}
            >
                <Grid item xs={6} md={4}>
                    <TextField 
                            id="issuedByTeam" 
                            name="issuedByTeam"
                            value={experienceParam.issuedByTeam}
                            onChange={setExperienceCredentials}
                            placeholder={"Issuer department"}
                            error={experienceParamError.issuedByTeam}
                            helperText={
                                experienceParamError.issuedByTeam ? "Please enter issuer department." : ""
                            }/>
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