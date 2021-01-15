/* eslint-disable complexity */
import {
    Card,
    CardHeader,
    CardContent,
    Grid,
} from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import KIIT from "../images/kiitlogo.png";

const Degree = (props) => {
    const degreeLetter = useSelector(
        (state) => state.credential.certificateDetails
    );
    if(!degreeLetter || Object.keys(degreeLetter).length===0){
        return null;
    }
    return (

        <React.Fragment>
        <Card>
          <CardHeader 
            title={<img src={KIIT} className={"office-logo"} alt={degreeLetter.ownerName}/>}
          />
          <CardContent className="degree-grid">
            <Grid
              container
              spacing={2}
              justify="center"
              alignItems="center"
            >
               <Grid item xs={12} md={12} >
                    <div className={"degree-certificate-name"}>
                        <b> {degreeLetter.certificateName} </b>
                    </div>
               </Grid>
                <Grid item xs={12} md={12} >
                    <div className={"degree-certificate-name-title"}>
                        for the degree of
                    </div> 
               </Grid>
               <Grid item xs={12} md={12}>
                    <div className={"degree-department-name"}>
                        <b> {degreeLetter.department} </b>
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
                   This is to certify that <b>{degreeLetter.name}</b> <br/>
                   bearing the Registration No. <b>{degreeLetter.verificationId}</b> <br/>
                   has successfully completed in the <b>{degreeLetter.dol}</b> <br/>
                   all the prescribed requirements under the regulations <br/>
                   for the degree of <b>{degreeLetter.department}</b>
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
                                Place: <b>{degreeLetter.location}</b>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                Date: <b>{degreeLetter.issuedOn}</b>
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
                            {degreeLetter.issuedBy}
                        </Grid>
                        <Grid item xs={12} md={12}>
                            {degreeLetter.issuedByTeam}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
          </CardContent>
        </Card>
    </React.Fragment>
    );
};

export default Degree;


