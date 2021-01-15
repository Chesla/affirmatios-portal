import {
  Card,
  CardHeader,
  CardContent,
  Grid,
} from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import Manipal from "../images/manipallogo.jpeg";

const Covid = (props) => {
  const covidLetter = useSelector(
      (state) => state.credential.certificateDetails
  );
  if(!covidLetter || Object.keys(covidLetter).length===0){
      return null;
  }
  return (
      <React.Fragment>
      <Card>
        <CardHeader 
          title={<img src={Manipal} className={"medical-logo"} alt={covidLetter.ownerName}/>}
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
                      <b> {covidLetter.department} </b>
                  </div> 
             </Grid>

             <Grid item xs={12} md={12} >
                  <div className={"Covid-certificate-name"}>
                      <b> {covidLetter.certificateName} </b>
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
                 This is to certify that <b>{covidLetter.name}</b> <br/>
                 Sex <b>{covidLetter.gender==="F" ? "female" : "male" }</b>, 
                 Age <b>{covidLetter.age }yrs.</b>,
                 Residing at <b>{covidLetter.remarks}</b> <br/>
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
                              Place: <b>{covidLetter.location}</b>
                          </Grid>
                          <Grid item xs={12} md={12}>
                              Date: <b>{covidLetter.issuedOn}</b>
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
                          {covidLetter.issuedBy}
                      </Grid>
                      <Grid item xs={12} md={12}>
                          {covidLetter.issuedByTeam}
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


