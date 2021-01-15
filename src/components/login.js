/* eslint-disable complexity */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Alert } from "@material-ui/lab";
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  TextField,
  CircularProgress,
  Button,
} from "@material-ui/core";
import {
  loginUser,
  loader,
  initLoginData
} from "../actions/userAction";

const usernameregex = /^(?=[a-zA-Z0-9._]{2,25}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
const Login = (props) => {
  const dispatch = useDispatch();
  const loginType = props.location.pathname.includes("login") ? "login" : "register";
  const [itemData, setItemData] = useState({
    username: "",
    password: "",
    firstLastName: "",
  });
  const [itemDataError, setItemDataError] = useState({
    username: false,
    password: false,
    firstLastName: false
  });
  const showLoader = useSelector(
    (state) => state.user.loader
  );
  const failureMessage = useSelector(
    (state) => state.user.loginFailureMessage
  );
  const loginSuccess = useSelector(
    (state) => state.user.loginSuccess
  );
  const saveInfo = (e) => {
    if (e.target.value.trim() === "") {
      setItemData({ ...itemData, ...{ [e.target.name]: e.target.value } });
      setItemDataError({ ...itemDataError, ...{ [e.target.name]: true } });
    }
    if (e.target.name === "username" || e.target.name === "firstLastName") {
      setItemData({ ...itemData, ...{ [e.target.name]: e.target.value } });
      if (e.target.value.match(usernameregex)) {
        setItemDataError({ ...itemDataError, ...{ [e.target.name]: false } });
      } else {
        setItemDataError({ ...itemDataError, ...{ [e.target.name]: true } });
      }
    }
    else{
      if (e.target.value.trim() !== ""){
        setItemData({ ...itemData, ...{ [e.target.name]: e.target.value } });
        setItemDataError({ ...itemDataError, ...{ [e.target.name]: false } });
      }
    }
  };
  const login = () => {
    if(!itemData.username || !itemData.password){
      let errorObj  = {
          ...itemDataError,
          username: !itemData.username ,
          password: !itemData.password,
          firstLastName: !itemData.firstLastName
      }
      setItemDataError(errorObj);
    }else{
      let param = {
        username: itemData.username,
        password: itemData.password,
      };
      if(loginType!=="login"){
        param["name"] = itemData.firstLastName;
      }
      dispatch(loader(true));
      dispatch(loginUser(param , loginType));
    }
  }
  useEffect(()=>{
    if(loginSuccess){
      props.history.push("/");
    }
  },[loginSuccess])
  useEffect(()=>{
    dispatch(initLoginData());
    setItemData({
      username: "",
      password: "",
      firstLastName: ""
    });
    setItemDataError({
      username: "",
      password: "",
      firstLastName: ""
    })
  },[props.location.pathname]);
  return (
    <div className="login-page">
      
      <div className="login-box">
        <h1>AFFIRMATIO</h1>
        {showLoader ? (
          <div className={"loader-parent"}>
            <div className={"loader-container"}>
              <CircularProgress size={50} left={0} top={0} />
            </div>
          </div>
        ) : null}
        
        <Card className={"mgTop10"}>
          <CardHeader className={"mgleft10"} title={loginType==="login" ? "Sign in" : "Register"}/>
          <CardContent>
            <Grid
              style={{ width: "320px", margin: "0 auto" }}
              container
              alignItems={"center"}
              spacing={2}
            >
              <Grid item xs={12} md={12}>
                <TextField
                  label="User Name"
                  id="username"
                  name="username"
                  value={itemData.username}
                  error={itemDataError.username}
                  helperText={
                    itemDataError.username
                      ? "Please enter a valid user name."
                      : "User name is the DID provided by government."
                  }
                  variant="outlined"
                  onChange={saveInfo}
                />
              </Grid>
              {loginType!=="login" ?
                <Grid item xs={12} md={12}>
                  <TextField
                    label="First Name and Last Name"
                    type="text"
                    id="firstLastName"
                    name="firstLastName"
                    value={itemData.firstLastName}
                    error={itemDataError.firstLastName}
                    helperText={
                      itemDataError.firstLastName ? "Please enter a name." : ""
                    }
                    variant="outlined"
                    onChange={saveInfo}
                  />
                </Grid>
                :null
              }
              <Grid item xs={12} md={12}>
                <TextField
                  label="Password"
                  type="password"
                  id="password"
                  name="password"
                  value={itemData.password}
                  error={itemDataError.password}
                  helperText={
                    itemDataError.password ? "Please enter a password." : ""
                  }
                  variant="outlined"
                  onChange={saveInfo}
                />
              </Grid>
              
              <Grid item xs={12} md={12}>
                <Button
                  variant="contained"
                  className="full-width"
                  onClick={login}
                >
                  {loginType==="login" ? "LOGIN" : "REGISTER"}
                </Button>
              </Grid>
              <Grid item xs={12} md={12}>
                {failureMessage && <Alert severity="error">{failureMessage}</Alert>}
              </Grid>
              {loginType==="login" ?
              <Grid item xs={12} md={12}>
                New to Affirmatio? 
                <Link to="/registration" className="join-now">Join Now</Link> 
              </Grid>
              :
              <Grid item xs={12} md={12}>
                Already in Affirmatio? 
                <Link to="/login" className="join-now">Sign in</Link> 
              </Grid>
                }
            </Grid>
            
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
