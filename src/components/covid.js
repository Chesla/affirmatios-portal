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
  useEffect(()=>{
    if(props.readFrom){
        setCovidLetter(props.readFrom||data);
    }else{
        setCovidLetter(data);
    }
  },[data]);
  if(!covidLetter || Object.keys(covidLetter).length===0 && props.readFrom){
    return <div>No Data has been requested</div>;
  }
  if(!covidLetter || Object.keys(covidLetter).length===0){
      return null;
  }

  return (
      <React.Fragment>
      <Card>
        <CardHeader 
          title={<img src={Manipal} className={"medical-logo"} alt={"Manipal Hospital"}/>}
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
                 This is to certify that 
                   <b style={{background:`${covidLetter.name && props.highlight ? props.highlightColor : "white"}`}}>
                      {covidLetter.name || "NA"}
                   </b> <br/>
                 Sex <b style={{background:`${covidLetter.sex && props.highlight ? props.highlightColor : "white"}`}}>
                    {covidLetter.sex ? covidLetter.sex==="F" ? "female" : "male" : "NA" }</b>, 
                 Age <b style={{background:`${covidLetter.age && props.highlight ? props.highlightColor : "white"}`}}>
                   {covidLetter.age || "NA"}yrs.</b>,
                 Residing at <b style={{background:`${covidLetter.address && props.highlight ? props.highlightColor : "white"}`}}>
                   {covidLetter.address || "NA"}</b> <br/>
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
                              Place: <b style={{background:`${covidLetter.place && props.highlight ? props.highlightColor : "white"}`}}>{covidLetter.place || "NA"}</b>
                          </Grid>
                          <Grid item xs={12} md={12}>
                              Date: <b style={{background:`${covidLetter.date && props.highlight ? props.highlightColor : "white"}`}}>{covidLetter.date || "NA"}</b>
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
      </Card>
  </React.Fragment>
  );
};

export default Covid;


Covid.propTypes = {
  readFrom: PropTypes.any,
  highlight: PropTypes.any,
  highlightColor: PropTypes.any

};