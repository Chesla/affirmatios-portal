import {
    Card,
    CardHeader,
    CardContent,
    Grid,
    TextField,
    CardActions,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText
  } from "@material-ui/core";
  import React, {useState} from "react";
  import Manipal from "../images/manipallogo.jpeg";
import PropTypes from "prop-types";
  
  const CovidForm = (props) => {
    const [covidParam ,setCovidParam] = useState({
        ownerName: props.profileName,
        certificateName:"",
        department:"TO WHOMSOEVER IT MAY CONCERN",
        name:props.connectionName,
        gender:"",
        age:"",
        remarks:"",
        location:"",
        issuedOn:"",
        issuedBy:"",
        issuedByTeam:""
    })
    const [covidParamError ,setCovidParamError] = useState({
        ownerName: false,
        certificateName:false,
        department:false,
        name:false,
        gender:false,
        age:false,
        remarks:false,
        location:false,
        issuedOn:false,
        issuedBy:false,
        issuedByTeam:false
    })
    const setCovidCredentials = (e) => {
        setCovidParam({ ...covidParam, ...{ [e.target.name]: e.target.value } });
    }
    const issueCertificate = () => {
        let param = {};
        let passCheck = true;
        for(let i in covidParam){
            if(!!covidParam[i]){
                param[i]= false;
            }else{
                passCheck = false;
                param[i]= true;
            }
        }
        setCovidParamError(param);
        if(passCheck){
            console.log("covidParam",covidParam);
            props.submitCredentialForm(covidParam);
        }
    }
    return (
        <React.Fragment>
        <Card>
          <CardHeader 
            title={<img src={Manipal} className={"medical-logo"} alt={props.profileName}/>}
          />
          <CardContent className="degree-grid-form">
            <Grid
              container
              spacing={2}
              justify="center"
              alignItems="center"
            >
              <Grid item xs={12} md={12}>
                    <div className={"Covid-department-name"}>
                        TO WHOMSOEVER IT MAY CONCERN
                    </div> 
               </Grid>
  
               <Grid item xs={12} md={12} >
                    <div className={"degree-certificate-name"}>
                        <TextField 
                            id="certificateName" 
                            name="certificateName"
                            onChange={setCovidCredentials}
                            value={covidParam.certificateName}
                            error={covidParamError.certificateName}
                            helperText={
                                covidParamError.certificateName ? "Please enter certificate name." : ""
                            }
                            placeholder={"eg: Covid Certificate"}/>
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
               <Grid item xs={12} md={12} className={"Covid-certificate-details"}>
                    <div>
                        This is to certify that <b>{props.connectionName}</b> 
                   </div>
                   <div className={"flex-display"}>
                       <div className={"flex-display-text"}>
                            <FormControl>
                                <InputLabel id="demo-gender-label">Sex</InputLabel>
                                    <Select
                                        labelId="demo-gender-label"
                                        id="gender"
                                        name="gender"
                                        value={covidParam.gender}
                                        onChange={setCovidCredentials}
                                        >
                                        <MenuItem value={"M"}>Male</MenuItem>
                                        <MenuItem value={"F"}>Female</MenuItem>
                                    </Select>
                            </FormControl>
                            {covidParamError.gender && <FormHelperText>Please select gender.</FormHelperText>}
                       </div>
                       <div> Age </div>
                       <div className={"flex-display-text"}>
                            <TextField 
                                id="age" 
                                name="age"
                                value={covidParam.age}
                                onChange={setCovidCredentials}
                                placeholder={"eg: 27yrs"}
                                error={covidParamError.age}
                                helperText={
                                    covidParamError.age ? "Please enter age." : ""
                                }/> 
                       </div>
                       </div>
                       <div> Residing at </div>
                       <div className={"flex-display-text"}>
                            <TextField 
                                id="remarks" 
                                name="remarks"
                                value={covidParam.remarks}
                                onChange={setCovidCredentials}
                                placeholder={"eg: 501, UKN Espernza, Thubrahalli, Whitefield, Bengaluru, Karnataka, 560066"}
                                error={covidParamError.remarks}
                                helperText={
                                    covidParamError.remarks ? "Please enter address." : ""
                                }/> 
                       </div>
                   <div>
                        is healthy and not suffering from COVID-19.
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
                                            value={covidParam.location}
                                            onChange={setCovidCredentials}
                                            placeholder={"eg: Bengaluru"}
                                            error={covidParamError.location}
                                            helperText={
                                                covidParamError.location ? "Please enter place." : ""
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
                                            value={covidParam.issuedOn}
                                            onChange={setCovidCredentials}
                                            placeholder={"eg: 12/14/2020"}
                                            error={covidParamError.issuedOn}
                                            helperText={
                                                covidParamError.issuedOn ? "Please enter issued on date." : ""
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
                                    value={covidParam.issuedBy}
                                    onChange={setCovidCredentials}
                                    placeholder={"Issuer name"}
                                    error={covidParamError.issuedBy}
                                    helperText={
                                        covidParamError.issuedBy ? "Please enter issuer name." : ""
                                    }/>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField 
                                    id="issuedByTeam" 
                                    name="issuedByTeam"
                                    value={covidParam.issuedByTeam}
                                    onChange={setCovidCredentials}
                                    placeholder={"Issuer department"}
                                    error={covidParamError.issuedByTeam}
                                    helperText={
                                        covidParamError.issuedByTeam ? "Please enter issuer department." : ""
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
  
  export default CovidForm;
  
  
  CovidForm.propTypes = {
    connectionName: PropTypes.string,
    profileName: PropTypes.string,
    submitCredentialForm: PropTypes.func
  };