/* eslint-disable complexity */
import {
    Card,
    CardHeader,
    CardContent,
    Grid,
} from "@material-ui/core";
import React , {useEffect, useState}from "react";
import { useSelector } from "react-redux";
import KIIT from "../images/kiitlogo.png";
import PropTypes from "prop-types";

const Degree = (props) => {
    const data = useSelector(
        (state) => state.credential.certificateDetails
    );
    const [degreeLetter , setDegreeLetter] = useState(data || {});
    useEffect(()=>{
      if(props.readFrom){
        setDegreeLetter(props.readFrom||{});
      }
    },[]);
    useEffect(()=>{
        if(props.readFrom){
            setDegreeLetter(props.readFrom||data);
        }else{
            setDegreeLetter(data);
        }
      },[data]);
    if(!degreeLetter || Object.keys(degreeLetter).length===0){
        return null;
    }
    return (

        <React.Fragment>
        <Card>
          <CardHeader 
            title={<img src={KIIT} className={"office-logo"} alt={"KIIT university"}/>}
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
                        <b> PROVISIONAL CERTIFICATE </b>
                    </div>
               </Grid>
                <Grid item xs={12} md={12} >
                    <div className={"degree-certificate-name-title"}>
                        for the degree of
                    </div> 
               </Grid>
               <Grid item xs={12} md={12}>
                    <div className={"degree-department-name"}>
                        <b> {degreeLetter.department || "NA"} </b>
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
                   This is to certify that <b>{degreeLetter.name || "NA"}</b> <br/>
                   bearing the Registration No. <b>{degreeLetter.roll_number || "NA"}</b> <br/>
                   has successfully completed in the <b>{degreeLetter.completed_date || "NA"}</b> <br/>
                   all the prescribed requirements under the regulations <br/>
                   for the degree of <b>{degreeLetter.department || "NA"}</b>
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
                                Place: <b>{degreeLetter.address || "NA"}</b>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                Date: <b>{degreeLetter.issued_date || "NA"}</b>
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
                            Prachet Bhuyian
                        </Grid>
                        <Grid item xs={12} md={12}>
                            Registar
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


Degree.propTypes = {
    readFrom: PropTypes.any,
  };