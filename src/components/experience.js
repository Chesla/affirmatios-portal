/* eslint-disable complexity */
import {
    Card,
    CardHeader,
    CardContent,
    Grid,
} from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import TCS from "../images/tcslogo.png";

const Experience = (props) => {
    const experienceLetter = useSelector(
        (state) => state.credential.certificateDetails
    );
    if(!experienceLetter || Object.keys(experienceLetter).length===0){
        return null;
    }
    return (
        <React.Fragment>
        <Card>
          <CardHeader 
            title={<img src={TCS} className={"office-logo"} alt={experienceLetter.ownerName}/>}/>
          <CardContent className="degree-grid">
            <Grid
              container
              spacing={2}
              justify="flex-end"
              alignItems="center"
              style={{textAlign:"right"}}
            >
               <Grid item xs={12} md={12}>
                   <b>{experienceLetter.verificationId}</b>
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
                        <b> {experienceLetter.certificateName} </b>
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
                   This is to certify that <b>{experienceLetter.name}</b> was employed by us and {experienceLetter.gender==="F" ? "her" : "his"} particulars of service are as under:
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
                                <b>:{experienceLetter.gender==="F" ? " Ms." : " Mr."} {experienceLetter.name}</b>
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
                                <b>:{experienceLetter.designation}</b> 
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
                                <b>:{experienceLetter.department}</b>
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
                                <b>:{experienceLetter.doj}</b>
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
                                <b>:{experienceLetter.dol}</b>
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
                                <b>:{experienceLetter.reason}</b>
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
                                <b>:{experienceLetter.remarks}</b>
                            </Grid> 
                    </Grid>
               </Grid>
               <Grid item xs={12} md={12}>
                   Dated: <b>{experienceLetter.issuedOn}</b>
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
                {experienceLetter.issuedBy}
               </Grid>
               <Grid item xs={12} md={12}>
                  {experienceLetter.issuedByTeam}
               </Grid>
            </Grid>
          </CardContent>
        </Card>
    </React.Fragment>
    );
};

export default Experience;


