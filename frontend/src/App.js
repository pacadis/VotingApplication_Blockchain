import './App.css';
import React, { Component } from "react";
import {Route, Switch, Redirect, BrowserRouter} from "react-router-dom";
import LoginForm from "./components/login/LoginForm";
import VoterDashboard from "./components/dashboard/VoterDashboard";
import AdminLoginForm from "./components/login/AdminLoginForm";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import StartDashboard from "./components/general/StartDashboard";
import VoteDone from "./components/general/VoteDone";
import Register from "./components/login/Register";
import Results from "./components/general/Results";
import EndVote from "./components/general/EndVote";


class App extends Component {
    render() {
        return (
          <div>
              <div className="content">
                  <BrowserRouter>
                      <Switch>
                          <Route path="/login" component={LoginForm}/>
                          <Route path="/loginadmin" component={AdminLoginForm}/>
                          <Route path="/register" component={Register}/>
                          <Route path="/voter_dashboard" component={VoterDashboard}/>
                          <Route path="/admin_dashboard" component={AdminDashboard}/>
                          <Route path="/start_dashboard" component={StartDashboard}/>
                          <Route path="/vote_done" component={VoteDone}/>
                          <Route path="/results" component={Results}/>
                          <Route path="/end_vote" component={EndVote}/>

                          <Route path="/" exact component={StartDashboard}/>
                          <Redirect to="/start_dashboard"/>
                      </Switch>
                  </BrowserRouter>
              </div>
          </div>
        );
    }
}

export default App;
