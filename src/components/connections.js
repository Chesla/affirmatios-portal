/* eslint-disable complexity */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Alert } from "@material-ui/lab";
import {
    Card,
    CardHeader,
    CardContent,
    Grid,
    CircularProgress,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Checkbox,
    ListItemText
} from "@material-ui/core";
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import SchoolIcon from '@material-ui/icons/School';
import BusinessIcon from '@material-ui/icons/Business';
import {
  loginUser,
  loader
} from "../actions/userAction";
import {
    getAllConnections,
    verifyParticularConnection,
    setConnectionMessage,
    sendConnectionRequest
} from "../actions/connectionAction";
const Connections = (props) => {
  const dispatch = useDispatch();
  const profileInfo = useSelector(
    (state) => state.user.profileInfo
  );
  const connections = useSelector(
    (state) => state.connection.connections
  );
  const showLoader = useSelector(
    (state) => state.user.loader
  );
  const errorMessage = useSelector(
    (state) => state.connection.errorMessage
  );
  const connectionVerified = useSelector(
    (state) => state.connection.connectionVerified
  );
  const [connectionsSelected, setSelectedConnections] = React.useState([]);
  const setConnections = (event) => {
      setSelectedConnections(event.target.value);
  };
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
  const fetchAllConnections = () => {
    let param = profileInfo.DID;
    dispatch(loader(true));
    dispatch(getAllConnections(param));
  }
  const verifyConnection = (e) => {
    let  connectionid = e.currentTarget.getAttribute("connectionid");
    let param = {
        DID: profileInfo.DID,
        connectionid
    }
    console.log("verifyConnection",param);
    dispatch(loader(true));
    dispatch(verifyParticularConnection(param));
  }
  useEffect(()=>{
    if(Object.keys(profileInfo).length === 0){
        login();
    }else{
        fetchAllConnections();
    }
  },[]);
  useEffect(()=>{
    if(Object.keys(profileInfo).length !== 0){
        fetchAllConnections();
    }
  },[profileInfo]);
  useEffect(()=>{
    if(errorMessage || connectionVerified!==null){
        window.setTimeout(()=>{
            dispatch(setConnectionMessage(null, ""));
        },2000)
    }
  },[errorMessage, connectionVerified]);
  const setProfilePic = (type) => {
      type = type?.toLowerCase();
      switch(type){
        case "medical" : return <LocalHospitalIcon style={{ fontSize: 50 }}/>
        case "school" : return <SchoolIcon style={{ fontSize: 50 }}/>
        case "business" : return <BusinessIcon style={{ fontSize: 50 }}/>
        default : return null;
      }
  }
  const showconnections = () => {
    return (connections||[]).filter((c)=>{
      if(connectionsSelected.length === 0){
        return true;
      }
      return connectionsSelected.indexOf(c.name) !== -1
    }).map((c)=>{
        return(
            <Grid item xs={6} md={4} key={c.identity} onClick={()=>props.history.push(`/requestCredentials/${c.identity}/${c.name}`)}>
                <div className="certificate-container">
                <Grid
                    container
                    spacing={2}
                    alignItems={"center"}
                    >
                    <Grid item xs={6} md={3}>
                        <div className="image-container">
                            {setProfilePic(c.type)}
                        </div>
                    </Grid>
                    <Grid item xs={6} md={9}>
                        <div className="certificate-issuer">
                            {c.name}
                        </div>
                    </Grid>
                    {!c.verify ?
                        <Grid item xs={12} md={12}>
                            <Button
                                variant="contained"
                                className="full-width"
                                onClick={verifyConnection}
                                connectionid={c.identity}
                            >
                                VERIFY
                            </Button>
                        </Grid>
                    : 
                        <Grid item xs={12} md={12}>
                            <Button
                                variant="contained"
                                className="full-width"
                                className={"verified-button"}
                            >
                                VERIFIED
                            </Button>
                        </Grid> 
                    }
                </Grid>
                </div>
            </Grid>
        )
    })
  }
  const filterConnections = () => {
    return (
      <FormControl variant="outlined">
          <InputLabel id="demo-simple-select-outlined-label">Search Connections</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={connectionsSelected||[]}
            multiple
            onChange={setConnections}
            renderValue={(selected) => selected.join(', ').toUpperCase()}
            label="Search Connections"
          >
          {connections?.map((c) => (
              <MenuItem key={c.identity} value={c.name}>
                  <Checkbox color="primary" checked={connectionsSelected.indexOf(c.name) > -1} />
                  <ListItemText primary={c.name.toUpperCase()} />
              </MenuItem>
          ))}
          </Select>
      </FormControl>
    )
  }
  const sendConnection = () => {
      dispatch(loader(true));
      dispatch(sendConnectionRequest());
  }
  return (
    <React.Fragment>
        {showLoader ? (
        <div className={"loader-parent"}>
            <div className={"loader-container"}>
            <CircularProgress size={50} left={0} top={0} />
            </div>
        </div>
        ) : null}
        {connectionVerified && <Alert severity="success">Connection Verified Successfully</Alert>}
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <Card className="layout-card">
          <CardHeader title={
              <Grid
                container
                spacing={2}
                alignItems={"center"}
                justify="flex-start"
              >
              <Grid item xs ={12} md={6}>Connections</Grid>
              <Grid item xs ={12} md={3}>
                  <Button
                      variant="contained"
                      className="full-width"
                      onClick={sendConnection}
                  >
                      CONNECT WITH CHESLA
                  </Button>
              </Grid>
              {connections !== null || (connections||[]).length !== 0? 
                <Grid item xs ={12} md={3} style={{textAlign:"right"}}> {filterConnections()}</Grid>
                :null
              }
            </Grid>
          }/>
          <CardContent className="certificate-grid">
          {connections === null || (connections||[]).length === 0? 
            <div>No connections Available.</div>
            :
            <Grid
              container
              spacing={2}
              alignItems={"center"}
              justify="flex-start"
            >
                {showconnections()}
            </Grid>
          }
          </CardContent>
        </Card>
    </React.Fragment>
  );
};

export default Connections;
