/* eslint-disable complexity */
import React, { useEffect } from "react";
import Degree from './degree';
import Covid from './covid';
import Experience from './experience';
import { useSelector, useDispatch } from "react-redux";
import { Alert } from "@material-ui/lab";
import {
    loginUser,
    loader
  } from "../actions/userAction";
  import {
    getCertificateDetails
  } from "../actions/credentialAction";
const Certificate = (props) => {
    const dispatch = useDispatch();
    const profileInfo = useSelector(
        (state) => state.user.profileInfo
    );
    const errorMessage = useSelector(
        (state) => state.credential.errorMessage
    );
    const fetchCertificateDetails = () => {
        let param = {
            credentialId: props.match.params.id
        }
        dispatch(loader(true));
        dispatch(getCertificateDetails(param, props.match.params.type));
    }
    const login = () => {
        const username = localStorage.getItem("username");
        const password = localStorage.getItem("password");
        if(username && password && Object.keys(profileInfo).length === 0){
            let param = {
                username,
                password,
            };
            dispatch(loader(true));
            dispatch(loginUser(param , "login"));
        }
    }
    useEffect(()=>{
        if(Object.keys(profileInfo).length === 0){
            login();
        }else{
            fetchCertificateDetails();
        }
    },[]);
    useEffect(()=>{
        if(Object.keys(profileInfo).length !== 0){
            fetchCertificateDetails();
        }
    },[profileInfo]);
    
    const showCertificate = () => {
        let type = (props.match.params.type||"").toLowerCase();
        switch(type){
                case "medical" : return <Covid/>;
                case "school" : return <Degree/>;
                case "business" : return <Experience/>;
                default : return null;
        }
    }
    return (
      <React.Fragment>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        {showCertificate()}
      </React.Fragment>
    );
};

export default Certificate;


