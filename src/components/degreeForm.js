/* eslint-disable complexity */
import {
    Card,
    CardHeader,
    CardContent,
    Grid,
    TextField,
    CardActions,
    Button
} from "@material-ui/core";
import React, {useState} from "react";
import KIIT from "../images/kiitlogo.png";
import PropTypes from "prop-types";

const DegreeForm = (props) => {
    const [degreeParam ,setDegreeParam] = useState({
        ownerName: props.profileName,
        certificateName:"",
        department:"",
        name:props.connectionName,
        verificationId:"",
        dol:"",
        location:"",
        issuedOn:"",
        issuedBy:"",
        issuedByTeam:""
    })
    const [degreeParamError ,setDegreeParamError] = useState({
        ownerName: false,
        certificateName:false,
        department:false,
        name:false,
        verificationId:false,
        dol:false,
        location:false,
        issuedOn:false,
        issuedBy:false,
        issuedByTeam:false
    })
    const setDegreeCredentials = (e) => {
        setDegreeParam({ ...degreeParam, ...{ [e.target.name]: e.target.value } });
    }
    const issueCertificate = () => {
        let param = {};
        let passCheck = true;
        for(let i in degreeParam){
            if(!!degreeParam[i]){
                param[i]= false;
            }else{
                passCheck = false;
                param[i]= true;
            }
        }
        setDegreeParamError(param);
        if(passCheck){
            console.log("degreeParam",degreeParam);
            props.submitCredentialForm(degreeParam);
        }
    }
    return (
        <React.Fragment>
        <Card>
          <CardHeader 
            title={<img src={KIIT} className={"office-logo"} alt={props.profileName}/>}
          />
          <CardContent>
            <Grid
              container
              spacing={2}
              justify="center"
              alignItems="center"
            >
               <Grid item xs={12} md={12} >
                    <div className={"degree-certificate-name"}>
                        <TextField 
                            id="certificateName" 
                            name="certificateName"
                            onChange={setDegreeCredentials}
                            value={degreeParam.certificateName}
                            error={degreeParamError.certificateName}
                            helperText={
                                degreeParamError.certificateName ? "Please enter certificate name." : ""
                            }
                            placeholder={"eg: Provisional Certificate"}/>
                    </div>
               </Grid>
                <Grid item xs={12} md={12} >
                    <div className={"degree-certificate-name-title"}>
                        for the degree of
                    </div> 
               </Grid>
               <Grid item xs={12} md={12}>
                    <div className={"degree-department-name"} style={{textDecoration:"none"}}>
                        <TextField 
                            id="department" 
                            name="department"
                            onChange={setDegreeCredentials}
                            value={degreeParam.department}
                            error={degreeParamError.department}
                            helperText={
                                degreeParamError.department ? "Please enter department name." : ""
                            }
                            placeholder={"eg: B.TECH in Computer Science & Engineering"}/>
                    </div> 
               </Grid>
            </Grid>
            <Grid
              container
              spacing={2}
              justify="flex-start"
              alignItems="center"
              style={{textAlign:"left"}}
            >
               <Grid item xs={12} md={12} className={"degree-certificate-details"}>
                    <div>
                        This is to certify that <b>{props.connectionName}</b> 
                   </div>
                   <div className={"flex-display"}>
                       <div> bearing the Registration No. </div>
                       <div className={"flex-display-text"}>
                            <TextField 
                                id="verificationId" 
                                name="verificationId"
                                value={degreeParam.verificationId}
                                onChange={setDegreeCredentials}
                                placeholder={"eg: 1005042"}
                                error={degreeParamError.verificationId}
                                helperText={
                                    degreeParamError.verificationId ? "Please enter registration no." : ""
                                }/> 
                       </div>
                   </div>
                   <div className={"flex-display"}>
                       <div> has successfully completed in the  </div>
                       <div className={"flex-display-text"}>
                            <TextField 
                                id="dol" 
                                name="dol"
                                value={degreeParam.dol}
                                onChange={setDegreeCredentials}
                                placeholder={"eg :month of May, 2014"}
                                error={degreeParamError.dol}
                                helperText={
                                    degreeParamError.dol ? "Please enter completion date." : ""
                                }/>   
                       </div>
                   </div>
                   <div>all the prescribed requirements under the regulations</div>
                   <div className={"flex-display"}>
                       <div> for the degree of   </div>
                       <div className={"flex-display-text"}>
                            <TextField 
                                id="department" 
                                name="department"
                                value={degreeParam.department}
                                placeholder={"eg: B.TECH in Computer Science & Engineering"}/> 
                       </div>
                   </div>
               </Grid>
               
            </Grid>
            <div className={"mgBtm20"}/>
            <Grid
              container
              spacing={2}
            >
                    <Grid item xs={6} md={6}>
                        <Grid
                            container
                            spacing={2}
                            style={{textAlign:"left"}}
                        >
                            <Grid item xs={12} md={12}>
                                <div className={"flex-display"}>
                                    <div> Place:    </div>
                                    <div className={"flex-display-text"}>
                                        <TextField 
                                            id="location" 
                                            name="location"
                                            value={degreeParam.location}
                                            onChange={setDegreeCredentials}
                                            placeholder={"eg: Bhubaneswar"}
                                            error={degreeParamError.location}
                                            helperText={
                                                degreeParamError.location ? "Please enter place." : ""
                                            }/>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <div className={"flex-display"}>
                                    <div> Date:    </div>
                                    <div className={"flex-display-text"}>
                                        <TextField 
                                            id="issuedOn" 
                                            name="issuedOn"
                                            value={degreeParam.issuedOn}
                                            onChange={setDegreeCredentials}
                                            placeholder={"eg: 26th May 2014"}
                                            error={degreeParamError.issuedOn}
                                            helperText={
                                                degreeParamError.issuedOn ? "Please enter issued on date." : ""
                                            }/>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6} md={6}>
                    <Grid
                        container
                        spacing={2}
                        justify="flex-end"
                        alignItems="center"
                        style={{textAlign:"right"}}
                    >
                        <Grid item xs={12} md={12}>
                            <TextField 
                                    id="issuedBy" 
                                    name="issuedBy"
                                    value={degreeParam.issuedBy}
                                    onChange={setDegreeCredentials}
                                    placeholder={"Issuer name"}
                                    error={degreeParamError.issuedBy}
                                    helperText={
                                        degreeParamError.issuedBy ? "Please enter issuer name." : ""
                                    }/>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField 
                                    id="issuedByTeam" 
                                    name="issuedByTeam"
                                    value={degreeParam.issuedByTeam}
                                    onChange={setDegreeCredentials}
                                    placeholder={"Issuer department"}
                                    error={degreeParamError.issuedByTeam}
                                    helperText={
                                        degreeParamError.issuedByTeam ? "Please enter issuer department." : ""
                                    }/>
                        </Grid>
                    </Grid>
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

export default DegreeForm;


DegreeForm.propTypes = {
    connectionName: PropTypes.string,
    profileName: PropTypes.string,
    submitCredentialForm: PropTypes.func
  };