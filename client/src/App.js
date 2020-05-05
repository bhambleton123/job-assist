import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Dashboard from "./dashboard/dashboard";
import JobBoard from "./job-board/job-board";
import LandingPage from "./landing-page/landing-page";
import Profile from "./profile/profile";
import SearchJobs from "./search-jobs/search-jobs";
import Error from "./error";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/job-board" component={JobBoard} />
        <Route exact path="/search-jobs" component={SearchJobs} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/" component={LandingPage} />
        <Route path="*" component={Error} />
      </Switch>
    </BrowserRouter>
  );
}
