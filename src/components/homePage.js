/* eslint-disable complexity */
import React from "react";
import Header from "./header";
import Profile from "./profile";
import Credentials from "./credentials";
import Notification from "./notifications";
import Certificate from './certificate';
import Connections from './connections';
import IssueCredentials from "./issueCredentials";
import RequestCredentials from "./requestCredentials";
import RequestNewCredentials from "./requestNewCredentials";
import {
  Route,
} from "react-router-dom";
const HomePage = (props) => {
  return (
    <div>
      <Header {...props}/>
      <Route exact path="/" component={Profile}/>
      <Route exact path="/profile" component={Profile}/>
      <Route exact path="/credentails" component={Credentials} />
      <Route exact path="/notifications" component={Notification} />
      <Route exact path="/connections" component={Connections} />
      <Route exact path="/issuecredentails" component={IssueCredentials} />
      <Route exact path="/credentails/:id/:type" component={Certificate} />
      <Route exact path="/requestcredentials" component={RequestNewCredentials} />
      <Route exact path="/requestCredentials/:identity/:name" component={RequestCredentials} />
    </div>
  );
};

export default HomePage;


