import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import axios from "axios";
import Dashboard from "./dashboard/dashboard";
import JobBoard from "./job-board/job-board";
import LandingPage from "./landing-page/landing-page";
import SearchJobs from "./search-jobs/search-jobs";
import Error from "./error";
import { theme } from "./themes/theme";
import { ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { userContext } from "./context/user-context";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("/api/auth/user")
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <userContext.Provider value={user}>
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/job-board" component={JobBoard} />
          <Route exact path="/search-jobs" component={SearchJobs} />
          <Route exact path="/" component={LandingPage} />
          <Route path="*" component={Error} />
        </Switch>
      </userContext.Provider>
    </ThemeProvider>
  );
}
