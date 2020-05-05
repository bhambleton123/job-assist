import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Dashboard from "./dashboard/dashboard";
import JobBoard from "./job-board/job-board";
import LandingPage from "./landing-page/landing-page";
import Profile from "./profile/profile";
import SearchJobs from "./search-jobs/search-jobs";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/job-board" component={JobBoard} />
        <Route path="/search-jobs" component={SearchJobs} />
        <Route path="/profile" component={Profile} />
        <Route path="/" component={LandingPage} />
      </Switch>
    </BrowserRouter>
  );
}
