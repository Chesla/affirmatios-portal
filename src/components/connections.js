/* eslint-disable complexity */
import React, { useEffect, useState } from "react";
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
  ListItemText,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  InputAdornment,
  IconButton,
  OutlinedInput,
  TextField,
} from "@material-ui/core";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import SchoolIcon from "@material-ui/icons/School";
import PersonIcon from "@material-ui/icons/Person";
import BusinessIcon from "@material-ui/icons/Business";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import QRCODE from "../images/qrcode.png";
import ContactMailIcon from '@material-ui/icons/ContactMail';
import ContactsIcon from '@material-ui/icons/Contacts';
import { loginUser, loader } from "../actions/userAction";
import {
  getAllConnections,
  setConnectionMessage,
  sendConnectionRequest,
  setConnectionSentSuccessfully,
  acceptConnectionRequest,
} from "../actions/connectionAction";
import { getType, setProfileName } from "../constants";
const Connections = (props) => {
  let clearIntervalId = null;
  const dispatch = useDispatch();
  const profileInfo = useSelector((state) => state.user.profileInfo);
  const connections = useSelector((state) => state.connection.connections);
  const showLoader = useSelector((state) => state.user.loader);
  const errorMessage = useSelector((state) => state.connection.errorMessage);
  const connectionVerified = useSelector(
    (state) => state.connection.connectionVerified
  );
  const connectionSentSuccessfully = useSelector(
    (state) => state.connection.connectionSentSuccessfully
  );
  const connectionSent = useSelector(
    (state) => state.connection.connectionSent
  );
  const [connectionsSelected, setSelectedConnections] = React.useState([]);
  const [accpetConnectionModal, setAccpetConnectionModal] = React.useState(
    false
  );
  const [connectionURL, setConnectionURL] = React.useState("");
  const [isRunning, setIsRunning] = React.useState(true);
  const [successMessage, setSuccessmessage] = useState(false);

  const setConnections = (event) => {
    setSelectedConnections(event.target.value);
  };
  const login = () => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    if (username && password && Object.keys(profileInfo).length === 0) {
      let param = {
        username,
        password,
      };
      dispatch(loader(true));
      dispatch(loginUser(param, "login"));
    }
  };
  const fetchAllConnections = () => {
    dispatch(loader(true));
    dispatch(getAllConnections());
    if(isRunning){
      clearIntervalId = window.setInterval(()=>{
        dispatch(getAllConnections());
      },6000);
    }
    
  };
  useEffect(() => {
    if (Object.keys(profileInfo).length === 0) {
      login();
    } else {
      fetchAllConnections();
    }
    return () => {
      setIsRunning(false);
      clearInterval(clearIntervalId);
    }
  }, []);
  useEffect(() => {
    if (Object.keys(profileInfo).length !== 0) {
      fetchAllConnections();
    }
  }, [profileInfo]);
  useEffect(() => {
    if (errorMessage || connectionVerified !== null) {
      window.setTimeout(() => {
        dispatch(setConnectionMessage(null, ""));
      }, 2000);
    }
  }, [errorMessage, connectionVerified]);
  const setProfilePic = (type) => {
    type = type?.toLowerCase();
    switch (type) {
      case "medical":
        return <LocalHospitalIcon style={{ fontSize: 50 }} />;
      case "school":
        return <SchoolIcon style={{ fontSize: 50 }} />;
      case "business":
        return <BusinessIcon style={{ fontSize: 50 }} />;
      default:
        return <PersonIcon style={{ fontSize: 50 }} />;
    }
  };
  const copyToClipboard = () => {
    let copyText = document.getElementById("Connection");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    setSuccessmessage("Copied to clipboard");
    window.setTimeout(() => {
      setSuccessmessage("");
    }, 2000);
  };
  const showconnections = () => {
    return (connections || [])
      .filter((c) => {
        if (connectionsSelected.length === 0) {
          return true;
        }
        return connectionsSelected.indexOf(c.connection_id) !== -1;
      })
      .map((c) => {
        let type = getType(c.their_label || "");
        let name = setProfileName(type) || c.connection_id;
        return (
          <Grid
            item
            xs={6}
            md={4}
            key={c.connection_id}
            onClick={() => {
              if (c.state !== "invitation" && process.env.REACT_APP_AGENT !== "people") {
                props.history.push(
                  `/requestCredentials/${c.connection_id}/${name}`
                );
              }
            }}
          >
            <div className="certificate-container">
              <Grid container spacing={2} alignItems={"center"}>
                <Grid item xs={6} md={3}>
                  <div className="image-container">{setProfilePic(type)}</div>
                </Grid>
                <Grid item xs={6} md={9}>
                  <div className="certificate-issuer">{name}</div>
                </Grid>
                {c.state === "invitation" ? (
                  <Grid item xs={12} md={12}>
                    <Button
                      variant="contained"
                      className="full-width"
                      connectionid={c.connection_id}
                    >
                      PENDING
                    </Button>
                  </Grid>
                ) : (
                  <Grid item xs={12} md={12}>
                    <Button
                      variant="contained"
                      className={"verified-button"}
                    >
                      ACCEPTED
                    </Button>
                  </Grid>
                )}
              </Grid>
            </div>
          </Grid>
        );
      });
  };
  const filterConnections = () => {
    return (
      <FormControl variant="outlined">
        <InputLabel id="demo-simple-select-outlined-label">
          Search Connections
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={connectionsSelected || []}
          multiple
          onChange={setConnections}
          renderValue={(selected) => selected.length + " selected."}
          label="Search Connections"
        >
          {connections?.map((c) => {
            let type = getType(c.their_label || "");
            let name = setProfileName(type) || c.connection_id;
            return (
              <MenuItem key={c.connection_id} value={c.connection_id}>
                <Checkbox
                  color="primary"
                  checked={connectionsSelected.indexOf(c.connection_id) > -1}
                />
                <ListItemText
                  primary={`${name} (${c.connection_id.toUpperCase()})`}
                />
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    );
  };
  const sendConnection = () => {
    dispatch(loader(true));
    dispatch(sendConnectionRequest());
  };
  const acceptConnection = () => {
    setAccpetConnectionModal(true);
  };
  const closeAcceptConnection = () => {
    setConnectionURL("");
    setAccpetConnectionModal(false);
  };
  return (
    <React.Fragment>
      {showLoader ? (
        <div className={"loader-parent"}>
          <div className={"loader-container"}>
            <CircularProgress size={50} left={0} top={0} />
          </div>
        </div>
      ) : null}
      {connectionSentSuccessfully && (
        <Alert severity="success">Connection Sent Successfully</Alert>
      )}
      {connectionVerified && (
        <Alert severity="success">Connection Verified Successfully</Alert>
      )}
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <Card className="layout-card">
        <CardHeader
          title={
            <Grid
              container
              spacing={2}
              alignItems={"center"}
              justify="flex-start"
            >
              <Grid item xs={12} md={6}>
                Connections
              </Grid>
                <Grid item xs={12} md={1}>
                  <Button
                    variant="contained"
                    className="full-width"
                    onClick={() => sendConnection()}
                  >
                    <ContactMailIcon/>
                  </Button>
                </Grid>
                <Grid item xs={12} md={1}>
                  <Button
                    variant="contained"
                    className="full-width"
                    onClick={() => acceptConnection()}
                  >
                    <ContactsIcon/>
                  </Button>
                </Grid>
              {connections !== null || (connections || []).length !== 0 ? (
                <Grid item xs={12} md={3} style={{ textAlign: "right" }}>
                  {" "}
                  {filterConnections()}
                </Grid>
              ) : null}
            </Grid>
          }
        />
        <CardContent className="certificate-grid">
          {/* <Grid
              container
              spacing={2}
              alignItems={"center"}
              justify="flex-start"
            >
                {showNewconnections()}
            </Grid> */}
          {connections === null || (connections || []).length === 0 ? (
            <div>No connections Available.</div>
          ) : (
            <Grid
              container
              spacing={2}
              alignItems={"center"}
              justify="flex-start"
            >
              {showconnections()}
            </Grid>
          )}
        </CardContent>
      </Card>
      <Dialog
        open={connectionSentSuccessfully || false}
        onClose={() => dispatch(setConnectionSentSuccessfully(null))}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid
              container
              spacing={2}
              alignItems={"center"}
              justify="flex-start"
            >
              <Grid item xs={12} md={12}>
                {successMessage && (
                  <Alert severity="success">{successMessage}</Alert>
                )}
              </Grid>
              <Grid item xs={12} md={12}>
                <img src={QRCODE} />
              </Grid>
              <Grid item xs={12} md={12}>
                <OutlinedInput
                  label="Connection URL"
                  id="Connection"
                  name="Connection"
                  value={connectionSent}
                  variant="outlined"
                  className="full-width"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={copyToClipboard}
                      >
                        <FileCopyIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              dispatch(setConnectionSentSuccessfully(false));
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={accpetConnectionModal}
        onClose={closeAcceptConnection}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent style={{width: 620}}>
          <DialogContentText id="accept-connection-dialog">
            <Grid
              container
              spacing={2}
              alignItems={"center"}
              justify="flex-start"
            >
              <Grid item xs={12} md={12}>
                {errorMessage && (
                  <Alert severity="error">{errorMessage}</Alert>
                )}
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  label="Connection URL"
                  id="AcceptConnection"
                  name="Connection"
                  value={connectionURL}
                  onChange={e => setConnectionURL(e.target.value)}
                  variant="outlined"
                  className="full-width"
                />
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={closeAcceptConnection}
          >
            Close
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              dispatch(loader(true));
              dispatch(acceptConnectionRequest({
                "c_id": connectionURL.split("c_i=")[1]
              }, closeAcceptConnection))
            }}
          >
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default Connections;
