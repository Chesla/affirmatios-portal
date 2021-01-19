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
    FormHelperText,
    InputAdornment,
    Input
  } from "@material-ui/core";
  import React, {useState} from "react";
  import Manipal from "../images/manipallogo.jpeg";
import PropTypes from "prop-types";
  
  const CovidForm = (props) => {
    const [covidParam ,setCovidParam] = useState({
        name:props.connectionName,
        sex:"",
        age:"",
        address:"",
        place:"",
        date:"",
    })
    const [covidParamError ,setCovidParamError] = useState({
        name:false,
        sex:false,
        age:false,
        address:false,
        place:false,
        date:false,
    })
    const setCovidCredentials = (e) => {
        if(e.target.name==="age"){
            setCovidParam({ ...covidParam, ...{ [e.target.name]: +e.target.value } });
        }else{
            setCovidParam({ ...covidParam, ...{ [e.target.name]: e.target.value } });
        }
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
                            COVID CERTIFICATE
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
                                <InputLabel id="demo-sex-label">Sex</InputLabel>
                                    <Select
                                        labelId="demo-sex-label"
                                        id="sex"
                                        name="sex"
                                        value={covidParam.sex}
                                        onChange={setCovidCredentials}
                                        >
                                        <MenuItem value={"M"}>Male</MenuItem>
                                        <MenuItem value={"F"}>Female</MenuItem>
                                    </Select>
                            </FormControl>
                            {covidParamError.sex && <FormHelperText>Please select sex.</FormHelperText>}
                       </div>
                       <div> Age </div>
                       <div className={"flex-display-text"}>
                            <Input 
                                id="age" 
                                name="age"
                                value={covidParam.age}
                                onChange={setCovidCredentials}
                                placeholder={"eg: 27"}
                                endAdornment={<InputAdornment position="end">yrs</InputAdornment>}
                                error={covidParamError.age}
                                helperText={
                                    covidParamError.age ? "Please enter age." : ""
                                }/> 
                       </div>
                       </div>
                       <div> Residing at </div>
                       <div className={"flex-display-text"}>
                            <TextField 
                                id="address" 
                                name="address"
                                value={covidParam.address}
                                onChange={setCovidCredentials}
                                placeholder={"eg: 501, UKN Espernza, Thubrahalli, Whitefield, Bengaluru, Karnataka, 560066"}
                                error={covidParamError.address}
                                helperText={
                                    covidParamError.address ? "Please enter address." : ""
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
                                            id="place" 
                                            name="place"
                                            value={covidParam.place}
                                            onChange={setCovidCredentials}
                                            placeholder={"eg: Bengaluru"}
                                            error={covidParamError.place}
                                            helperText={
                                                covidParamError.place ? "Please enter place." : ""
                                            }/>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <div className={"flex-display"}>
                                    <div> Date:    </div>
                                    <div className={"flex-display-text"}>
                                        <TextField 
                                            id="date" 
                                            name="date"
                                            value={covidParam.date}
                                            onChange={setCovidCredentials}
                                            placeholder={"eg: 12/14/2020"}
                                            error={covidParamError.date}
                                            helperText={
                                                covidParamError.date ? "Please enter issued on date." : ""
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
                            Ritu Kumar
                        </Grid>
                        <Grid item xs={12} md={12}>
                            Medical Officer
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