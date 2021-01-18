/* eslint-disable complexity */
import {
    Card,
    CardHeader,
    CardContent,
    Grid,
} from "@material-ui/core";
import React , {useEffect, useState}from "react";
import { useSelector } from "react-redux";
import TCS from "../images/tcslogo.png";
import PropTypes from "prop-types";

const Experience = (props) => {
    const data = useSelector(
        (state) => state.credential.certificateDetails
    );
    const [experienceLetter , setExperienceLetter] = useState(data || {});
    useEffect(()=>{
      if(props.readFrom){
        setExperienceLetter(props.readFrom||{});
      }
    },[]);
    useEffect(()=>{
        if(props.readFrom){
            setExperienceLetter(props.readFrom||data);
        }else{
            setExperienceLetter(data);
        }
      },[data]);
    console.log("experienceLetter",experienceLetter,props.readFrom);
    if(!experienceLetter || Object.keys(experienceLetter).length===0){
        return null;
    }
    
    return (
        <React.Fragment>
        <Card>
          <CardHeader 
            title={<img src={TCS} className={"office-logo"} alt={experienceLetter.ownerName || "NA"}/>}/>
          <CardContent className="degree-grid">
            <Grid
              container
              spacing={2}
              justify="flex-end"
              alignItems="center"
              style={{textAlign:"right"}}
            >
               <Grid item xs={12} md={12}>
                   <b>{experienceLetter.verificationId || "NA"}</b>
               </Grid>
            </Grid>
            <Grid
              container
              spacing={2}
              justify="center"
              alignItems="center"
            >
               <Grid item xs={12} md={12}>
                    <div className={"degree-certificate-name"}>
                        <b> {experienceLetter.certificateName || "NA"} </b>
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
               <Grid item xs={12} md={12}>
                   This is to certify that <b>{experienceLetter.name || "NA"}</b> was employed by us and {experienceLetter.gender==="F" ? "her" : "his"} particulars of service are as under:
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
                            <Grid item xs={6} md={4}>
                                <b>:{experienceLetter.gender==="F" ? " Ms." : " Mr."} {experienceLetter.name || "NA"}</b>
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
                            <Grid item xs={6} md={4}>
                                <b>:{experienceLetter.designation || "NA"}</b> 
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
                            <Grid item xs={6} md={4}>
                                <b>:{experienceLetter.department || "NA"}</b>
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
                            <Grid item xs={6} md={4}>
                                <b>:{experienceLetter.doj || "NA"}</b>
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
                            <Grid item xs={6} md={4}>
                                <b>:{experienceLetter.dol || "NA"}</b>
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
                                <b>:{experienceLetter.reason || "NA"}</b>
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
                                <b>:{experienceLetter.remarks || "NA"}</b>
                            </Grid> 
                    </Grid>
               </Grid>
               <Grid item xs={12} md={12}>
                   Dated: <b>{experienceLetter.issuedOn || "NA"}</b>
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
                {experienceLetter.issuedBy || "NA"}
               </Grid>
               <Grid item xs={12} md={12}>
                  {experienceLetter.issuedByTeam || "NA"}
               </Grid>
            </Grid>
          </CardContent>
        </Card>
    </React.Fragment>
    );
};

export default Experience;


Experience.propTypes = {
    readFrom: PropTypes.any,
  };