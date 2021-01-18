import {
  Card,
  CardHeader,
  CardContent,
  Grid,
} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import Manipal from "../images/manipallogo.jpeg";
import PropTypes from "prop-types";

const Covid = (props) => {
  const data = useSelector(
      (state) => state.credential.certificateDetails
  );
  const [covidLetter , setCovidLetter] = useState(data || {});
  useEffect(()=>{
    if(props.readFrom){
      setCovidLetter(props.readFrom||{});
    }
  },[])
  
  if(!covidLetter || Object.keys(covidLetter).length===0){
      return null;
  }

  return (
      <React.Fragment>
      <Card>
        <CardHeader 
          title={<img src={Manipal} className={"medical-logo"} alt={covidLetter.ownerName || "NA"}/>}
        />
        <CardContent className="degree-grid">
          <Grid
            container
            spacing={2}
            justify="center"
            alignItems="center"
          >
            <Grid item xs={12} md={12}>
                  <div className={"Covid-department-name"}>
                      <b> TO WHOMSOEVER IT MAY CONCERN </b>
                  </div> 
             </Grid>

             <Grid item xs={12} md={12} >
                  <div className={"Covid-certificate-name"}>
                      <b> COVID CERTIFICATE </b>
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
                 This is to certify that <b>{covidLetter.name || "NA"}</b> <br/>
                 Sex <b>{covidLetter.sex ? covidLetter.sex==="F" ? "female" : "male" : "NA" }</b>, 
                 Age <b>{covidLetter.age || "NA"}yrs.</b>,
                 Residing at <b>{covidLetter.address || "NA"}</b> <br/>
                 is healthy and not suffering from COVID-19.
             </Grid>
             
          </Grid>
          <div className={"mgBtm20"}/>
          <Grid
            container
            spacing={2}
            justify="flex-end"
            alignItems="center"
          >
                  <Grid item xs={6} md={6}>
                      <Grid
                          container
                          spacing={2}
                          justify="flex-end"
                          alignItems="center"
                          style={{textAlign:"left"}}
                      >
                          <Grid item xs={12} md={12}>
                              Place: <b>{covidLetter.place || "NA"}</b>
                          </Grid>
                          <Grid item xs={12} md={12}>
                              Date: <b>{covidLetter.date || "NA"}</b>
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
                          {covidLetter.issuedBy || "NA"}
                      </Grid>
                      <Grid item xs={12} md={12}>
                          {covidLetter.issuedByTeam || "NA"}
                      </Grid>
                  </Grid>
              </Grid>
          </Grid>
        </CardContent>
      </Card>
  </React.Fragment>
  );
};

export default Covid;


Covid.propTypes = {
  readFrom: PropTypes.any,
};